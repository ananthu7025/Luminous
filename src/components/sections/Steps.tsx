'use client';

import { useProgressStepsAnimation } from '@/hooks/useProgressStepsAnimation';
import RevealAnimation from '../animation/RevealAnimation';
import LinkButton from '../ui/button/LinkButton';

interface ProcessItem {
  id: number;
  stepNumber: string;
  title: string;
  description: string;
  progressWidth: string;
}

const processItems: ProcessItem[] = [
  {
    id: 1,
    stepNumber: 'Phase 01',
    title: 'Discover & Architect',
    description: 'We go deep on your goals, users, and constraints. Business analysis, technical scoping, and roadmap definition — before a single line of code.',
    progressWidth: '0%',
  },
  {
    id: 2,
    stepNumber: 'Phase 02',
    title: 'Design & Validate',
    description: 'High-fidelity wireframes and interactive prototypes reviewed and approved by you. We align on vision before development begins.',
    progressWidth: '0%',
  },
  {
    id: 3,
    stepNumber: 'Phase 03',
    title: 'Build, Launch & Scale',
    description: 'Production-grade code in Next.js, React Native, Node.js, and PostgreSQL — tested, documented, and delivered on schedule. We stay on after launch.',
    progressWidth: '0%',
  },
];

const Steps = () => {
  const { ref } = useProgressStepsAnimation({
    delay: 0.5,
    duration: 2,
    delayBetweenSteps: 2,
    triggerOnScroll: true,
  });

  return (
    <RevealAnimation delay={0.1}>
      <section
        className="pt-14 md:pt-16 lg:pt-[88px] xl:pt-[100px] pb-14 md:pb-16 lg:pb-[88px] xl:pb-[100px] -mt-[160px] sm:-mt-0"
        aria-label="Application Steps">
        <div className="main-container">
          <div className="space-y-14">
            <div ref={ref} className="progress-container flex items-start xl:items-center flex-col md:flex-row gap-8">
              {processItems.map((process, index) => (
                <RevealAnimation key={process.id} delay={0.3 + index * 0.1}>
                  <div
                    className="space-y-3 max-w-[388px] md:w-full"
                    role="region"
                    aria-label={`Step ${process.stepNumber}`}>
                    <div className="w-full bg-stroke-2 dark:bg-stroke-6 h-1 rounded-full relative overflow-hidden">
                      <div
                        className={`progress-line w-[${process.progressWidth}] bg-ns-green rounded-full h-full absolute left-0`}
                      />
                    </div>
                    <p className="text-tagline-2 text-primary-500">{process.stepNumber}</p>
                    <div className="space-y-2">
                      <h2 className="text-heading-5">{process.title}</h2>
                      <p className="w-full">{process.description}</p>
                    </div>
                  </div>
                </RevealAnimation>
              ))}
            </div>
            <RevealAnimation delay={0.6}>
              <div className="text-start">
                <LinkButton
                  href="/about"
                  className="btn btn-secondary btn-md dark:btn-transparent hover:btn-white"
                  role="button"
                  aria-label="Learn about our approach">
                  Learn about our approach
                </LinkButton>
              </div>
            </RevealAnimation>
          </div>
        </div>
      </section>
    </RevealAnimation>
  );
};

export default Steps;
