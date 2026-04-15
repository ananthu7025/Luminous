import { ICaseStudy } from '@/interface';
import Image from 'next/image';
import RevealAnimation from '../animation/RevealAnimation';

const CaseStudyTestimonial = ({ userReview }: { userReview: ICaseStudy['userReview'] }) => {
  return (
    <section>
      <div className="max-w-[950px] mx-auto">
        <div className="space-y-14">
          {/* heading  */}
          <div className="space-y-3">
            <RevealAnimation delay={0.1}>
              <h4 className="text-heading-2" id="testimonials-title">
                What our users say
              </h4>
            </RevealAnimation>
            <blockquote>
              <RevealAnimation delay={0.2}>
                <p>
                  &quot;The execution was flawless and the partnership has been a real game-changer for our business.&quot;
                </p>
              </RevealAnimation>
            </blockquote>
          </div>
          {/* testimonial card  */}
          <RevealAnimation delay={0.3}>
            <div className="bg-secondary dark:bg-background-6 p-8 rounded-[20px] space-y-6 max-w-[950px]">
              <figure className="size-14 rounded-full overflow-hidden bg-(image:--color-gradient-7) relative">
                <Image
                  src={(userReview as any).profileImg || (userReview as any).userImage}
                  className="size-full object-cover"
                  fill
                  priority
                  alt={(userReview as any).name || (userReview as any).userName}
                />
              </figure>
              <blockquote>
                <p className="text-white dark:text-accent/60">
                  {(userReview as any).review || (userReview as any).reviewText}
                </p>
              </blockquote>
              <div className="pb-4">
                <p className="text-white text-lg font-medium leading-[150%]">
                  {(userReview as any).name || (userReview as any).userName}
                </p>
                <p className="text-tagline-2 text-accent/60">
                  {(userReview as any).position || (userReview as any).userRole}
                </p>
              </div>
            </div>
          </RevealAnimation>
        </div>
      </div>
    </section>
  );
};

export default CaseStudyTestimonial;
