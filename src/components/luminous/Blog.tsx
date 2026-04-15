import { IBlogPost } from '@/interface';
import getMarkDownData from '@/utils/getMarkDownData';
import RevealAnimation from '../animation/RevealAnimation';
import BlogCardV1 from '../shared/card/BlogCardV1';
import LinkButton from '../ui/button/LinkButton';

const blogs: any[] = [
  {
    title: 'How We Architected a Multi-Role LMS on Next.js for 500+ Concurrent Users',
    slug: 'architecting-multi-role-lms',
    publishDate: 'April 10, 2024',
    thumbnail: '/images/blog/blog-1.png',
    tag: 'Engineering',
    author: 'Luminous Team',
    authorImage: '/images/avatar/avatar-1.png',
    readTime: '8 min',
    description: 'A deep dive into the architectural decisions for scaling a Next.js LMS platform.',
  },
  {
    title: 'JWT Authentication and Role-Based Access in Production SaaS Apps',
    slug: 'jwt-auth-saas',
    publishDate: 'March 28, 2024',
    thumbnail: '/images/blog/blog-2.png',
    tag: 'SaaS',
    author: 'Luminous Team',
    authorImage: '/images/avatar/avatar-1.png',
    readTime: '6 min',
    description: 'Best practices for securing multi-tenant SaaS applications with JWT and RBAC.',
  },
  {
    title: 'Why Custom Software Beats No-Code for Scaling Businesses in 2025',
    slug: 'custom-software-vs-nocode',
    publishDate: 'March 15, 2024',
    thumbnail: '/images/blog/blog-3.png',
    tag: 'Strategy',
    author: 'Luminous Team',
    authorImage: '/images/avatar/avatar-1.png',
    readTime: '5 min',
    description: 'Why custom code remains the superior choice for businesses with scale in mind.',
  },
  {
    title: 'Building for the GCC Market: What Indian Dev Teams Need to Know',
    slug: 'gcc-market-insights',
    publishDate: 'February 20, 2024',
    thumbnail: '/images/blog/blog-4.png',
    tag: 'Business',
    author: 'Luminous Team',
    authorImage: '/images/avatar/avatar-1.png',
    readTime: '7 min',
    description: 'Insights into building software for the unique requirements of the Gulf region.',
  },
  {
    title: 'From MVP to Multi-Tenant: Our SaaS Product Development Playbook',
    slug: 'mvp-to-multitenant-saas',
    publishDate: 'January 12, 2024',
    thumbnail: '/images/blog/blog-5.png',
    tag: 'Product',
    author: 'Luminous Team',
    authorImage: '/images/avatar/avatar-1.png',
    readTime: '10 min',
    description: 'Our internal roadmap for taking products from validation to enterprise scale.',
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
