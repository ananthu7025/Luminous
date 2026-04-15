import { ICaseStudy } from '@/interface';
import getMarkDownData from '@/utils/getMarkDownData';
import Image from 'next/image';
import RevealAnimation from '../animation/RevealAnimation';
import LinkButton from '../ui/button/LinkButton';


const Portfolio = () => {
  const projects: ICaseStudy[] = getMarkDownData('src/data/luminous/portfolio');
  return (
    <section className="xl:py-[100px] lg:py-[90px] md:py-20 py-16">
      <div className="main-container">
        <div className="text-center space-y-3 mb-10 md:mb-[70px]">
          <RevealAnimation delay={0.1}>
            <span className="badge badge-cyan mb-5">Our Work</span>
          </RevealAnimation>
          <RevealAnimation delay={0.2}>
            <h2>Results from Projects That Made a Difference</h2>
          </RevealAnimation>
          <RevealAnimation delay={0.3}>
            <p className="max-w-[680px] mx-auto">
              Every project here solved a real problem. Every case study has a measurable outcome.
            </p>
          </RevealAnimation>
        </div>
        <div className="mb-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {projects.map((project, index) => (
              <RevealAnimation key={project.slug} delay={0.3 + index * 0.1}>
                <figure className="space-y-6">
                  <div className="relative w-full h-[300px] md:h-[380px] xl:h-[420px] rounded-[20px] overflow-hidden group">
                    <div className="absolute inset-0 bg-black/40 z-10 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100" />
                    <Image
                      src={project.thumbnail || ''}
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500 ease-in-out"
                      alt={project.title || 'portfolio'}
                      fill
                      priority
                    />
                    <LinkButton
                      href={`/case-study/${project.slug || ''}`}
                      className="group-hover:opacity-100 opacity-0 transition-all duration-500 ease-in-out absolute top-[55%] group-hover:top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 btn btn-md btn-white dark:btn-accent hover:!btn-white dark:hover:!btn-white-dark group-hover:shadow-3 border-0 transform hover:scale-[102%] z-20">
                      View case study
                    </LinkButton>
                  </div>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-[0.1em] px-2.5 py-1 rounded bg-secondary/5 dark:bg-white/5 text-secondary/60 dark:text-white/40 border border-secondary/10 dark:border-white/10">
                        {project.industry}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-[0.1em] px-2.5 py-1 rounded bg-secondary/5 dark:bg-white/5 text-secondary/60 dark:text-white/40 border border-secondary/10 dark:border-white/10">
                        {project.stack}
                      </span>
                    </div>
                    <div className="flex sm:items-center sm:flex-row flex-col sm:gap-4 gap-2 sm:justify-between justify-start">
                      <h3 className="text-heading-6 sm:text-heading-5">{project.title}</h3>
                      <p className="max-w-[257px] sm:text-right text-left line-clamp-2">{project.description}</p>
                    </div>
                  </div>
                </figure>
              </RevealAnimation>
            ))}
          </div>
        </div>
        <RevealAnimation delay={0.6}>
          <div className="text-center">
            <LinkButton
              href="/case-study"
              className="btn btn-secondary btn-xl dark:btn-transparent hover:btn-white dark:hover:btn-accent w-[90%] md:w-auto">
              See all projects
            </LinkButton>
          </div>
        </RevealAnimation>
      </div>
    </section>
  );
};

export default Portfolio;
