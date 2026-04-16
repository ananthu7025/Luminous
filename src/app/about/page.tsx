import About from '@/components/sections/About';
import Innovation from '@/components/sections/Innovation';
import CTA from '@/components/sections/CTA';
import FooterOne from '@/components/layout/footer/Footer';
import NavbarOne from '@/components/layout/header/Navbar';
import PageHero from '@/components/shared/PageHero';
import Results from '@/components/sections/Results';
import { defaultMetadata } from '@/utils/generateMetaData';
import { Metadata } from 'next';
import { Fragment } from 'react';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'About Us — Luminous Logics | Engineering Digital Products',
  description: 'Learn about Luminous Logics, a product-focused software company in Kochi, India, specializing in web and mobile app development.',
};

const AboutPage = () => {
  return (
    <Fragment>
      <NavbarOne
        className="bg-white dark:border border-stroke-6 dark:bg-background-9"
        btnClassName="btn-secondary hover:btn-white dark:hover:btn-white-dark dark:btn-accent"
      />
      <main className="bg-white dark:bg-black pt-20">
        <PageHero
          title="About Us"
          heading="Engineering the Future"
          className="pt-24 md:pt-36 lg:pt-40 xl:pt-[200px]"
        />
        <About hideButton={true} />
        <Innovation />
        <Results />
        <div className="pb-16 md:pb-24">
            <CTA />
        </div>
      </main>
      <FooterOne />
    </Fragment>
  );
};

AboutPage.displayName = 'AboutPage';
export default AboutPage;
