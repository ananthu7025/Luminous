'use client';

import RevealAnimation from '@/components/animation/RevealAnimation';
import { cn } from '@/utils/cn';
import Link from 'next/link';
import { FC } from 'react';

interface CTAV1Props {
  className?: string;
  badgeClass?: string;
  badgeText?: string;
  ctaHeading?: string;
  description?: string;
  ctaBtnText?: string;
  btnClass?: string;
}

const CTAV1: FC<CTAV1Props> = ({
  className,
  badgeClass,
  badgeText,
  ctaHeading,
  description,
  ctaBtnText,
  btnClass,
}) => {
  return (
    <section className={cn('py-16 md:py-24', className)}>
      <div className="main-container">
        <div className="max-w-[850px] mx-auto text-center space-y-6">
          {badgeText && (
            <RevealAnimation delay={0.1}>
              <span className={cn('badge', badgeClass)}>{badgeText}</span>
            </RevealAnimation>
          )}
          {ctaHeading && (
            <RevealAnimation delay={0.2}>
              <h2 className="text-secondary dark:text-accent">{ctaHeading}</h2>
            </RevealAnimation>
          )}
          {description && (
            <RevealAnimation delay={0.3}>
              <p className="max-w-[600px] mx-auto text-secondary/70 dark:text-white/60">
                {description}
              </p>
            </RevealAnimation>
          )}
          {ctaBtnText && (
            <RevealAnimation delay={0.4}>
              <Link
                href="/contact-us"
                className={cn('btn btn-secondary dark:btn-accent btn-xl px-10', btnClass)}>
                {ctaBtnText}
              </Link>
            </RevealAnimation>
          )}
        </div>
      </div>
    </section>
  );
};

CTAV1.displayName = 'CTAV1';
export default CTAV1;
