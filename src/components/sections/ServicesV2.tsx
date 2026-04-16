import image from '@public/images/home-page-2/about-bg.png';
import Image from 'next/image';
import RevealAnimation from '../animation/RevealAnimation';
import LinkButton from '../ui/button/LinkButton';

const ServicesV2 = () => {
  return (
    <section className="py-16 md:py-24 bg-white dark:bg-black">
      <RevealAnimation delay={0.2}>
        <div className="main-container">
          <div className="relative z-10 p-8 md:p-16 rounded-[32px] overflow-hidden border border-stroke-6/20 shadow-lg">
            <div className="absolute top-0 left-0 right-0 bottom-0 -z-10">
              <Image src={image} alt="about bg" className="w-full h-full object-cover opacity-5 dark:opacity-10 grayscale" />
            </div>
            <div className="grid max-lg:grid-cols-1 grid-cols-12 gap-12 items-center text-center lg:text-left">
              <div className="lg:col-span-5 space-y-6">
                <h3 className="text-secondary dark:text-accent leading-tight">
                  Accelerating Your Digital Transformation with Purpose
                </h3>
                <p className="text-secondary/70 dark:text-white/60">
                  Whether you need a full-scale platform or specialized technical consulting, we provide the clarity and expertise to move your project from idea to impact.
                </p>
                <div className="pt-2">
                  <LinkButton href="/contact-us" className="btn btn-xl dark:btn-accent btn-secondary">
                    Start Your Project
                  </LinkButton>
                </div>
              </div>
              <div className="lg:col-span-7">
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    'Rapid MVP validation & deployment',
                    'Direct access to senior architects',
                    'Transparent milestones & weekly delivery',
                    'Scalable, white-label ready software',
                  ].map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3 bg-white/50 dark:bg-white/5 p-5 rounded-2xl border border-stroke-6/10">
                      <svg
                        width={24}
                        height={24}
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="shrink-0 mt-0.5">
                        <circle
                          cx="10"
                          cy="10"
                          r="10"
                          fill="currentColor"
                          className="text-secondary/10 dark:text-accent/10"
                        />
                        <path
                          d="M14.125 7.375L8.875 12.6248L6.25 10"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="text-secondary dark:text-accent"
                        />
                      </svg>
                      <span className="text-secondary/80 dark:text-white/80 font-medium">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </RevealAnimation>
    </section>
  );
};

export default ServicesV2;
