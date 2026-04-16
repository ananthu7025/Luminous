/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import RevealAnimation from '../animation/RevealAnimation';
import BlogCardV1 from '../shared/card/BlogCardV1';
import LinkButton from '../ui/button/LinkButton';
import { crmApi, fetchFromCRM } from '@/config/api';

interface BlogResponse {
  blogs: any[];
}

interface BlogListProps {
  hideButton?: boolean;
}

const BlogListWithAPI = ({ hideButton = false }: BlogListProps) => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchFromCRM<BlogResponse>(crmApi.blog.list());
      if (data && 'blogs' in data) {
        setBlogs(data.blogs);
      } else {
        setError('Failed to load blog posts');
      }
    } catch (err) {
      console.error('Error loading blogs:', err);
      setError('Failed to load blog posts');
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <section
        className="pt-20 pb-28 md:pt-32 md:pb-32 lg:pt-[128px] lg:pb-[128px] xl:pt-[100px] xl:pb-[100px] bg-background-2 dark:bg-background-5"
        aria-label="Blog posts and insights">
        <div className="main-container">
          <div className="text-center space-y-4">
            <h2>Blog Not Available</h2>
            <p className="text-gray-600 dark:text-gray-400">
              We're unable to load blog posts at the moment. Please try again later.
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (loading) {
    return (
      <section
        className="pt-20 pb-28 md:pt-32 md:pb-32 lg:pt-[128px] lg:pb-[128px] xl:pt-[100px] xl:pb-[100px] bg-background-2 dark:bg-background-5"
        aria-label="Blog posts and insights">
        <div className="main-container">
          <div className="text-center mb-[70px]">
            <p className="text-gray-600 dark:text-gray-400">Loading blog posts...</p>
          </div>
        </div>
      </section>
    );
  }

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
          {blogs.map((blog, index) => (
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

export default BlogListWithAPI;
