import type { BlogPost } from '@/types';
import { PostHero } from './post-sections/PostHero';
import { PostBody } from './post-sections/PostBody';
import { PostAuthor } from './post-sections/PostAuthor';
import { PostRelated } from './post-sections/PostRelated';
import { BlogNewsletterSection } from './sections/BlogNewsletterSection';

export function BlogPostPage({ post }: { post: BlogPost }) {
  return (
    <>
      <PostHero post={post} />
      <PostBody post={post} />
      <PostAuthor post={post} />
      <PostRelated post={post} />
      <BlogNewsletterSection />
    </>
  );
}
