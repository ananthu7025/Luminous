import Image from 'next/image';
import RevealAnimation from '../animation/RevealAnimation';
import LinkButton from '../ui/button/LinkButton';

const CTA = () => {
  return (
    <RevealAnimation delay={0.1}>
      <section className="pb-14 pt-14 md:pb-16 md:pt-16 lg:pb-[88px] lg:pt-[88px] xl:pb-[112px] xl:pt-[100px] border-t border-stroke-4 dark:border-stroke-6 dark:bg-background-5 overflow-hidden">
        <div className="main-container">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
            {/* text content  */}
            <div className="max-w-[620px] w-full text-center lg:text-left space-y-6 lg:space-y-8">
              <RevealAnimation delay={0.1}>
                <span className="badge badge-cyan px-4 py-1.5">Free Consultation</span>
              </RevealAnimation>
              <RevealAnimation delay={0.2}>
                <h2 className="text-secondary dark:text-white leading-tight">
                  Get a free project consultation.
                </h2>
              </RevealAnimation>
              <RevealAnimation delay={0.3}>
                <p className="text-secondary/70 dark:text-white/70 text-lg md:text-xl">
                  Tell us about your project. We&apos;ll map out the ideal technical approach and give you an honest assessment — no commitment required.
                </p>
              </RevealAnimation>
              <RevealAnimation delay={0.4}>
                <div className="flex flex-col sm:flex-row items-center lg:justify-start justify-center gap-5">
                  <LinkButton
                    href="/contact-us"
                    className="btn btn-secondary hover:btn-white btn-md dark:btn-accent dark:hover:btn-white-dark px-10">
                    Book a free call
                  </LinkButton>
                  <p className="text-secondary/60 dark:text-accent/60 text-sm max-w-[200px] text-center lg:text-left">
                    Book a free 30-minute discovery call today.
                  </p>
                </div>
              </RevealAnimation>
            </div>

            {/* image content  */}
            <div className="relative w-full lg:w-1/2 max-w-[580px]">
              <RevealAnimation delay={0.5} direction="right" offset={40}>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-secondary/10 dark:border-white/10 group">
                  <Image
                    src="/images/luminous-assets/ns-img-294.webp"
                    alt="Project Consultation"
                    width={1100}
                    height={700}
                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                    priority
                  />
                  {/* subtle overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </RevealAnimation>
            </div>
          </div>
        </div>
      </section>
    </RevealAnimation>
  );
};

export default CTA;
