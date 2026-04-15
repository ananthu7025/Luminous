import gradientImg from '@public/images/gradient/gradient-14.png';
import Image from 'next/image';
import RevealAnimation from '../animation/RevealAnimation';
import LinkButton from '../ui/button/LinkButton';

const About = ({ hideButton = false }: { hideButton?: boolean }) => {
  return (
    <section className="pt-0 pb-16 md:pb-20 lg:pb-[100px] 2xl:pb-[150px]">
      <div className="max-w-[1440px] mx-auto max-lg:px-5">
        <RevealAnimation delay={0.1}>
          <div className="z-10 rounded-[32px] bg-secondary dark:bg-background-6 overflow-hidden px-6 lg:px-[42px] py-14 lg:py-[72px] relative">
            <RevealAnimation delay={0.4} direction="up">
              <div className="-z-10 absolute -top-[46%] min-[400px]:-top-[50%] min-[510px]:-top-[80%] md:-top-[66%] lg:-top-[70%] -right-[22%] rotate-[314deg] max-w-[700px] select-none pointer-events-none">
                <Image src={gradientImg} alt="gradient" />
              </div>
            </RevealAnimation>

            <div className="flex flex-col items-center justify-center">
              <div className="max-w-[800px] w-full space-y-8 lg:space-y-10 text-center md:text-left">
                <div className="space-y-3 lg:space-y-5">
                  <RevealAnimation delay={0.2}>
                    <span className="badge badge-blur mx-auto md:mx-0">About Us</span>
                  </RevealAnimation>
                  <div className="space-y-2 lg:space-y-3">
                    <RevealAnimation delay={0.3}>
                      <h2 className="text-white">
                        Engineering Digital Products That Drive Real Business Outcomes
                      </h2>
                    </RevealAnimation>
                    <RevealAnimation delay={0.4}>
                      <p className="text-accent/60">
                        Luminous Logics Technologies is a product-focused software company based in Kochi, India, specializing in web and mobile application development for startups, SMBs, and enterprises across India, Kuwait, and Canada.
                        We work with a dual focus — building our own SaaS products and delivering high-impact client projects. Every engagement starts with understanding your business, not your backlog.
                      </p>
                    </RevealAnimation>
                  </div>
                </div>
                <RevealAnimation delay={0.5}>
                  <blockquote className="border-l-2 border-accent/30 pl-5 space-y-2 text-left">
                    <p className="text-accent/80 italic text-tagline-1 leading-relaxed">
                      &ldquo;We are not just building applications — we are crafting solutions that drive growth and transformation. Together, let&apos;s illuminate the path to a brighter future.&rdquo;
                    </p>
                    <cite className="text-accent/50 text-tagline-2 not-italic">— Alan, Founder & CEO</cite>
                  </blockquote>
                </RevealAnimation>
                {!hideButton && (
                  <RevealAnimation delay={0.6}>
                    <LinkButton
                      href="/about"
                      className="btn btn-base btn-dark dark:btn-transparent dark:border hover:btn-primary w-[85%] md:w-auto mx-auto md:mx-0">
                      Learn more about us
                    </LinkButton>
                  </RevealAnimation>
                )}
              </div>
            </div>
          </div>
        </RevealAnimation>
      </div>
    </section>
  );
};

export default About;
