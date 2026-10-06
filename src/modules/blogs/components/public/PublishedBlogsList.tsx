import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { RevealSection } from '@/components/ui/RevealSection';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { BlogSummary, PaginatedBlogs } from '@/types';

const dateFormatter = new Intl.DateTimeFormat('en', { dateStyle: 'medium' });

type PublishedBlogsListProps = {
  blogs: BlogSummary[];
  pagination: PaginatedBlogs['pagination'] | null;
  error?: string;
};

export function PublishedBlogsList({ blogs, pagination, error }: PublishedBlogsListProps) {
  const featured = pagination?.page === 1 ? blogs[0] : undefined;
  const grid = featured ? blogs.slice(1) : blogs;

  return (
    <section
      id="blog-list"
      className="section-y relative overflow-hidden bg-[var(--dark-2)]"
    >
      <div className="aurora-bg-section pointer-events-none absolute inset-0" />
      <div className="relative z-10 container mx-auto max-w-6xl px-4">
        <RevealSection className="mb-12">
          <SectionHeading
            badge="posts.latest"
            title={
              <>
                latest.<span className="function">posts</span>()
              </>
            }
          />
        </RevealSection>

        {featured && (
          <RevealSection>
            <Link
              href={`/blog/${featured.slug}`}
              className="group/feat block no-underline"
            >
              <GlassCard
                accent="violet"
                lift
                className="grid overflow-hidden md:grid-cols-2"
              >
                <div className="relative aspect-[16/10] bg-white/5 md:aspect-auto md:min-h-[320px]">
                  {featured.featureImage && (
                    <Image
                      src={featured.featureImage}
                      alt={featured.title}
                      fill
                      unoptimized
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                  )}
                </div>
                <div className="flex flex-col justify-center p-7 md:p-9">
                  <time
                    dateTime={featured.createdAt}
                    className="text-xs font-mono text-blue-100/50"
                  >
                    {dateFormatter.format(new Date(featured.createdAt))}
                  </time>
                  <h2 className="mt-4 text-xl font-bold leading-snug text-white md:text-2xl">
                    {featured.title}
                  </h2>
                  {featured.excerpt && (
                    <p className="mt-3 text-sm leading-relaxed text-blue-100/65">
                      {featured.excerpt}
                    </p>
                  )}
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-mono text-indigo-300">
                    Read article{' '}
                    <ArrowRight
                      size={14}
                      aria-hidden
                    />
                  </span>
                </div>
              </GlassCard>
            </Link>
          </RevealSection>
        )}

        {grid.length > 0 && (
          <RevealSection
            className={`${featured ? 'mt-10 ' : ''}grid gap-6 sm:grid-cols-2 lg:grid-cols-3`}
          >
            {grid.map((blog) => (
              <Link
                key={blog.id}
                href={`/blog/${blog.slug}`}
                className="group/card rounded-2xl no-underline"
              >
                <GlassCard
                  lift
                  className="flex h-full flex-col overflow-hidden"
                >
                  <div className="relative aspect-[16/10] bg-white/5">
                    {blog.featureImage && (
                      <Image
                        src={blog.featureImage}
                        alt={blog.title}
                        fill
                        unoptimized
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <time
                      dateTime={blog.createdAt}
                      className="text-xs font-mono text-blue-100/50"
                    >
                      {dateFormatter.format(new Date(blog.createdAt))}
                    </time>
                    <h3 className="mt-3 text-base font-bold leading-snug text-white">
                      {blog.title}
                    </h3>
                    {blog.excerpt && (
                      <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-blue-100/60">
                        {blog.excerpt}
                      </p>
                    )}
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-mono text-indigo-300">
                      Read article{' '}
                      <ArrowRight
                        size={14}
                        aria-hidden
                      />
                    </span>
                  </div>
                </GlassCard>
              </Link>
            ))}
          </RevealSection>
        )}

        {(error || blogs.length === 0) && (
          <p className="mt-10 text-center text-sm text-blue-100/60">
            {error || 'No published blogs yet.'}
          </p>
        )}

        {pagination && pagination.totalPages > 1 && (
          <nav
            aria-label="Blog pages"
            className="mt-10 flex items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm"
          >
            {pagination.page > 1 ? (
              <Link
                href={pagination.page === 2 ? '/blog' : `/blog?page=${pagination.page - 1}`}
                className="text-indigo-300 hover:text-white"
              >
                Previous
              </Link>
            ) : (
              <span />
            )}
            <span className="text-blue-100/60">
              Page {pagination.page} of {pagination.totalPages}
            </span>
            {pagination.page < pagination.totalPages ? (
              <Link
                href={`/blog?page=${pagination.page + 1}`}
                className="text-indigo-300 hover:text-white"
              >
                Next
              </Link>
            ) : (
              <span />
            )}
          </nav>
        )}
      </div>
    </section>
  );
}
