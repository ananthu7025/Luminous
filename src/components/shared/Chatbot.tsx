'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/utils/cn';
import lumosAvatar from '@public/images/luminous-assets/alis.png';
import RevealAnimation from '../animation/RevealAnimation';
import { crmApi } from '@/config/api';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize chat on component mount
  useEffect(() => {
    if (!hasInitialized) {
      initializeChat();
      setHasInitialized(true);
    }
  }, [hasInitialized]);

  // Show greeting after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) setShowGreeting(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const initializeChat = async () => {
    try {
      const response = await fetch(crmApi.chatbot.config());
      if (response.ok) {
        const config = await response.json();
        // Add initial greeting from config or default
        const welcomeMessage: Message = {
          id: '1',
          content: config.greeting || "Hi there, I'm Lumos 👋\n\nI'm here to help you explore Luminous Logics — specifically our services and how we ship products.",
          sender: 'assistant',
          timestamp: new Date(),
        };
        setMessages([welcomeMessage]);
      }
    } catch (error) {
      console.error('Failed to initialize chatbot:', error);
      // Fallback to default greeting
      const welcomeMessage: Message = {
        id: '1',
        content: "Hi there, I'm Lumos 👋\n\nI'm here to help you explore Luminous Logics — specifically our services and how we ship products.",
        sender: 'assistant',
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch(crmApi.chatbot.message(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: inputValue }),
      });

      if (response.ok) {
        const data = await response.json();
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: data.reply || "I'm having trouble responding. Please try again.",
          sender: 'assistant',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        throw new Error('Failed to get response');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I'm having trouble responding right now. Please try again later.",
        sender: 'assistant',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setShowGreeting(false);
  };

  const closeGreeting = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowGreeting(false);
  };

  const menuItems = [
    { label: 'Explore services', href: '/services', icon: '💡' },
    { label: 'How we work', href: '/services', icon: '⚙️' },
    { label: 'Book a meeting', href: '/contact-us', icon: '📅' },
    { label: 'Our Work', href: '/case-study', icon: '💼' },
    { label: 'Read Blog', href: '/blog', icon: '📖' },
    { label: 'Contact Us', href: '/contact-us', icon: '✉️' },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3 pointer-events-none">
      
      {/* Greeting Bubble */}
      {showGreeting && !isOpen && (
        <div className="pointer-events-auto flex items-end gap-3 animate-in fade-in slide-in-from-bottom-3 duration-500">
          <div className="bg-white dark:bg-background-9 shadow-2xl rounded-[16px] p-3 pr-8 relative border border-stroke-6/20 max-w-[220px]">
            <button 
              onClick={closeGreeting}
              className="absolute top-1.5 right-1.5 size-5 flex items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 3L3 9M3 3L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="flex items-center gap-2 mb-1.5">
              <div className="size-8 rounded-full overflow-hidden border-2 border-accent/20">
                <Image src={lumosAvatar} alt="Lumos" className="w-full h-full object-cover" />
              </div>
              <span className="font-bold text-xs text-secondary dark:text-white">Lumos</span>
            </div>
            <p className="text-secondary/80 dark:text-white/70 text-[13px] font-medium leading-tight">
              Hey there! Need any help? 👋
            </p>
          </div>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="pointer-events-auto w-[300px] sm:w-[350px] bg-background-9/95 backdrop-blur-xl border border-white/10 shadow-2xl rounded-[20px] overflow-hidden flex flex-col animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-white/5 p-4 flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="size-10 rounded-full overflow-hidden border-2 border-accent/30">
                  <Image src={lumosAvatar} alt="Lumos" className="w-full h-full object-cover" />
                </div>
                <div className="absolute bottom-0 right-0 size-2.5 bg-green-500 rounded-full border-2 border-[#1a1c1e]" />
              </div>
              <div>
                <h4 className="text-white text-base font-bold">Lumos</h4>
                <p className="text-white/50 text-[10px] uppercase tracking-wider font-bold">Online</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={toggleChat} className="p-1 text-white/40 hover:text-white transition-colors" title="Close">
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[380px]">
            {messages.length === 0 ? (
              <div className="space-y-3">
                <div className="bg-white/10 p-4 rounded-xl rounded-tl-none border border-white/5">
                  <p className="text-white text-[13px] font-semibold mb-1">Hi there, I&apos;m Lumos 👋</p>
                  <p className="text-white/70 text-[13px] leading-relaxed">
                    I&apos;m here to help you explore Luminous Logics — specifically our services and how we ship products.
                  </p>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                  <p className="text-white/60 text-[11px] font-bold uppercase tracking-wide mb-3">
                     Quick Actions
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                     {menuItems.map((item) => (
                       <Link
                         key={item.label}
                         href={item.href}
                         onClick={() => setIsOpen(false)}
                         className="flex items-center gap-2 p-2.5 rounded-lg bg-white/5 hover:bg-accent/20 border border-white/5 hover:border-accent/40 transition-all text-[11px] font-bold text-white/80"
                       >
                         <span className="text-sm">{item.icon}</span>
                         {item.label}
                       </Link>
                     ))}
                  </div>
                </div>
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    'flex',
                    msg.sender === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  <div
                    className={cn(
                      'max-w-xs px-4 py-2 rounded-xl border',
                      msg.sender === 'user'
                        ? 'bg-accent text-secondary rounded-br-none border-accent/50'
                        : 'bg-white/10 text-white rounded-tl-none border-white/5'
                    )}
                  >
                    <p className="text-[13px] leading-relaxed whitespace-pre-wrap">
                      {msg.content}
                    </p>
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/10 px-4 py-2 rounded-xl rounded-tl-none border border-white/5">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <form onSubmit={sendMessage} className="p-4 border-t border-white/10">
            <div className="relative">
              <input
                type="text"
                placeholder="Message Lumos..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isLoading}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-[13px] focus:outline-none focus:border-accent/50 transition-colors pr-12 disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 size-8 bg-accent text-secondary rounded-lg flex items-center justify-center hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Floating Trigger */}
      <button 
        onClick={toggleChat}
        className={cn(
          "pointer-events-auto size-14 rounded-full bg-secondary dark:bg-background-9 text-white shadow-2xl flex items-center justify-center transition-all duration-500 hover:scale-110 active:scale-95 group relative border border-white/10",
          isOpen && "rotate-90 bg-accent text-secondary"
        )}
      >
        <div className="absolute inset-0 rounded-full bg-accent/20 animate-ping opacity-20 group-hover:opacity-40" />
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90001C9.87812 3.30494 11.1801 2.99657 12.5 3H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11H21.5V11.5Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

    </div>
  );
};

export default Chatbot;
