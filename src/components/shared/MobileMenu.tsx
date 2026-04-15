'use client';

import { useMobileMenuContext } from '@/context/MobileMenuContext';
import { navigationItems } from '@/data/header';
import { cn } from '@/utils/cn';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

const MobileMenu = () => {
  const { isOpen, closeMenu } = useMobileMenuContext();
  const sidebarRef = useRef<HTMLElement>(null);

  // Handle click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, closeMenu]);

  return (
    <aside
      ref={sidebarRef}
      className={cn(
        'dark:bg-background-7 scroll-bar fixed top-0 right-0 z-[999] h-screen w-full bg-white transition-all duration-300 ease-in-out sm:w-1/2 xl:hidden',
        isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none',
      )}>
      <div className="flex flex-col h-full space-y-4 p-5 sm:p-8 lg:p-9">
        <div className="flex items-center justify-between">
          <Link href="/" onClick={closeMenu}>
            <span className="sr-only">Home</span>
            <figure className="max-w-[120px]">
               <span className="text-secondary dark:text-white font-bold text-xl tracking-tight">
                Luminous <span className="text-accent">Logics</span>
              </span>
            </figure>
          </Link>
          {/* close menu btn */}
          <button
            onClick={closeMenu}
            className="nav-hamburger-close bg-background-4 dark:bg-background-9 hover:bg-background-5 dark:hover:bg-background-8 relative flex size-10 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-full transition-all duration-200 hover:scale-105 group"
            aria-label="Close mobile menu">
            <span className="sr-only">Close Menu</span>
            <span className="bg-stroke-9/60 dark:bg-stroke-1 absolute block h-0.5 w-4 rotate-45 transition-all duration-200 group-hover:bg-stroke-1"></span>
            <span className="bg-stroke-9/60 dark:bg-stroke-1 absolute block h-0.5 w-4 -rotate-45 transition-all duration-200 group-hover:bg-stroke-1"></span>
          </button>
        </div>
        
        <div className="flex-grow scroll-bar w-full overflow-x-hidden overflow-y-auto pb-10">
          <ul className="space-y-6 pt-10">
            {navigationItems.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href || '#'}
                  onClick={closeMenu}
                  className="text-2xl font-semibold text-secondary dark:text-white hover:text-accent transition-colors block">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-6 border-t border-stroke-1/10">
          <Link
            href="/signup-01"
            onClick={closeMenu}
            className="btn btn-xl btn-secondary dark:btn-accent w-full justify-center">
            <span>Book a Call</span>
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default MobileMenu;
