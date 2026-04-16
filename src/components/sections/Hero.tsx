'use client';

import Image from 'next/image';
import LinkButton from '../ui/button/LinkButton';
const heroBg = '/images/luminous-assets/hero-bg.svg';
import RevealAnimation from '../animation/RevealAnimation';
const heroBgDark = '/images/luminous-assets/hero-bg-dark.svg';

const Hero = () => {
  return (
    <section className="pt-[115px] pb-0 overflow-hidden relative">
      <div className="max-w-[1365px] mx-auto">
        <div className="relative">
          <figure className="absolute animate-pulse z-0 max-w-[1365px] -top-5 left-[50%] translate-x-[-50%] w-full h-full overflow-hidden">
            <Image
              src={heroBg}
              alt="Decorative background pattern"
              className="size-full object-cover dark:hidden"
              fill
              priority
              sizes="100vw"
            />
            <Image
              src={heroBgDark}
              alt="Decorative background pattern"
              className="size-full object-cover hidden dark:inline-block"
              fill
              priority
              sizes="100vw"
            />
          </figure>
          <div className="main-container relative z-10">
            <div className="flex items-center gap-12 xl:gap-0 flex-col lg:flex-row justify-between pt-8 lg:pt-[140px] pb-10 lg:pb-[100px]">
              <div className="lg:max-w-[490px] xl:max-w-[629px] w-full space-y-7 lg:space-y-14 text-center md:text-left">
                <div className="space-y-4">
                  <RevealAnimation delay={0.1} instant={true}>
                    <span className="text-secondary font-medium dark:text-accent tracking-wider uppercase text-tagline-2">
                      Luminous Logics
                    </span>
                  </RevealAnimation>
                  <RevealAnimation delay={0.2} instant={true}>
                    <h1 className="text-secondary font-medium dark:text-white">Where Bright Ideas Take Shape</h1>
                  </RevealAnimation>
                  <RevealAnimation delay={0.3} instant={true}>
                    <div className="space-y-4">
                      <p className="text-secondary font-semibold dark:text-white/90 text-lg md:text-xl">
                        Innovative Software Solutions, Web Development & Technology Consulting for Your Business
                      </p>
                      <p className="text-secondary/60 dark:text-white/60">
                        Empower your business with innovative solutions and cutting-edge technology, driving growth and
                        maximizing your potential in the digital landscape.
                      </p>
                    </div>
                  </RevealAnimation>
                </div>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5">
                  <RevealAnimation delay={0.4} instant={true}>
                    <LinkButton
                      href="/contact-us"
                      className="btn btn-lg btn-secondary hover:btn-white dark:btn-accent dark:hover:btn-white-dark px-10">
                      <span>Let&apos;s Chat</span>
                    </LinkButton>
                  </RevealAnimation>
                  <RevealAnimation delay={0.5} instant={true}>
                    <LinkButton
                      href="/portfolio"
                      className="btn btn-lg hover:btn-secondary dark:btn-dark btn-white border-0 dark:bg-accent/20 dark:text-secondary px-8">
                      <span>See our work</span>
                    </LinkButton>
                  </RevealAnimation>
                </div>
              </div>

              <div className="relative w-full lg:w-1/2 flex items-center justify-center py-10 lg:py-0">
                <RevealAnimation delay={0.2} instant={true}>
                  <div className="relative w-full max-w-[520px] mx-auto">
                    {/* Animated Dot Background */}
                    <div className="absolute inset-0 opacity-10 dark:opacity-20 -z-10">
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        <defs>
                          <pattern id="dot-pattern" width="8" height="8" patternUnits="userSpaceOnUse">
                            <circle cx="1" cy="1" r="1" fill="currentColor" />
                          </pattern>
                        </defs>
                        <rect width="100" height="100" fill="url(#dot-pattern)" />
                      </svg>
                    </div>

                    {/* Rich Pulse Effect (Ripples) */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 pointer-events-none">
                      <div className="relative size-60">
                        <div className="absolute inset-0 bg-secondary/10 dark:bg-accent/20 rounded-full animate-ping" />
                        <div className="absolute inset-4 bg-secondary/10 dark:bg-accent/20 rounded-full animate-ping [animation-delay:0.5s]" />
                        <div className="absolute inset-8 bg-secondary/5 dark:bg-accent/10 rounded-full animate-ping [animation-delay:1s]" />
                      </div>
                    </div>

                    {/* Glass Terminal */}
                    <div className="w-full bg-white/40 dark:bg-black/40 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden font-mono text-sm relative z-10 transition-transform hover:scale-[1.02] duration-500">
                      {/* Terminal Header */}
                      <div className="flex items-center gap-2 px-4 py-3 bg-white/20 dark:bg-white/5 border-b border-white/10">
                        <div className="flex gap-1.5">
                          <div className="size-3 rounded-full bg-[#FF5F56]"></div>
                          <div className="size-3 rounded-full bg-[#FFBD2E]"></div>
                          <div className="size-3 rounded-full bg-[#27C93F]"></div>
                        </div>
                        <span className="text-secondary/60 dark:text-white/40 text-xs ml-2 italic">
                          sys_init.sh — 80×24
                        </span>
                      </div>

                      {/* Terminal Body */}
                      <div className="p-6 space-y-4 text-secondary dark:text-accent">
                        <div className="space-y-1.5">
                          <p className="text-secondary/40 dark:text-white/30">$ luminous_logics init</p>
                          <p className="text-green-600 dark:text-green-400">STATUS: System Online</p>
                          <p>UPTIME: 99.9%</p>
                        </div>

                        <div className="h-px bg-white/10"></div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <span className="text-[10px] uppercase tracking-wider text-secondary/40 dark:text-white/30">
                              Support Load
                            </span>
                            <div className="flex items-center gap-2">
                              <div className="h-1.5 flex-1 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-secondary dark:bg-accent w-[24%]" />
                              </div>
                              <span className="text-xs">24%</span>
                            </div>
                          </div>
                          <div className="space-y-1 text-right">
                            <span className="text-[10px] uppercase tracking-wider text-secondary/40 dark:text-white/30">
                              Tickets Solved
                            </span>
                            <p className="text-lg font-bold leading-tight">53.2k</p>
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <p className="text-green-600 dark:text-green-400 flex items-center gap-2">
                            <span className="inline-block size-2 rounded-full bg-green-500 animate-pulse" />
                            Solution Deployed Successfully
                          </p>
                          <p className="text-secondary/40 dark:text-white/30">$ _</p>
                        </div>
                      </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute -top-10 -right-10 size-32 bg-secondary/10 dark:bg-accent/10 rounded-full blur-3xl -z-20" />
                    <div className="absolute -bottom-10 -left-10 size-40 bg-secondary/10 dark:bg-accent/10 rounded-full blur-3xl -z-20" />
                  </div>
                </RevealAnimation>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
