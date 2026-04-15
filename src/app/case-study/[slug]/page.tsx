import CaseStudyDetails from '@/components/case-study/CaseStudyDetails';
import CTAV1 from '@/components/shared/CTA/CTAV1';
import FooterOne from '@/components/shared/footer/FooterOne';
import NavbarOne from '@/components/shared/header/NavbarOne';
import PageHero from '@/components/shared/PageHero';
import { defaultMetadata } from '@/utils/generateMetaData';
import getMarkDownData from '@/utils/getMarkDownData';
import { Metadata } from 'next';

export async function generateStaticParams() {
  const caseStudies = getMarkDownData('src/data/luminous/portfolio');
  return caseStudies.map((post) => ({
    slug: post.slug,
  }));
}

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'Case Study Details — Luminous Logics',
};

interface CaseStudyDetailsPageProps {
  params: Promise<{ slug: string }>;
}

const CaseStudyDetailsPage = async ({ params }: CaseStudyDetailsPageProps) => {
  const slug = (await params).slug;

  return (
    <>
      <NavbarOne
        className="border border-stroke-2 bg-accent/60 dark:border-stroke-6 dark:bg-background-9 backdrop-blur-[25px]"
        btnClassName="btn-primary hover:btn-secondary dark:hover:btn-accent"
      />
      <main className="bg-background-3 dark:bg-background-7">
        <PageHero
          title="Case Study Details"
          heading="Case Study Details"
          link="/case-study"
          className="pt-24 md:pt-36 lg:pt-40 xl:pt-[200px]"
        />
        <CaseStudyDetails slug={slug} />

        <CTAV1
          className="dark:bg-background-5 bg-white"
          badgeClass="badge-yellow-v2"
          badgeText="Get started"
          ctaHeading="Build a complete website using the assistance"
          description="Start your free trial today and see your ideas come to life easily and creatively."
          ctaBtnText="Get started"
          btnClass="hover:btn-secondary dark:hover:btn-accent"
        />
      </main>
      <FooterOne />
    </>
  );
};
CaseStudyDetailsPage.displayName = 'CaseStudyDetailsPage';
export default CaseStudyDetailsPage;
