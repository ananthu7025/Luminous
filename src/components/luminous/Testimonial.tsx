import { cn } from '@/utils/cn';
import gradient22Img from '@public/images/gradient/gradient-22.png';
import Image from 'next/image';
import Marquee from 'react-fast-marquee';
import RevealAnimation from '../animation/RevealAnimation';

interface TestimonialCard {
  id: number;
  name: string;
  company: string;
  avatar: string;
  testimonial: string;
  twitterUrl: string;
}

const testimonialCards: TestimonialCard[] = [
  {
    id: 1,
    name: 'Al Sabah HVAC Solutions',
    company: 'International HVAC Operations — Kuwait & Canada',
    avatar: '/images/luminous-assets/alsabhalogo.svg',
    testimonial:
      'The digital solution Luminous Logics built for us directly supported our international expansion vision. Professional, reliable, and they truly understood our requirements from day one.',
    twitterUrl: '#',
  },
  {
    id: 2,
    name: 'NCAMadeEasy',
    company: 'LMS & Learning Platform — India',
    avatar: '/images/luminous-assets/ncalogo.avif',
    testimonial:
      'The LMS platform Luminous built was a true game-changer for our exam preparation platform. Fast delivery, clean design, and exactly what we envisioned — highly recommend.',
    twitterUrl: '#',
  },
  {
    id: 3,
    name: 'SpiceMagic',
    company: 'E-commerce & Retail Platform',
    avatar: '/images/luminous-assets/spicemagiclogo.webp',
    testimonial:
      'The SpiceMagic e-commerce platform has been a total success. The design is beautiful and the shopping experience is flawless. Highly recommend Luminous Logics!',
    twitterUrl: '#',
  },
  {
    id: 4,
    name: "St. Mary's",
    company: 'Landscaping & Construction Services',
    avatar: '/images/luminous-assets/stmarieslogo.webp',
    testimonial:
      "Our new website as Saskatoon's best landscaping team has really helped us grow. Luminous captured our vision perfectly and delivered a premium result.",
    twitterUrl: '#',
  },
];

const Testimonial = () => {
  return (
    <RevealAnimation delay={0.1}>
      <section className="pt-14 md:pt-16 lg:pt-[88px] xl:pt-[150px] pb-14 md:pb-16 lg:pb-[88px] xl:pb-[150px] bg-background-3 dark:bg-background-7">
        <div className="main-container">
          <div className="mb-[72px] text-center">
            <RevealAnimation delay={0.1}>
              <h2 className="text-secondary dark:text-accent">What Our Clients Say After Shipping With Us</h2>
            </RevealAnimation>
          </div>
        </div>

        <RevealAnimation delay={0.2}>
          <div className="relative">
            <div className="from-background-3 dark:from-background-7 absolute top-0 left-0 z-40 h-full w-[15%] bg-gradient-to-r to-transparent md:w-[20%]" />
            <div className="from-background-3 dark:from-background-7 absolute top-0 right-0 z-40 h-full w-[15%] bg-gradient-to-l to-transparent md:w-[20%]" />
            <Marquee>
              <div className="flex gap-x-10 items-center scroll-bar">
                {testimonialCards.map((testimonial, index) => (
                  <article
                    key={testimonial.id}
                    className={cn(
                      'bg-white dark:bg-background-5 rounded-[12px] lg:rounded-[20px] min-w-[320px] sm:min-w-[400px] cursor-pointer lg:min-w-[722px] space-y-6 lg:space-y-10 p-4 lg:p-14 backdrop-blur-[22px] relative group transition-all duration-500 ease-in-out hover:bg-secondary hover:dark:bg-background-8 overflow-hidden',
                      index === 0 && 'ml-10',
                    )}>
                    <div className="absolute -top-[147%] lg:-top-[162%] -right-[56%] lg:-right-[56%] max-w-[500px] lg:max-w-[723px] blur-[10px] rotate-[295deg] opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out select-none pointer-events-none">
                      <Image
                        src={gradient22Img}
                        alt="gradient"
                        className="size-full object-cover"
                        width={723}
                        height={500}
                      />
                    </div>
                    <div className="flex items-center justify-between relative z-10">
                      <div className="flex items-center gap-2">
                        <figure className="size-[60px] md:size-[84px] p-2 bg-white dark:bg-white/10 rounded-xl overflow-hidden transform group-hover:scale-[102%] transition-transform duration-500 ease-in-out border border-secondary/10 dark:border-white/10">
                          <Image
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            className="size-full object-contain"
                            width={84}
                            height={84}
                          />
                        </figure>
                        <div className="space-y-1">
                          <h3 className="text-tagline-2 font-semibold group-hover:text-accent transition-all duration-500 ease-in-out transform group-hover:-translate-y-0.5 group-hover:transition-transform">
                            {testimonial.name}
                          </h3>
                          <p className="text-tagline-3 group-hover:text-accent/60 transition-all duration-500 ease-in-out transform group-hover:-translate-y-0.5 group-hover:transition-transform">
                            {testimonial.company}
                          </p>
                        </div>
                      </div>
                    </div>
                    <blockquote>
                      <p className="max-w-[530px] text-wrap group-hover:text-accent/60 transition-all duration-500 ease-in-out transform group-hover:translate-x-1">
                        {testimonial.testimonial}
                      </p>
                    </blockquote>
                  </article>
                ))}
              </div>
            </Marquee>
          </div>
        </RevealAnimation>
      </section>
    </RevealAnimation>
  );
};

export default Testimonial;
