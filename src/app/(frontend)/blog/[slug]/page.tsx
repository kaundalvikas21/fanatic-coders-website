import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BlogNewsletterSection } from '@/components/pages/blog/sections/BlogNewsletterSection';
import {
  PublishedBlogContent,
  PublishedBlogHero,
  PublishedBlogRelated,
  getBlogReadTime,
  getPublishedBlogBySlug,
  getPublishedBlogs,
} from '@/modules/blogs';
import type { Blog, PaginatedBlogs } from '@/types';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const response = await getPublishedBlogBySlug(slug);
  if (!response.success || !response.data) notFound();

  const blog = response.data as Blog;
  const title = blog.blogSeo?.metaTitle?.trim() || `${blog.title} | fanaticCoders Blog`;
  const description =
    blog.blogSeo?.metaDescription?.trim() ||
    blog.excerpt?.trim() ||
    `Read ${blog.title} on the fanaticCoders blog.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: blog.featureImage ? [blog.featureImage] : undefined,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const response = await getPublishedBlogBySlug(slug);
  if (!response.success || !response.data) notFound();

  const blog = response.data as Blog;
  const relatedResponse = await getPublishedBlogs({ page: 1, pageSize: 4 });
  const related = relatedResponse.success
    ? ((relatedResponse.data as PaginatedBlogs | null)?.items ?? [])
        .filter((item) => item.id !== blog.id)
        .slice(0, 3)
    : [];

  return (
    <>
      <PublishedBlogHero
        title={blog.title}
        excerpt={blog.excerpt}
        featureImage={blog.featureImage}
        createdAt={blog.createdAt}
        readTime={getBlogReadTime(blog.content)}
        categories={blog.blogCategories?.map(({ category }) => category) ?? []}
        tags={blog.blogTags?.map(({ tag }) => tag) ?? []}
      />
      <PublishedBlogContent
        content={blog.content}
        title={blog.title}
      />
      <PublishedBlogRelated blogs={related} />
      <BlogNewsletterSection />
    </>
  );
}
