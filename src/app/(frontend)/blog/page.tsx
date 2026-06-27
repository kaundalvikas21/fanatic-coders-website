import type { Metadata } from 'next';
import { BlogPage } from '@/components/pages/blog/BlogPage';

export const metadata: Metadata = {
  title: 'Blog | fanaticCoders',
  description:
    'Field notes from the fanaticCoders team: architecture decisions, design craft, and lessons from shipping real software.',
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string | string[] }>;
}) {
  const { tag } = await searchParams;
  const initialTag = Array.isArray(tag) ? tag[0] : tag;
  return <BlogPage initialTag={initialTag} />;
}
