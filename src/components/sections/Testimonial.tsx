'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/utils/cn';
import gradient22Img from '@public/images/gradient/gradient-22.png';
import Image from 'next/image';
import Marquee from 'react-fast-marquee';
import RevealAnimation from '../animation/RevealAnimation';
import { crmApi, fetchFromCRM } from '@/config/api';

interface TestimonialCard {
  id: string;
  name: string;
  company: string;
  avatar: string;
  testimonial: string;
  active?: boolean;
}

interface TestimonialResponse {
  testimonials: TestimonialCard[];
}

const TestimonialWithAPI = () => {
  const [testimonials, setTestimonials] = useState<TestimonialCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchFromCRM<TestimonialResponse>(crmApi.testimonials.list());
      if (data && 'testimonials' in data) {
        setTestimonials(data.testimonials);
      } else {
        setError('Failed to load testimonials');
      }
    } catch (err) {
      console.error('Error loading testimonials:', err);
      setError('Failed to load testimonials');
    } finally {
      setLoading(false);
    }
  };

  if (error || loading) {
    return null; // Don't show section if there's an error or loading
  }

  if (!testimonials || testimonials.length === 0) {
    return null; // Don't show section if no testimonials
  }

  return (
    <RevealAnimation delay={0.1}>
      <section className="pt-14 md:pt-16 lg:pt-[88px] xl:pt-[150px] pb-14 md:pb-16 lg:pb-[88px] xl:pb-[150px] bg-background-3 dark:bg-background-7">
        <div className="main-container">
          <div className="mb-[72px] text-center">
            <RevealAnimation delay={0.1}>
              <span className="badge badge-pink mb-5">Testimonials</span>
            </RevealAnimation>
            <RevealAnimation delay={0.2}>
              <h2 className="mb-3">Trusted by Industry Leaders</h2>
            </RevealAnimation>
            <RevealAnimation delay={0.3}>
              <p className="max-w-[550px] mx-auto">
                From HVAC operations in the GCC to ed-tech platforms in India, companies across sectors rely on Luminous to ship world-class products.
              </p>
            </RevealAnimation>
          </div>

          <div className="relative overflow-hidden">
            <Image
              src={gradient22Img}
              alt="Gradient background"
              className="absolute -top-20 -right-40 -z-10 w-full opacity-50 dark:opacity-10"
            />

            <Marquee gradient={true} gradientColor="transparent" speed={50} pauseOnHover>
              {testimonials.map(
                (
                  testimonial: TestimonialCard,
                  index: number
                ) => (
                  <div
                    key={testimonial.id || index}
                    className={cn(
                      'min-w-[350px] md:min-w-[500px] xl:min-w-[550px] mx-4 p-6 md:p-8 rounded-2xl border bg-white dark:bg-background-6 border-stroke-2 dark:border-background-5',
                      index % 2 === 0 ? '' : ''
                    )}>
                    <p className="text-sm md:text-base text-secondary dark:text-white/60 mb-6">
                      {testimonial.testimonial}
                    </p>

                    <div className="flex items-center gap-4">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover"
                        width={48}
                        height={48}
                      />
                      <div>
                        <p className="font-semibold text-secondary dark:text-white">
                          {testimonial.name}
                        </p>
                        <p className="text-xs md:text-sm text-secondary/60 dark:text-white/40">
                          {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              )}
            </Marquee>
          </div>
        </div>
      </section>
    </RevealAnimation>
  );
};

export default TestimonialWithAPI;
