import type { Blog } from '@/types';
import type { BlogFormValues } from '@/modules/blogs/schemas/blog';

export function getBlogFormValues(blog?: Blog): BlogFormValues {
  return {
    title: blog?.title ?? '',
    slug: blog?.slug ?? '',
    content: blog?.content ?? { type: 'doc', content: [{ type: 'paragraph' }] },
    excerpt: blog?.excerpt ?? '',
    isPublished: blog?.isPublished ?? false,
  };
}
