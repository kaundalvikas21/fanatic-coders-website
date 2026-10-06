import { SiteNotFound } from '@/components/shared/SiteNotFound';

export default function BlogNotFound() {
  return (
    <SiteNotFound
      code="404 / blog"
      title="Blog not found"
      description="This article is unavailable or its address has changed."
      backHref="/blog"
      backLabel="Back to blog"
    />
  );
}
