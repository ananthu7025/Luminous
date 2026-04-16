import BlogListWithAPI from '@/components/sections/BlogList';
import CTAV1 from '@/components/shared/CTA/CTAV1';
import FooterOne from '@/components/layout/footer/Footer';
import NavbarOne from '@/components/layout/header/Navbar';
import PageHero from '@/components/shared/PageHero';
import { defaultMetadata } from '@/utils/generateMetaData';
import { Metadata } from 'next';
import { Fragment } from 'react';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'Blog — Luminous Logics | Engineering Insights & Build Logs',
  description: 'Real technical perspectives, build logs, and industry thinking from the Luminous Team.',
};

const BlogPage = () => {
  return (
    <Fragment>
      <NavbarOne
        className="bg-white dark:border border-stroke-6 dark:bg-background-9"
        btnClassName="btn-secondary hover:btn-white dark:hover:btn-white-dark dark:btn-accent"
      />
      <main className="bg-white dark:bg-black">
        <PageHero
          title="Our Blog"
          heading="Engineering Insights"
          className="pt-24 md:pt-36 lg:pt-40 xl:pt-[200px]"
        />
        <BlogListWithAPI hideButton={true} />
        <CTAV1
          className="dark:bg-black bg-white pt-0"
          badgeClass="!badge-cyan"
          badgeText="Work With Us"
          ctaHeading="Have a project in mind? Let&apos;s build it together."
          description="From MVP to enterprise scale, we provide the technical clarity you need."
          ctaBtnText="Get Started"
        />
      </main>
      <FooterOne />
    </Fragment>
  );
};

BlogPage.displayName = 'BlogPage';
export default BlogPage;
