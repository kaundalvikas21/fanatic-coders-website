import Image from 'next/image';
import Link from 'next/link';
import { Clock, ArrowRight } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { RevealSection } from '@/components/ui/RevealSection';
import { posts, popularSlugs } from '../data';
import { categoryColor } from '@/lib/categoryColor';

const popular = popularSlugs
  .map((slug) => posts.find((p) => p.slug === slug))
  .filter((p): p is NonNullable<typeof p> => Boolean(p));

export function BlogPopularSection() {
  return (
    <section
      id="blog-popular"
      className="section-y relative overflow-hidden"
      style={{ background: 'var(--dark-3)' }}
    >
      <div className="aurora-bg-section absolute inset-0 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4 max-w-6xl">
        <RevealSection>
          <SectionHeading
            badge="posts.popular"
            title={
              <>
                popular.<span className="function">reads</span>()
              </>
            }
            comment="// what people open most"
          />
        </RevealSection>

        <RevealSection
          stagger
          className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {popular.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="no-underline group/card"
            >
              <GlassCard
                lift
                className="h-full overflow-hidden flex flex-col transition-shadow group-hover/card:ring-1 group-hover/card:ring-indigo-400/30"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.coverUrl!}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover/card:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                  <span
                    className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-mono ring-1 backdrop-blur-sm ${categoryColor(post.category).chip}`}
                  >
                    {post.category}
                  </span>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-[11px] font-mono text-blue-100/55">
                    <span className="flex items-center gap-1">
                      <Clock
                        size={11}
                        aria-hidden
                      />
                      {post.readTime}
                    </span>
                    <span
                      className="h-1 w-1 rounded-full bg-blue-100/30"
                      aria-hidden
                    />
                    <span>{post.date}</span>
                  </div>
                  <h3 className="mt-2.5 text-base font-bold text-white leading-snug transition-colors group-hover/card:text-indigo-200">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm text-blue-100/60 leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                  <span className="mt-auto flex items-center gap-1.5 border-t border-white/5 pt-4 text-sm font-mono text-indigo-300">
                    Read article
                    <ArrowRight
                      size={14}
                      aria-hidden
                      className="transition-transform group-hover/card:translate-x-1"
                    />
                  </span>
                </div>
              </GlassCard>
            </Link>
          ))}
        </RevealSection>
      </div>
    </section>
  );
}
