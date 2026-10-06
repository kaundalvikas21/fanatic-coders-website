import type { Metadata } from 'next';
import { BlogNewsletterSection } from '@/components/pages/blog/sections/BlogNewsletterSection';
import { PublishedBlogsHero, PublishedBlogsList, getPublishedBlogs } from '@/modules/blogs';
import type { PaginatedBlogs } from '@/types';

export const metadata: Metadata = {
  title: 'Blog | fanaticCoders',
  description:
    'Field notes from the fanaticCoders team: architecture decisions, design craft, and lessons from shipping real software.',
};

export const dynamic = 'force-dynamic';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string | string[] }>;
}) {
  const { page: pageParam } = await searchParams;
  const rawPage = Number(Array.isArray(pageParam) ? pageParam[0] : pageParam);
  const page = Number.isInteger(rawPage) && rawPage > 0 ? rawPage : 1;
  const response = await getPublishedBlogs({ page, pageSize: 10 });
  const data = response.success ? (response.data as PaginatedBlogs | null) : null;

  return (
    <>
      <PublishedBlogsHero />
      <PublishedBlogsList
        blogs={data?.items ?? []}
        pagination={data?.pagination ?? null}
        error={response.success ? undefined : 'Could not load blogs right now.'}
      />
      <BlogNewsletterSection />
    </>
  );
}
