import Services from '@/components/luminous/Services';
import ServicesV2 from '@/components/luminous/ServicesV2';
import Solutions from '@/components/luminous/Solutions';
import Steps from '@/components/luminous/Steps';
import CTAV1 from '@/components/shared/CTA/CTAV1';
import FooterOne from '@/components/shared/footer/FooterOne';
import NavbarOne from '@/components/shared/header/NavbarOne';
import PageHero from '@/components/shared/PageHero';
import { defaultMetadata } from '@/utils/generateMetaData';
import { Metadata } from 'next';
import { Fragment } from 'react';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'Our Services — Luminous Logics | Custom Web & Mobile App Development',
  description: 'Explore our full suite of digital delivery services, from custom web and mobile development to UI/UX design and business strategy.',
};

const ServicesPage = () => {
  return (
    <Fragment>
      <NavbarOne
        className="bg-white dark:border border-stroke-6 dark:bg-background-9"
        btnClassName="btn-secondary hover:btn-white dark:hover:btn-white-dark dark:btn-accent"
      />
      <main className="bg-white dark:bg-black">
        <PageHero
          title="Our Services"
          heading="Expertise That Drives Growth"
          className="pt-24 md:pt-36 lg:pt-40 xl:pt-[200px]"
        />
        <Services hideButton={true} />
        <Solutions />
        <ServicesV2 />
        <Steps />
        <CTAV1
          className="dark:bg-black bg-white"
          badgeClass="!badge-yellow-v2"
          badgeText="Get started"
          ctaHeading="Ready to build something extraordinary?"
          description="Schedule a free strategy session with our technical architects today."
          ctaBtnText="Book a Call"
          btnClass="hover:btn-secondary dark:hover:btn-accent"
        />
      </main>
      <FooterOne />
    </Fragment>
  );
};

ServicesPage.displayName = 'ServicesPage';
export default ServicesPage;
