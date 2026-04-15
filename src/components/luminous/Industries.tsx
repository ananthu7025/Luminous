import Image from 'next/image';
import RevealAnimation from '../animation/RevealAnimation';
import LinkButton from '../ui/button/LinkButton';

interface FeatureItem {
  id: number;
  icon: string;
  title: string;
  description: string;
  side: 'left' | 'right';
}

const featureItems: FeatureItem[] = [
  {
    id: 1,
    icon: 'ns-shape-15',
    title: 'Healthcare',
    description: 'HIPAA-aware clinic management systems, patient portals, telemedicine platforms, and EMR integrations. Built for providers who need reliability above everything.',
    side: 'left',
  },
  {
    id: 2,
    icon: 'ns-shape-24',
    title: 'E-commerce',
    description: 'Custom storefronts and headless commerce platforms built for conversion, scale, and seamless payment integration — beyond what Shopify templates can offer.',
    side: 'left',
  },
  {
    id: 3,
    icon: 'ns-shape-9',
    title: 'Edtech & LMS',
    description: 'End-to-end learning platforms for coaching institutes, universities, and edtech startups. Multi-role access, course management, assessments, and AI-ready architecture.',
    side: 'left',
  },
  {
    id: 4,
    icon: 'ns-shape-7',
    title: 'SaaS Products',
    description: 'From idea validation to multi-tenant SaaS — we build, launch, and iterate software products alongside your team as a technical co-founder would.',
    side: 'right',
  },
  {
    id: 5,
    icon: 'ns-shape-34',
    title: 'Real Estate',
    description: 'Property listing platforms, booking engines, and CRM systems designed to close deals faster and manage inventory at scale.',
    side: 'right',
  },
  {
    id: 6,
    icon: 'ns-shape-36',
    title: 'Hospitality',
    description: 'Reservation systems, guest-facing apps, and operational tools that improve the guest experience and reduce front-desk overhead.',
    side: 'right',
  },
];

const Industries = () => {
  const leftFeatures = featureItems.filter((item) => item.side === 'left');
  const rightFeatures = featureItems.filter((item) => item.side === 'right');

  return (
    <RevealAnimation delay={0.1}>
      <section className="pt-14 md:pt-16 lg:pt-[88px] xl:pt-[100px] pb-14 md:pb-16 lg:pb-[88px] xl:pb-[100px]">
        <div className="main-container">
          <div className="py-[42px] bg-secondary rounded-4xl px-6 sm:px-14 relative z-10 overflow-hidden">
            <RevealAnimation delay={0.1} direction="right" offset={100}>
              <figure className="-z-10 absolute -right-[120%] -top-[44%] sm:-right-[100%] sm:-top-[35%] md:-right-[104%] md:-top-[78%] lg:-right-[74%] lg:-top-[78%] xl:-right-[54%] xl:-top-[58%] -rotate-[290deg] sm:-rotate-[260deg] size-[1060px] pointer-events-none select-none">
                <Image src="/images/gradient/gradient-6.png" alt="gradient" width={1060} height={1060} />
              </figure>
            </RevealAnimation>
            <div className="space-y-[70px] relative z-10">
              <div className="md:w-full space-y-7 text-center md:text-left">
                <div className="md:w-full space-y-3">
                  <RevealAnimation delay={0.2}>
                    <h2 className="max-w-[700px] text-accent">Domain Expertise Across the Industries That Matter</h2>
                  </RevealAnimation>
                  <RevealAnimation delay={0.3}>
                    <p className="max-w-[600px] md:w-full text-accent/60">
                      We don&apos;t just write code — we understand your industry, its regulations, its users, and its competitive landscape.
                    </p>
                  </RevealAnimation>
                </div>
                <RevealAnimation delay={0.4}>
                  <div>
                    <LinkButton href="/portfolio" className="btn btn-dark btn-md hover:btn-white">
                      View our work
                    </LinkButton>
                  </div>
                </RevealAnimation>
              </div>

              <div className="max-w-[1178px] mx-auto flex items-center flex-col gap-y-8 sm:gap-y-0 sm:gap-x-8 md:flex-row justify-between">
                <div className="max-w-[300px] md:w-full space-y-8">
                  {leftFeatures.map((feature, index) => (
                    <RevealAnimation key={feature.id} delay={0.5 + index * 0.1} direction="left">
                      <div className="space-y-4">
                        <div className="overflow-hidden inline-block">
                          <span className={`${feature.icon} text-[36px] text-accent`}> </span>
                        </div>
                        <div>
                          <h3 className="text-tagline-1 font-medium text-accent">{feature.title}</h3>
                          <p className="text-tagline-2 text-accent/60">{feature.description}</p>
                        </div>
                      </div>
                    </RevealAnimation>
                  ))}
                </div>

                <RevealAnimation delay={0.4} offset={100}>
                  <figure className="md:max-w-[350px] lg:max-w-[400px] xl:max-w-[480px] rounded-2xl md:w-full order-last md:order-none">
                    <Image
                      src="/images/home-page-1/why.png"
                      alt="Luminous Logics — industry expertise"
                      className="rounded-2xl"
                      width={480}
                      height={400}
                    />
                  </figure>
                </RevealAnimation>

                <div className="max-w-[300px] md:w-full space-y-8">
                  {rightFeatures.map((feature, index) => (
                    <RevealAnimation key={feature.id} delay={0.5 + index * 0.1} direction="right">
                      <div className="space-y-3">
                        <div className="overflow-hidden inline-block">
                          <span className={`${feature.icon} text-[36px] text-accent`}> </span>
                        </div>
                        <div>
                          <h3 className="text-tagline-1 font-medium text-accent">{feature.title}</h3>
                          <p className="text-tagline-2 text-accent/60">{feature.description}</p>
                        </div>
                      </div>
                    </RevealAnimation>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </RevealAnimation>
  );
};

export default Industries;
