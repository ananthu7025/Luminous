'use client';

import { useState } from 'react';
import gradient17 from '@public/images/gradient/gradient-17.png';
import gradient22 from '@public/images/gradient/gradient-22.png';
import gradient6 from '@public/images/gradient/gradient-6.png';
import homeIcon from '@public/images/icons/home.svg';
import mailIcon from '@public/images/icons/mail-open.svg';
import phoneIcon from '@public/images/icons/phone-right.svg';
import Image from 'next/image';
import Link from 'next/link';
import RevealAnimation from '../animation/RevealAnimation';
import { crmApi } from '@/config/api';

interface FormData {
  fullname: string;
  number: string;
  email: string;
  subject: string;
  message: string;
  terms: boolean;
}

const contactInfoItems = [
  {
    id: 1,
    icon: homeIcon,
    title: 'Our Address',
    content: '4/461, 2ND FLOOR, VALAMKOTTIL TOWERS, KAKKANAD, KOCHI, KERALA - 682021',
    gradient: gradient22,
    gradientClass: 'top-[-187px] left-[174px] -rotate-[78deg]',
  },
  {
    id: 2,
    icon: mailIcon,
    title: 'Email Us',
    content: 'contact@luminouslogics.com',
    link: 'mailto:contact@luminouslogics.com',
    gradient: gradient17,
    gradientClass: 'top-[-206px] left-[-36px] rotate-[62deg]',
  },
  {
    id: 3,
    icon: phoneIcon,
    title: 'Call Us',
    content: '+91 94478 48040',
    link: 'tel:+919447848040',
    gradient: gradient6,
    gradientClass: 'top-[-184px] left-[-185px]',
  },
];

const ContactInfo = () => {
  const [formData, setFormData] = useState<FormData>({
    fullname: '',
    number: '',
    email: '',
    subject: '',
    message: '',
    terms: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch(crmApi.contact.submit(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.fullname,
          phone: formData.number,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: 'Thank you! Your message has been sent successfully. We will get back to you soon.',
        });
        // Reset form
        setFormData({
          fullname: '',
          number: '',
          email: '',
          subject: '',
          message: '',
          terms: false,
        });
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Sorry, there was an error submitting your message. Please try again later.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="pt-7 pb-14 md:pb-16 lg:pb-20 xl:pb-[100px]" aria-label="Contact Information and Form">
      <div className="main-container">
        <div className="space-y-[70px]">
          {/* heading  */}
          <div className="max-w-[680px] mx-auto text-center space-y-3">
            <RevealAnimation delay={0.2}>
              <h2>Reach out to our support team for help.</h2>
            </RevealAnimation>
            <RevealAnimation delay={0.3}>
              <p>
                Whether you have a question, need technical assistance, or just want some guidance, our support team is
                here to help. We&apos;re available around the clock to provide quick and friendly support.
              </p>
            </RevealAnimation>
          </div>
          <div className="flex lg:items-start flex-col justify-center items-center gap-10 lg:flex-row lg:gap-8 xl:gap-[70px]">
            {/* contact info cards  */}
            <div className="flex flex-col gap-8 md:flex-row lg:flex-col">
              {contactInfoItems.map((item) => (
                <RevealAnimation key={item.id} delay={0.4}>
                  <div className="bg-secondary dark:bg-background-6 rounded-[20px] p-11 space-y-6 w-full md:max-w-[371px] text-center relative overflow-hidden">
                    {/* bg overlay  */}
                    <figure
                      className={`absolute select-none pointer-events-none size-[350px] overflow-hidden ${item.gradientClass}`}>
                      <Image src={item.gradient} alt="Decorative gradient overlay" className="size-full object-cover" />
                    </figure>
                    <figure className="size-10 overflow-hidden mx-auto">
                      <Image src={item.icon} alt={`${item.title} icon`} className="size-full object-cover" />
                    </figure>
                    <div className="space-y-2.5">
                      <p className="text-heading-6 text-accent">{item.title}</p>
                      {item.link ? (
                        <p className="text-accent/60">
                          <Link href={item.link}>{item.content}</Link>
                        </p>
                      ) : (
                        <p className="text-accent/60">{item.content}</p>
                      )}
                    </div>
                  </div>
                </RevealAnimation>
              ))}
            </div>
            {/* contact form  */}
            <RevealAnimation delay={0.3}>
              <div className="max-w-[847px] w-full mx-auto bg-white dark:bg-background-6 rounded-4xl p-6 md:p-8 lg:p-11">
                {/* Status Messages */}
                {submitStatus.type && (
                  <div
                    className={`mb-6 p-4 rounded-lg border ${
                      submitStatus.type === 'success'
                        ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200'
                        : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200'
                    }`}>
                    {submitStatus.message}
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-8">
                {/* name and phone number  */}
                <div className="flex items-center flex-col md:flex-row gap-8 justify-between">
                  {/*  name */}
                  <div className="space-y-2 lg:max-w-[364px] w-full">
                    <label
                      htmlFor="fullname"
                      className="block text-tagline-2 text-secondary dark:text-accent font-medium">
                      Your name
                    </label>
                    <input
                      type="text"
                      id="fullname"
                      name="fullname"
                      placeholder="Enter your name"
                      required={true}
                      autoComplete="name"
                      value={formData.fullname}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      className="w-full px-[18px] dark:focus-visible:border-stroke-4/20 dark:border-stroke-7 py-3 h-[48px] xl:h-[41px] rounded-full dark:bg-background-6 border border-stroke-3 bg-background-1 text-tagline-2 placeholder:text-secondary/60 focus:outline-none focus:border-secondary placeholder:text-tagline-2 dark:placeholder:text-accent/60 dark:text-accent placeholder:font-normal font-normal disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                  {/* number */}
                  <div className="space-y-2 max-w-[364px] w-full">
                    <label
                      htmlFor="number"
                      className="block text-tagline-2 text-secondary dark:text-accent font-medium">
                      Your number
                    </label>
                    <input
                      type="text"
                      id="number"
                      name="number"
                      placeholder="Enter your number"
                      required={true}
                      autoComplete="tel"
                      value={formData.number}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      className="w-full px-[18px] dark:focus-visible:border-stroke-4/20 dark:border-stroke-7 py-3 h-[48px] xl:h-[41px] rounded-full dark:bg-background-6 border border-stroke-3 bg-background-1 text-tagline-2 placeholder:text-secondary/60 focus:outline-none focus:border-secondary placeholder:text-tagline-2 dark:placeholder:text-accent/60 dark:text-accent placeholder:font-normal font-normal disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>
                {/* email  */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-tagline-2 text-secondary dark:text-accent font-medium">
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    required={true}
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className="w-full px-[18px] dark:focus-visible:border-stroke-4/20 dark:border-stroke-7 py-3 h-[48px] xl:h-[41px] rounded-full dark:bg-background-6 border border-stroke-3 bg-background-1 text-tagline-2 placeholder:text-secondary/60 focus:outline-none focus:border-secondary placeholder:text-tagline-2 dark:placeholder:text-accent/60 dark:text-accent placeholder:font-normal font-normal disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
                {/* subject  */}
                <div className="space-y-2">
                  <label htmlFor="subject" className="block text-tagline-2 text-secondary dark:text-accent font-medium">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="Enter your subject"
                    required={true}
                    value={formData.subject}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className="w-full px-[18px] dark:focus-visible:border-stroke-4/20 dark:border-stroke-7 py-3 h-[48px] xl:h-[41px] rounded-full dark:bg-background-6 border border-stroke-3 bg-background-1 text-tagline-2 placeholder:text-secondary/60 focus:outline-none focus:border-secondary placeholder:text-tagline-2 dark:placeholder:text-accent/60 dark:text-accent placeholder:font-normal font-normal disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
                {/* message */}
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-tagline-2 text-secondary dark:text-accent font-medium">
                    Write message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={7}
                    placeholder="Enter your messages"
                    required={true}
                    value={formData.message}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className="w-full px-[18px] py-3 rounded-xl border dark:bg-background-6 dark:border-stroke-7 border-stroke-3 bg-background-1 text-tagline-2 placeholder:text-secondary/60 focus:outline-none focus:border-secondary dark:focus-visible:border-stroke-4/20 placeholder:text-tagline-2 dark:placeholder:text-accent/60 dark:text-accent placeholder:font-normal font-normal disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
                {/* terms checkbox */}
                <fieldset className="flex items-center gap-2 mb-4">
                  <label htmlFor="terms" className="flex items-center gap-x-3">
                    <input
                      id="terms"
                      name="terms"
                      type="checkbox"
                      className="sr-only peer"
                      required={true}
                      checked={formData.terms}
                      onChange={handleInputChange}
                      disabled={isLoading}
                    />
                    <span className="size-4 rounded-full border border-stroke-3 dark:border-stroke-7 relative after:absolute after:size-2.5 after:bg-primary-500 after:rounded-full after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:opacity-0 peer-checked:after:opacity-100 peer-checked:border-primary-500 cursor-pointer peer-disabled:opacity-50" />
                  </label>
                  <label
                    htmlFor="terms"
                    className="text-tagline-3 cursor-pointer text-secondary/60 dark:text-accent/60">
                    I agree with the
                    <Link href="#" className="text-primary-500 underline text-tagline-3">
                      {' '}
                      terms and conditions
                    </Link>
                  </label>
                </fieldset>
                {/* submit button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn btn-md btn-secondary w-full hover:btn-primary dark:btn-accent before:content-none first-letter:uppercase disabled:opacity-50 disabled:cursor-not-allowed transition-opacity">
                  {isLoading ? 'Sending...' : 'Submit'}
                </button>
                </form>
              </div>
            </RevealAnimation>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
