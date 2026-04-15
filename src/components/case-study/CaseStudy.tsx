import { ICaseStudy } from '@/interface';
import getMarkDownData from '@/utils/getMarkDownData';
import Image from 'next/image';
import Link from 'next/link';
import RevealAnimation from '../animation/RevealAnimation';

const CaseStudy = () => {
  const projects: ICaseStudy[] = getMarkDownData('src/data/luminous/portfolio');
  const featuredProject = projects.find((p) => p.featured) || projects[0];

  return (
    <section className="pt-7 pb-[20px] lg:pb-[100px]">
      <div className="main-container">
        <div className="space-y-[70px]">
          <div className="max-w-[900px] space-y-3">
            <RevealAnimation delay={0.2}>
              <h1 className="text-heading-3 md:text-heading-2 font-normal">How leading teams grow with Luminous Logics</h1>
            </RevealAnimation>
            <RevealAnimation delay={0.3}>
              <p>
                From fast-moving startups to established enterprises, businesses around the world use Luminous Logics to
                streamline operations, increase visibility, and accelerate growth. Explore how our digital solutions deliver
                real-world impact.
              </p>
            </RevealAnimation>
          </div>

          <div className="bg-white dark:bg-background-6 rounded-[40px] p-6 lg:p-12 border border-stroke-4 dark:border-stroke-7 shadow-3 overflow-hidden">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              {/* text content */}
              <div className="w-full lg:w-1/2 space-y-10 order-2 lg:order-1">
                <div className="space-y-4">
                  <RevealAnimation delay={0.4}>
                    <span className="badge badge-cyan">Featured case study</span>
                  </RevealAnimation>
                  <RevealAnimation delay={0.5}>
                    <h2 className="text-heading-3 md:text-heading-2">{featuredProject.title}</h2>
                  </RevealAnimation>
                </div>

                <div className="grid grid-cols-2 gap-8 border-y border-stroke-4 dark:border-stroke-7 py-8">
                  <RevealAnimation delay={0.6}>
                    <div className="space-y-1">
                      <p className="text-tagline-2 text-secondary/60 dark:text-accent/60 uppercase tracking-widest font-bold">Client</p>
                      <p className="text-lg font-medium text-secondary dark:text-accent">{featuredProject.title}</p>
                    </div>
                  </RevealAnimation>
                  <RevealAnimation delay={0.7}>
                    <div className="space-y-1">
                      <p className="text-tagline-2 text-secondary/60 dark:text-accent/60 uppercase tracking-widest font-bold">Industry</p>
                      <p className="text-lg font-medium text-secondary dark:text-accent">{featuredProject.industry}</p>
                    </div>
                  </RevealAnimation>
                </div>

                <div className="space-y-4">
                  <RevealAnimation delay={0.2}>
                    <h3 className="text-tagline-1 font-bold uppercase tracking-widest text-secondary dark:text-accent">The Challenge</h3>
                  </RevealAnimation>
                  <RevealAnimation delay={0.3}>
                    <p className="text-secondary/80 dark:text-accent/80 text-lg leading-relaxed line-clamp-4">
                      {featuredProject.description}
                    </p>
                  </RevealAnimation>
                  <RevealAnimation delay={0.4}>
                    <div className="pt-4">
                      <Link href={`/case-study/${featuredProject.slug}`} className="btn btn-secondary dark:btn-accent btn-md">
                        Read full story
                      </Link>
                    </div>
                  </RevealAnimation>
                </div>
              </div>

              {/* image container */}
              <div className="w-full lg:w-1/2 order-1 lg:order-2">
                <RevealAnimation delay={0.8} direction="right">
                  <figure className="rounded-3xl overflow-hidden relative shadow-2 border border-stroke-4 dark:border-stroke-7 bg-background-3 dark:bg-background-7 aspect-[4/3] lg:aspect-square xl:aspect-[4/3] max-w-[600px] mx-auto">
                    <Image
                      src={featuredProject.thumbnail || '/images/case-study/case-study-img-01.png'}
                      alt={`${featuredProject.title} project visualization`}
                      fill
                      className="w-full h-full object-cover p-4 lg:p-8"
                    />
                  </figure>
                </RevealAnimation>
              </div>
            </div>
          </div>

          <div className="flex items-center flex-col md:flex-row gap-16 justify-between bg-background-3 dark:bg-background-7 p-10 lg:p-14 rounded-[40px]">
            <div className="space-y-6 w-full md:w-1/2">
              <div>
                <RevealAnimation delay={0.3}>
                  <h4 className="text-heading-4">The Solution</h4>
                </RevealAnimation>
              </div>
              <ul className="grid grid-cols-1 gap-4">
                {featuredProject.keyFeatures?.slice(0, 4).map((feature: string, idx: number) => (
                  <RevealAnimation key={idx} delay={0.3 + idx * 0.1}>
                    <li className="flex items-start gap-3">
                      <span className="mt-1.5 size-2 bg-secondary dark:bg-accent rounded-full shrink-0" />
                      <p className="text-secondary/80 dark:text-accent/80">{feature}</p>
                    </li>
                  </RevealAnimation>
                ))}
              </ul>
            </div>
            <div className="space-y-6 w-full md:w-1/2">
              <div>
                <RevealAnimation delay={0.3}>
                  <h4 className="text-heading-4">The Impact</h4>
                </RevealAnimation>
              </div>
              <ul className="grid grid-cols-1 gap-4">
                {featuredProject.after?.slice(0, 4).map((result: string, idx: number) => (
                  <RevealAnimation key={idx} delay={0.3 + idx * 0.1}>
                    <li className="flex items-start gap-3">
                      <span className="mt-1.5 size-2 bg-secondary dark:bg-accent rounded-full shrink-0" />
                      <p className="text-secondary/80 dark:text-accent/80">{result}</p>
                    </li>
                  </RevealAnimation>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudy;
