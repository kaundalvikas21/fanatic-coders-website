import Image from 'next/image';
import Link from 'next/link';
import { Clock, Code2, Palette, TrendingUp, Building2, Tag, type LucideIcon } from 'lucide-react';
import type { BlogPost } from '@/types';
import { RevealSection } from '@/components/ui/RevealSection';
import { CodeBreadcrumb } from '@/components/shared/CodeBreadcrumb';
import { categoryColor } from '@/lib/categoryColor';

const CATEGORY_ICON: Record<string, LucideIcon> = {
  Engineering: Code2,
  Design: Palette,
  Growth: TrendingUp,
  Company: Building2,
};

export function PostHero({ post }: { post: BlogPost }) {
  const CatIcon = CATEGORY_ICON[post.category] ?? Tag;
  const hasImage = Boolean(post.coverUrl);
  const parsedDate = new Date(post.date);
  const isoDate = Number.isNaN(parsedDate.getTime())
    ? undefined
    : `${parsedDate.getFullYear()}-${String(parsedDate.getMonth() + 1).padStart(2, '0')}-${String(parsedDate.getDate()).padStart(2, '0')}`;
  const trimmedTitle = post.title.trim();
  const lastSpace = trimmedTitle.lastIndexOf(' ');
  const titleHead = lastSpace === -1 ? '' : trimmedTitle.slice(0, lastSpace);
  const titleLast = lastSpace === -1 ? trimmedTitle : trimmedTitle.slice(lastSpace + 1);

  return (
    <section className="relative overflow-hidden hero-shell pb-20">
      {/* Background */}
      {hasImage ? (
        <>
          <Image
            src={post.coverUrl!}
            alt={`${post.title} cover`}
            fill
            priority
            sizes="100vw"
            className="absolute inset-0 -z-20 object-cover"
          />
          <div className="absolute inset-0 -z-10 pointer-events-none bg-gradient-to-t from-[var(--dark-1)] via-[color-mix(in_srgb,var(--dark-1)_90%,transparent)] to-[color-mix(in_srgb,var(--dark-1)_60%,transparent)]" />
          <div className="absolute inset-0 -z-10 pointer-events-none bg-[color-mix(in_srgb,var(--dark-1)_45%,transparent)]" />
          <div className="absolute inset-0 -z-10 pointer-events-none aurora-bg-hero opacity-40" />
        </>
      ) : (
        <div className="absolute inset-0 -z-10 pointer-events-none aurora-bg-hero" />
      )}

      <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-4xl text-center">
        <RevealSection stagger>
          <div className="flex justify-center">
            <CodeBreadcrumb
              items={[
                { label: 'home', href: '/' },
                { label: 'blog', href: '/blog' },
                { label: post.category },
              ]}
            />
          </div>
          <div className="mt-8 flex justify-center">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-mono uppercase tracking-[0.12em] ring-1 backdrop-blur-sm ${categoryColor(post.category).chip}`}
            >
              <CatIcon
                size={12}
                aria-hidden
              />
              {post.category}
            </span>
          </div>
          <h1 className="hero-h1 mt-5 text-white">
            {titleHead && <>{titleHead} </>}
            <span className="text-[var(--aurora-violet-light)]">{titleLast}</span>
          </h1>
          <p className="mt-5 text-lg md:text-xl text-blue-100/85 text-pretty leading-relaxed max-w-[58ch] mx-auto">
            {post.excerpt}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {post.author && (
              <div className="flex items-center gap-3">
                {post.authorAvatar && (
                  <span className="team-card-glow relative h-10 w-10 overflow-hidden rounded-full ring-1 ring-white/20">
                    <Image
                      src={post.authorAvatar}
                      alt={post.author}
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </span>
                )}
                <span className="text-left text-sm">
                  <span className="block font-semibold text-white leading-tight">
                    <span className="sr-only">Written by </span>
                    {post.author}
                  </span>
                  {post.authorRole && (
                    <span className="mt-0.5 block text-xs text-blue-100/65">{post.authorRole}</span>
                  )}
                </span>
              </div>
            )}
            <span
              className="hidden sm:block h-8 w-px bg-white/15"
              aria-hidden
            />
            <div className="flex items-center gap-4 text-sm font-mono tabular-nums text-blue-100/70">
              <time dateTime={isoDate}>
                <span className="sr-only">Published </span>
                {post.date}
              </time>
              <span
                className="flex items-center gap-1.5"
                aria-label={`Reading time ${post.readTime}`}
              >
                <Clock
                  size={13}
                  aria-hidden
                />
                {post.readTime} read
              </span>
            </div>
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog?tag=${encodeURIComponent(tag)}`}
                  aria-label={`View posts tagged ${tag}`}
                  className="inline-flex items-center min-h-[44px] rounded-full bg-white/10 px-3 py-2 text-xs font-mono tracking-[0.04em] text-blue-100/85 ring-1 ring-white/15 backdrop-blur-sm transition-colors hover:bg-indigo-500/20 hover:text-white hover:ring-indigo-400/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60 focus-visible:text-white"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}
        </RevealSection>
      </div>
    </section>
  );
}
