import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { RevealSection } from '@/components/ui/RevealSection';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { BlogSummary } from '@/types';

export function PublishedBlogRelated({ blogs }: { blogs: BlogSummary[] }) {
  if (!blogs.length) return null;

  return (
    <section className="section-y relative overflow-hidden bg-[var(--dark-3)]">
      <div className="aurora-bg-section pointer-events-none absolute inset-0" />
      <div className="relative z-10 container mx-auto max-w-6xl px-4">
        <RevealSection>
          <SectionHeading
            badge="posts.related"
            title={
              <>
                keep.<span className="function">reading</span>()
              </>
            }
          />
        </RevealSection>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((related) => (
            <Link
              key={related.id}
              href={`/blog/${related.slug}`}
              className="group/card rounded-2xl no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60"
            >
              <GlassCard
                lift
                className="flex h-full flex-col overflow-hidden"
              >
                {related.featureImage && (
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={related.featureImage}
                      alt={related.title}
                      fill
                      unoptimized
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-base font-bold leading-snug text-white transition-colors group-hover/card:text-indigo-200">
                    {related.title}
                  </h3>
                  {related.excerpt && (
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-blue-100/60">
                      {related.excerpt}
                    </p>
                  )}
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-4 font-mono text-xs text-indigo-300">
                    Read article{' '}
                    <ArrowRight
                      size={13}
                      aria-hidden
                    />
                  </span>
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
