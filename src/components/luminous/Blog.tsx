import { IBlogPost } from '@/interface';
import getMarkDownData from '@/utils/getMarkDownData';
import RevealAnimation from '../animation/RevealAnimation';
import BlogCardV1 from '../shared/card/BlogCardV1';
import LinkButton from '../ui/button/LinkButton';

const blogs: any[] = [
  {
    title: 'Architecting a Multi-Role LMS: Lessons from NCAMadeEasy',
    slug: 'architecting-multi-role-lms',
    publishDate: 'April 10, 2024',
    thumbnail: '/images/blog/architecting-multi-role-lms.png',
    tag: 'Architecture',
    author: 'Luminous Team',
    authorImage: '/images/avatar/avatar-1.png',
    readTime: '8 min',
    description: 'A deep dive into the technical architecture of a scalable, high-performance Learning Management System.',
  },
  {
    title: 'JWT Authentication and Role-Based Access in Production SaaS Apps',
    slug: 'jwt-auth-saas',
    publishDate: 'April 12, 2024',
    thumbnail: '/images/blog/jwt-auth-saas.png',
    tag: 'SaaS',
    author: 'Luminous Team',
    authorImage: '/images/avatar/avatar-1.png',
    readTime: '7 min',
    description: 'How to handle JWTs, httpOnly cookies, and multi-tenant roles securely.',
  },
  {
    title: 'Why Custom Software Beats No-Code for Scaling Businesses in 2025',
    slug: 'custom-software-vs-nocode',
    publishDate: 'April 14, 2024',
    thumbnail: '/images/blog/custom-software-vs-nocode.png',
    tag: 'Strategy',
    author: 'Luminous Team',
    authorImage: '/images/avatar/avatar-1.png',
    readTime: '6 min',
    description: 'Understanding the hard ceilings of no-code and when to make the pivot.',
  },
  {
    title: 'Building for the GCC Market: What Indian Dev Teams Need to Know',
    slug: 'gcc-market-insights',
    publishDate: 'April 16, 2024',
    thumbnail: '/images/blog/gcc-market-insights.png',
    tag: 'Business',
    author: 'Luminous Team',
    authorImage: '/images/avatar/avatar-1.png',
    readTime: '6 min',
    description: 'Navigating the cultural and technical requirements of the Gulf market.',
  },
  {
    title: 'From MVP to Multi-Tenant: Our SaaS Product Development Playbook',
    slug: 'mvp-to-multitenant-saas',
    publishDate: 'April 18, 2024',
    thumbnail: '/images/blog/mvp-to-multitenant-saas.png',
    tag: 'Product',
    author: 'Luminous Team',
    authorImage: '/images/avatar/avatar-1.png',
    readTime: '9 min',
    description: 'Our repeatable playbook for taking SaaS CONCEPTs to PRODUCTION platforms.',
  },
];

interface BlogProps {
  blogs?: any[];
  hideButton?: boolean;
}

const Blog = ({ blogs: customBlogs, hideButton = false }: BlogProps) => {
  const displayBlogs = customBlogs || blogs;
  return (
    <section
      className="pt-20 pb-28 md:pt-32 md:pb-32 lg:pt-[128px] lg:pb-[128px] xl:pt-[100px] xl:pb-[100px] bg-background-2 dark:bg-background-5"
      aria-label="Blog posts and insights">
      <div className="main-container">
        <div className="text-center mb-[70px]">
          <RevealAnimation delay={0.1}>
            <span className="badge badge-cyan mb-5">Blog</span>
          </RevealAnimation>
          <RevealAnimation delay={0.2}>
            <h2 className="mb-3">Engineering Insights from the Luminous Team</h2>
          </RevealAnimation>
          <RevealAnimation delay={0.3}>
            <p className="max-w-[738px] mx-auto">
              Real technical perspectives, build logs, and industry thinking — from the engineers and strategists who ship products every day.
            </p>
          </RevealAnimation>
        </div>

        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
          {displayBlogs.map((blog, index) => (
            <RevealAnimation delay={0.3 + index * 0.1} key={blog.slug}>
              <BlogCardV1
                blog={blog}
                className="bg-white dark:bg-background-6 border border-stroke-4 dark:border-background-6"
              />
            </RevealAnimation>
          ))}
        </div>

        {!hideButton && (
          <div className="flex justify-center mt-7 md:mt-14">
            <RevealAnimation delay={0.7}>
              <LinkButton
                href="/blog"
                className="btn btn-secondary hover:btn-white dark:hover:btn-accent dark:btn-transparent btn-md"
                aria-label="View all blog posts">
                See all insights
              </LinkButton>
            </RevealAnimation>
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;
