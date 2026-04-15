import netSalesDark from '@public/images/services/net-sales-dark.svg';
import netSales from '@public/images/services/net-sales.svg';
import revenueDark from '@public/images/services/revenue-dark.svg';
import revenue from '@public/images/services/revenue.svg';
import userActivityDark from '@public/images/services/user-activity-dark.svg';
import userActivity from '@public/images/services/user-activity.svg';
import Image from 'next/image';
import RevealAnimation from '../animation/RevealAnimation';
import LinkButton from '../ui/button/LinkButton';

const Solutions = () => {
  return (
    <section className="bg-white dark:bg-black overflow-hidden py-16 md:py-24">
      <div className="main-container bg-background-3 dark:bg-background-9/40 rounded-[20px] p-8 md:p-16 xl:p-24 overflow-hidden border border-stroke-6/20">
        <div className="grid grid-cols-12 xl:gap-[100px] lg:gap-20 gap-y-16 items-center">
          <div className="col-span-12 lg:col-span-6">
            <div className="space-y-6 lg:text-left text-center">
              <RevealAnimation delay={0.1}>
                <span className="badge badge-cyan">Engineered Excellence</span>
              </RevealAnimation>
              <div className="space-y-4 max-w-[595px] lg:mx-0 mx-auto">
                <RevealAnimation delay={0.2}>
                  <h2>Custom Solutions for Complex Business Problems</h2>
                </RevealAnimation>
                <RevealAnimation delay={0.3}>
                  <p>
                    We don&apos;t just write code; we architect systems that scale with your ambitions. From enterprise-grade security to millisecond-perfect performance, we ensure your technical foundation is unshakeable.
                  </p>
                </RevealAnimation>
              </div>
              <div className="pt-4 pb-8">
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-[500px] lg:mx-0 mx-auto text-left">
                  {[
                    'On-Demand Technical Support',
                    'Cloud-Native Architecture',
                    'Real-time Data Syncing',
                    'Enterprise Security Standards',
                  ].map((item, index) => (
                    <RevealAnimation key={item} delay={0.4 + index * 0.1}>
                      <li className="flex items-center gap-2">
                        <span className="shrink-0 size-5 rounded-full bg-secondary/10 dark:bg-accent/10 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width={10} height={8} viewBox="0 0 15 10" fill="none">
                            <path
                              d="M13.1875 1.0625L5.3125 8.93715L1.375 5"
                              className="stroke-secondary dark:stroke-accent"
                              strokeWidth={3}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                        <p className="font-medium text-secondary/80 dark:text-accent/80 text-sm">{item}</p>
                      </li>
                    </RevealAnimation>
                  ))}
                </ul>
              </div>
              <RevealAnimation delay={0.8}>
                <div className="lg:text-left text-center">
                  <LinkButton
                    href="/contact-us"
                    className="btn btn-xl dark:btn-accent btn-secondary">
                    Get started
                  </LinkButton>
                </div>
              </RevealAnimation>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-6 flex justify-center lg:justify-end">
            <div className="max-w-[595px] w-full relative z-20">
              <RevealAnimation delay={0.3}>
                <figure className="xl:max-w-[408px] max-w-[340px] w-full rounded-[20px] overflow-hidden xl:ml-9 relative z-10 shadow-2xl">
                  <Image src={revenue} className="size-full object-cover inline-block dark:hidden" alt="Luminous Solutions" />
                  <Image
                    src={revenueDark}
                    className="size-full object-cover hidden dark:inline-block"
                    alt="Luminous Solutions"
                  />
                </figure>
              </RevealAnimation>
              <RevealAnimation delay={0.4} useSpring={true} duration={1.9} direction="right">
                <figure className="absolute xl:-top-20 -top-16 -z-10 xl:right-0 -right-4 xl:max-w-[227px] max-w-[190px] w-full overflow-hidden rounded-2xl shadow-xl">
                  <Image src={netSales} className="size-full object-cover inline-block dark:hidden" alt="Performance Metrics" />
                  <Image
                    src={netSalesDark}
                    className="size-full object-cover hidden dark:inline-block"
                    alt="Performance Metrics"
                  />
                </figure>
              </RevealAnimation>
              <RevealAnimation delay={0.2} direction="left">
                <figure className="absolute xl:-top-40 -top-32 -z-10 -left-4 xl:max-w-[350px] max-w-[280px] w-full overflow-hidden rounded-2xl shadow-xl">
                  <Image
                    src={userActivity}
                    className="size-full object-cover inline-block dark:hidden"
                    alt="User Engagement"
                  />
                  <Image
                    src={userActivityDark}
                    className="size-full object-cover hidden dark:inline-block"
                    alt="User Engagement"
                  />
                </figure>
              </RevealAnimation>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solutions;
