import About from '@/components/luminous/About';
import Portfolio from '@/components/luminous/Portfolio';
import Blog from '@/components/luminous/Blog';
import CTA from '@/components/luminous/CTA';
import Hero from '@/components/luminous/Hero';
import Results from '@/components/luminous/Results';
import Services from '@/components/luminous/Services';
import AITransform from '@/components/luminous/AITransform';
import Industries from '@/components/luminous/Industries';
import Steps from '@/components/luminous/Steps';
import Testimonial from '@/components/luminous/Testimonial';
import WhyUs from '@/components/luminous/WhyUs';
import FooterOne from '@/components/shared/footer/FooterOne';
import NavbarOne from '@/components/shared/header/NavbarOne';
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
        <Services />
        <AITransform />
        <Industries />
        <Steps />
        <Portfolio />
        <WhyUs />
        <Results />
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
