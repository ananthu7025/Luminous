'use client';

import RevealAnimation from '@/components/animation/RevealAnimation';
import LinkButton from '@/components/ui/button/LinkButton';
import reviews from '@/data/luminous/testimonials.json';
import { cn } from '@/utils/cn';
import Image from 'next/image';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import GradientOverlay from '../shared/reviews/GradientOverlay';

const GRADIENTS = [
  'bg-linear-[156deg,_#FFF_32.92%,_#FFB9A2_91%]',
  'bg-linear-[156deg,_#FFF_32.92%,_#83E7EE_91%]',
  'bg-linear-[156deg,_#FFF_32.92%,_#C6F56F_91%]',
  'bg-linear-[156deg,_#FFF_32.92%,_#FFD6A5_91%]',
];
const pickGradient = (i: number) => GRADIENTS[i % GRADIENTS.length];

type Review = {
  id?: string | number;
  name: string;
  title?: string;
  quote: string;
  avatar?: string;
  position?: string;
};

const Testimonials = () => {
  return (
    <section className="py-16 md:py-[90px] lg:py-[100px] bg-background-3 dark:bg-background-7">
      <div className="main-container">
        <div className="space-y-10 md:space-y-[70px]">
          <div className="space-y-3 text-center">
            <RevealAnimation delay={0.2}>
              <span className="badge badge-cyan mb-5">Client Reviews</span>
            </RevealAnimation>
            <RevealAnimation delay={0.1}>
              <h2>Real people. Real results.</h2>
            </RevealAnimation>
            <RevealAnimation delay={0.2}>
              <p className="max-w-[472px] md:w-full mx-auto">
                &ldquo;Luminous Logics delivered our entire platform ahead of schedule — flawless execution and real
                partnership.&rdquo;
              </p>
            </RevealAnimation>
          </div>

          <RevealAnimation delay={0.4}>
            <div className="relative">
              <Swiper
                spaceBetween={30}
                slidesPerView={3}
                centeredSlides={true}
                loop={true}
                speed={1500}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                modules={[Autoplay]}
                navigation={false}
                pagination={false}
                scrollbar={false}
                className="swiper reviews-swiper">
                <div className="swiper-wrapper">
                  {reviews.map((review: Review, i: number) => {
                    const figureBg = pickGradient(i);
                    return (
                      <SwiperSlide className="swiper-slide" key={review.id ?? `${review.name}-${i}`}>
                        <div className="bg-white dark:bg-background-6 rounded-[20px] relative overflow-hidden p-8 flex flex-col gap-y-8 z-0">
                          <GradientOverlay />
                          <figure className={`inline-block size-14 rounded-full ${figureBg} overflow-hidden relative`}>
                            <Image
                              src={review.avatar ?? '/images/avatar/avatar-1.png'}
                              alt={review.name ?? 'avatar'}
                              className="max-w-full"
                              width={56}
                              height={56}
                            />
                          </figure>
                          <p className="text-secondary/60 dark:text-accent/60 review-text line-clamp-2">{`"${review.quote}"`}</p>
                          <div>
                            <p className="text-secondary dark:text-accent font-medium text-lg leading-[1.5] review-name">
                              {review.name}
                            </p>
                            {review.position && (
                              <p className="text-secondary/60 dark:text-accent/60 text-tagline-2 review-title">
                                {review.position}
                              </p>
                            )}
                          </div>
                        </div>
                      </SwiperSlide>
                    );
                  })}
                </div>
              </Swiper>
            </div>
          </RevealAnimation>
        </div>
        <RevealAnimation delay={0.5}>
          <div className="text-center mt-10 lg:mt-14">
            <LinkButton
              href="/contact-us"
              className="btn btn-md btn-secondary dark:btn-transparent hover:btn-white w-full sm:w-auto">
              Work with us
            </LinkButton>
          </div>
        </RevealAnimation>
      </div>
    </section>
  );
};

export default Testimonials;
