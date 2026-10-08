import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { RevealSection } from '@/components/ui/RevealSection';
import type { Portfolio } from '@/types';

const accents = [
  {
    text: 'text-violet-300',
    ring: 'group-hover/c:ring-1 group-hover/c:ring-inset group-hover/c:ring-violet-400/50',
    glow: 'group-hover/c:shadow-2xl group-hover/c:shadow-violet-500/25',
    bar: 'rgb(124,58,237)',
  },
  {
    text: 'text-cyan-300',
    ring: 'group-hover/c:ring-1 group-hover/c:ring-inset group-hover/c:ring-cyan-400/50',
    glow: 'group-hover/c:shadow-2xl group-hover/c:shadow-cyan-500/25',
    bar: 'rgb(6,182,212)',
  },
  {
    text: 'text-emerald-300',
    ring: 'group-hover/c:ring-1 group-hover/c:ring-inset group-hover/c:ring-emerald-400/50',
    glow: 'group-hover/c:shadow-2xl group-hover/c:shadow-emerald-500/25',
    bar: 'rgb(16,185,129)',
  },
] as const;

export function PublicPortfolioRelated({
  portfolio,
  related,
}: {
  portfolio: Portfolio;
  related: Portfolio[];
}) {
  const items = related.filter((item) => item.id !== portfolio.id && item.isPublished).slice(0, 3);
  if (items.length === 0) return null;

  return (
    <section
      className="relative overflow-hidden section-y"
      style={{ background: 'var(--dark-2)' }}
    >
      <div className="aurora-bg-section absolute inset-0 pointer-events-none" />
      <div className="relative z-10 container mx-auto max-w-6xl px-4 sm:px-6">
        <RevealSection>
          <div className="preheading-code">more work</div>
          <h2 className="font-mono text-3xl font-bold tracking-tight text-white md:text-4xl">
            More Work
          </h2>
          <p className="mt-4 text-base leading-relaxed text-blue-100/65">
            More projects we have shipped.
          </p>
        </RevealSection>
        <RevealSection
          stagger
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {items.map((item, index) => {
            const accent = accents[index % accents.length];
            return (
              <Link
                key={item.id}
                href={`/portfolio/${encodeURIComponent(item.slug)}`}
                scroll={false}
                className="block h-full no-underline group/c"
              >
                <article
                  className={`relative h-full overflow-hidden rounded-2xl border border-white/15 bg-white/[0.03] transform-gpu transition-all duration-300 will-change-transform group-hover/c:-translate-y-1.5 ${accent.ring} ${accent.glow}`}
                >
                  <span
                    className="absolute inset-x-0 top-0 z-10 h-0.5 origin-left scale-x-0 transition-transform duration-300 group-hover/c:scale-x-100"
                    style={{ background: accent.bar }}
                    aria-hidden
                  />
                  {item.imageUrl && (
                    <div className="relative aspect-[16/10] overflow-hidden border-b border-white/15">
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition duration-500 ease-out group-hover/c:brightness-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#080810] via-[#080810]/35 to-transparent transition-opacity duration-500 group-hover/c:opacity-75" />
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-white/[0.06] px-2.5 py-0.5 font-mono text-[11px] text-blue-100/70"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="mt-3 text-lg font-bold leading-snug text-white">{item.title}</h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-blue-100/60">
                      {item.description}
                    </p>
                    <span
                      className={`mt-4 inline-flex items-center gap-1.5 font-mono text-sm opacity-70 transition-opacity group-hover/c:opacity-100 ${accent.text}`}
                    >
                      view case study
                      <ArrowUpRight
                        size={15}
                        aria-hidden
                        className="transition-transform group-hover/c:translate-x-0.5 group-hover/c:-translate-y-0.5"
                      />
                    </span>
                  </div>
                </article>
              </Link>
            );
          })}
        </RevealSection>
      </div>
    </section>
  );
}
