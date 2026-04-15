import { CheckIcon } from '@/icons';
import aboutBgImg from '@public/images/home-page-2/about-bg.png';
import Image from 'next/image';
import RevealAnimation from '../animation/RevealAnimation';
import LinkButton from '../ui/button/LinkButton';

const checklist = [
  {
    id: 1,
    title: 'Precision Engineering',
    text: 'Prioritizing simplicity, maintainability, and architectural excellence in every line of code.',
  },
  {
    id: 2,
    title: 'Customer-Centric Innovation',
    text: 'Building solutions driven by real user insights and business outcomes, not just technical specs.',
  },
  {
    id: 3,
    title: 'Security-First Mindset',
    text: 'Implementing robust security measures and data protection as a core foundation of development.',
  },
  {
    id: 4,
    title: 'Radical Transparency',
    text: 'Fostering trust through open communication, regular updates, and shared technical roadmaps.',
  },
  {
    id: 5,
    title: 'Scalable Development',
    text: 'Building high-performance architectures designed to grow with your user base without compromise.',
  },
];

const Innovation = () => {
  return (
    <section className="py-16 md:py-24 bg-white dark:bg-black">
      <RevealAnimation delay={0.2}>
        <div className="main-container">
          <div className="relative z-10 p-8 md:p-16 rounded-[32px] overflow-hidden border border-stroke-6/20 shadow-lg">
            <div className="absolute top-0 left-0 right-0 bottom-0 -z-10 bg-secondary dark:bg-background-8">
              <Image src={aboutBgImg} alt="about bg" className="w-full h-full object-cover opacity-10 dark:opacity-20 grayscale" />
            </div>
            <div className="grid max-lg:grid-cols-1 grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-12 text-center space-y-6">
                 <RevealAnimation delay={0.1}>
                    <span className="badge badge-blur mx-auto">Core Values</span>
                  </RevealAnimation>
                <h2 className="text-white max-w-[800px] mx-auto">
                  Integrity, Innovation, and Collaboration define our DNA.
                </h2>
              </div>
              <div className="lg:col-span-12">
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                  {checklist.map((item, i) => (
                    <RevealAnimation key={item.id} delay={0.3 + i * 0.1}>
                        <li className="space-y-4 bg-white/5 dark:bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm h-full">
                        <span className="size-10 bg-accent/20 rounded-full flex items-center justify-center">
                            <CheckIcon className="fill-accent size-6" />
                        </span>
                        <div>
                            <h4 className="text-white text-heading-6 mb-2">{item.title}</h4>
                            <p className="text-accent/60 text-sm leading-relaxed">{item.text}</p>
                        </div>
                        </li>
                    </RevealAnimation>
                  ))}
                </ul>
              </div>
              <div className="lg:col-span-12 text-center pt-8">
                  <RevealAnimation delay={0.7}>
                    <LinkButton
                        href="/contact-us"
                        className="btn btn-xl btn-white hover:btn-primary dark:btn-accent">
                        Work With Us
                    </LinkButton>
                  </RevealAnimation>
              </div>
            </div>
          </div>
        </div>
      </RevealAnimation>
    </section>
  );
};

export default Innovation;
