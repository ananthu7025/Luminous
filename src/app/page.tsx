import About from '@/components/sections/About';
import Portfolio from '@/components/sections/Portfolio';
import Blog from '@/components/sections/Blog';
import CTA from '@/components/sections/CTA';
import Hero from '@/components/sections/Hero';
import Results from '@/components/sections/Results';
import Services from '@/components/sections/Services';
import AITransform from '@/components/sections/AITransform';
import Industries from '@/components/sections/Industries';
import Steps from '@/components/sections/Steps';
import Testimonial from '@/components/sections/Testimonial';
import WhyUs from '@/components/sections/WhyUs';
import FooterOne from '@/components/layout/footer/FooterOne';
import NavbarOne from '@/components/layout/header/NavbarOne';
import HydrationGuard from '@/components/HydrationGuard';
import { Metadata } from 'next';
import { Fragment } from 'react';

export const metadata: Metadata = {
  title: 'Luminous Logics — Custom Web & Mobile App Development | Kochi, India',
  description:
    'Luminous Logics builds custom web apps, mobile apps, LMS platforms, and SaaS products for startups and enterprises across India, Kuwait, and Canada.',
};

const LuminousHomepage = () => {
  return (
    <Fragment>
      <NavbarOne
        className="bg-white dark:border border-stroke-6 dark:bg-background-9"
        btnClassName="btn-secondary hover:btn-white dark:hover:btn-white-dark dark:btn-accent"
      />
      <main className="bg-white dark:bg-black">
        <Hero />
        <About />
        <HydrationGuard>
          <Services />
        </HydrationGuard>
        <AITransform />
        <HydrationGuard>
          <Industries />
        </HydrationGuard>
        <Steps />
        <HydrationGuard>
          <Portfolio />
        </HydrationGuard>
        <WhyUs />
        <HydrationGuard>
          <Results />
        </HydrationGuard>
        <Testimonial />
        <Blog />
        <CTA />
      </main>
      <FooterOne />
    </Fragment>
  );
};

LuminousHomepage.displayName = 'LuminousHomepage';
export default LuminousHomepage;
