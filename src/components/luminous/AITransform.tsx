'use client';

import Image from 'next/image';
import RevealAnimation from '../animation/RevealAnimation';
import LinkButton from '../ui/button/LinkButton';

const AITransform = () => {
  return (
    <section className="xl:pt-[150px] md:pt-[100px] pt-[60px] xl:pb-[150px] md:pb-[100px] pb-[50px] bg-background-2 dark:bg-background-5">
      <div className="main-container">
        <div className="grid grid-cols-12 items-center xl:gap-[100px] lg:gap-20 gap-y-16">
          <div className="col-span-12 lg:col-span-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
              {/* Left Column */}
              <div className="bg-[#F6F4F1] dark:bg-background-8 rounded-[40px] p-6 sm:p-8 space-y-4 relative min-h-[500px] sm:min-h-[600px] overflow-hidden group">
                <RevealAnimation delay={0.2} direction="down">
                  <div className="bg-white dark:bg-background-9 rounded-2xl p-6 shadow-sm relative z-10 transition-transform hover:scale-105 duration-300">
                    <h4 className="text-3xl sm:text-4xl font-bold text-secondary dark:text-white">12+</h4>
                    <p className="text-xs sm:text-sm text-secondary/60 dark:text-white/40 font-medium">Advanced AI Verticals</p>
                  </div>
                </RevealAnimation>
                
                <RevealAnimation delay={0.3} direction="down">
                  <div className="bg-white dark:bg-background-9 rounded-2xl p-6 shadow-sm relative z-10 w-[90%] transition-transform hover:scale-105 duration-300">
                    <h4 className="text-3xl sm:text-4xl font-bold text-secondary dark:text-white">100%</h4>
                    <p className="text-xs sm:text-sm text-secondary/60 dark:text-white/40 font-medium">Engineering Precision</p>
                  </div>
                </RevealAnimation>

                <div className="absolute bottom-0 left-0 w-full h-[60%] sm:h-[65%]">
                  <Image 
                    src="/images/luminous-assets/vr-collage.png" 
                    alt="VR Technology Integration" 
                    fill 
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#F6F4F1] dark:from-background-8 via-transparent to-transparent opacity-60" />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6 self-center lg:self-start">
                <RevealAnimation delay={0.4} direction="up">
                  <div className="bg-[#F6F4F1] dark:bg-background-8 rounded-[40px] p-8 sm:p-10 transition-transform hover:scale-[1.02] duration-300">
                    <h4 className="text-3xl sm:text-4xl font-extrabold text-secondary dark:text-white uppercase tracking-tight">AI-First</h4>
                    <p className="text-base sm:text-lg text-secondary/60 dark:text-white/40 mt-2 font-medium">Integrated Intelligence</p>
                  </div>
                </RevealAnimation>

                <RevealAnimation delay={0.5} direction="up">
                  <div className="bg-[#F4A261] dark:bg-[#E76F51] rounded-[40px] p-8 sm:p-10 text-white min-h-[300px] sm:min-h-[350px] flex flex-col items-center justify-center text-center shadow-xl shadow-orange-500/10 transition-transform hover:scale-[1.02] duration-300 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <p className="text-sm sm:text-lg font-bold mb-8 tracking-wide">Model Accuracy</p>
                    <div className="relative size-32 sm:size-40 flex items-center justify-center">
                      <svg className="size-full -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                        <circle 
                          cx="50" cy="50" r="45" 
                          fill="none" 
                          stroke="white" 
                          strokeWidth="8" 
                          strokeDasharray="282.7" 
                          strokeDashoffset="2.8" 
                          strokeLinecap="round" 
                          className="transition-all duration-1000 ease-out"
                        />
                      </svg>
                      <span className="absolute text-3xl sm:text-4xl font-extrabold tracking-tighter">99%</span>
                    </div>
                  </div>
                </RevealAnimation>
              </div>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-6">
            <div className="space-y-4 lg:text-left text-center">
              <RevealAnimation delay={0.1}>
                <span className="badge badge-cyan">AI Transformation</span>
              </RevealAnimation>
              <RevealAnimation delay={0.2}>
                <h2 className="lg:mx-0 mx-auto">
                  Building the Future with <span className="text-secondary dark:text-accent">Intelligent Software</span>
                </h2>
              </RevealAnimation>
              <RevealAnimation delay={0.3}>
                <p className="lg:max-w-[592px] max-w-[450px] w-full lg:mx-0 mx-auto text-secondary/70 dark:text-white/60">
                  Luminous Logics helps organizations move beyond traditional automation. We integrate advanced AI to make your systems see, think, and decide.
                </p>
              </RevealAnimation>
            </div>
            <div className="pt-10 pb-12">
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:justify-start justify-center">
                {[
                  'Custom LLM Architectures',
                  'Vision-AI Integration',
                  'Predictive Intelligence',
                  'Agentic Workflows'
                ].map((item, index) => (
                  <RevealAnimation key={item} delay={0.4 + index * 0.1}>
                    <li className="flex items-center gap-3">
                      <div className="size-6 rounded-full bg-secondary/10 dark:bg-accent/10 flex items-center justify-center shrink-0">
                        <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 5.5L4 8.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary dark:text-accent" />
                        </svg>
                      </div>
                      <span className="text-sm font-bold text-secondary dark:text-white/90">
                        {item}
                      </span>
                    </li>
                  </RevealAnimation>
                ))}
              </ul>
            </div>
            <RevealAnimation delay={0.7}>
              <div className="lg:text-left text-center">
                <LinkButton
                  href="/contact-us"
                  className="btn btn-secondary btn-xl hover:btn-white dark:btn-accent dark:hover:btn-white-dark transition-all scale-100 hover:scale-105">
                  Discuss AI Strategy
                </LinkButton>
              </div>
            </RevealAnimation>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AITransform;
