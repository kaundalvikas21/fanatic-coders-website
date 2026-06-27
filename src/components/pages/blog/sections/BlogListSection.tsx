'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { RevealSection } from '@/components/ui/RevealSection';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { posts } from '../data';
import { useBlogFilter } from '../BlogFilterContext';
import { categoryColor } from '@/lib/categoryColor';

export function BlogListSection() {
  const { query, category, tag } = useBlogFilter();
  const q = query.trim().toLowerCase();
  const isFiltering = category !== 'All' || q !== '' || tag !== '';

  const featured = posts[0];
  const grid = useMemo(() => {
    const pool = isFiltering ? posts : posts.slice(1);
    return pool.filter((p) => {
      const matchesCat = category === 'All' || p.category === category;
      const matchesQ = q === '' || `${p.title} ${p.excerpt}`.toLowerCase().includes(q);
      const matchesTag = tag === '' || Boolean(p.tags?.includes(tag));
      return matchesCat && matchesQ && matchesTag;
    });
  }, [category, q, tag, isFiltering]);

  return (
    <section
      id="blog-list"
      className="section-y relative overflow-hidden"
      style={{ background: 'var(--dark-2)' }}
    >
      <div className="aurora-bg-section absolute inset-0 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4 max-w-6xl">
        <RevealSection className="mb-12">
          <SectionHeading
            badge="posts.latest"
            title={
              <>
                latest.<span className="function">posts</span>()
              </>
            }
            comment="// fresh thinking from the team"
          />
        </RevealSection>

        {/* Featured lead (only when not filtering) */}
        {!isFiltering && (
          <RevealSection>
            <Link
              href={`/blog/${featured.slug}`}
              className="no-underline group/feat block"
            >
              <GlassCard
                accent="violet"
                lift
                className="grid md:grid-cols-2 overflow-hidden"
              >
                <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[320px]">
                  <Image
                    src={featured.coverUrl!}
                    alt={featured.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
                <div className="p-7 md:p-9 flex flex-col justify-center">
                  <CategoryTag category={featured.category} />
                  <h2 className="mt-4 text-xl md:text-2xl font-bold text-white leading-snug">
                    {featured.title}
                  </h2>
                  <p className="mt-3 text-sm text-blue-100/65 leading-relaxed">
                    {featured.excerpt}
                  </p>
                  <div className="mt-5 flex items-center gap-4 text-xs font-mono text-blue-100/50">
                    <span>{featured.date}</span>
                    <span className="flex items-center gap-1.5">
                      <Clock
                        size={12}
                        aria-hidden
                      />
                      {featured.readTime}
                    </span>
                  </div>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-mono text-indigo-300">
                    readPost{' '}
                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover/feat:translate-x-1"
                      aria-hidden
                    />
                  </span>
                </div>
              </GlassCard>
            </Link>
          </RevealSection>
        )}

        {/* Post grid */}
        <RevealSection
          className={`${isFiltering ? '' : 'mt-10'} grid sm:grid-cols-2 lg:grid-cols-3 gap-6`}
        >
          {grid.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="no-underline group/card"
            >
              <GlassCard
                lift
                className="h-full overflow-hidden flex flex-col"
              >
                <div className="relative aspect-[16/10]">
                  <Image
                    src={post.coverUrl!}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <CategoryTag category={post.category} />
                  <h3 className="mt-3 text-base font-bold text-white leading-snug">{post.title}</h3>
                  <p className="mt-2 text-sm text-blue-100/60 leading-relaxed flex-1">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 flex items-center gap-3 text-xs font-mono text-blue-100/50">
                    <span>{post.date}</span>
                    <span className="flex items-center gap-1.5">
                      <Clock
                        size={12}
                        aria-hidden
                      />
                      {post.readTime}
                    </span>
                  </div>
                </div>
              </GlassCard>
            </Link>
          ))}
        </RevealSection>

        {grid.length === 0 && (
          <p className="mt-10 text-center text-sm font-mono text-blue-100/50">
            {'// no posts match your search yet'}
          </p>
        )}
      </div>
    </section>
  );
}

function CategoryTag({ category }: { category: string }) {
  return (
    <span
      className={`inline-flex w-fit items-center rounded-full px-2.5 py-0.5 text-[11px] font-mono ring-1 ${categoryColor(category).chip}`}
    >
      {category}
    </span>
  );
}
