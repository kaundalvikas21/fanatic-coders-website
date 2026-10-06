import Image from 'next/image';
import { BookOpen, Code2, Compass, Rss, type LucideIcon } from 'lucide-react';
import { RevealSection } from '@/components/ui/RevealSection';

const valueProps: { Icon: LucideIcon; label: string; sub: string }[] = [
  { Icon: Code2, label: 'By the people who ship', sub: 'Notes from our working team.' },
  { Icon: BookOpen, label: 'Production lessons', sub: 'Decisions from real projects.' },
  { Icon: Compass, label: 'Work in detail', sub: 'How we approach design and development.' },
  { Icon: Rss, label: 'New articles', sub: 'Published as the team writes them.' },
];

export function PublishedBlogsHero() {
  return (
    <section
      id="blog-hero"
      className="hero-shell relative flex min-h-[100svh] flex-col overflow-hidden pb-8 [--hero-pt:7.5rem]"
      style={{ background: 'var(--dark-1)' }}
    >
      <Image
        src="/blog_hero_bg.png"
        alt=""
        fill
        priority
        aria-hidden
        sizes="100vw"
        className="hero-bg-img object-cover"
      />
      <div
        className="hero-bg-scrim pointer-events-none absolute inset-0"
        aria-hidden="true"
      />
      <div
        className="hero-bg-sweep"
        aria-hidden="true"
      />

      <div className="container relative z-10 mx-auto flex w-full flex-1 flex-col justify-center px-4">
        <RevealSection className="mx-auto max-w-3xl text-center">
          <div className="preheading-code">blog.module</div>
          <h1 className="hero-h1 mt-3">
            Notes from the people who <span className="text-aurora-sweep">ship</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-blue-100/70 sm:text-lg">
            Practical writing from the team on architecture decisions, design craft, and the work
            behind real products.
          </p>
        </RevealSection>

        <RevealSection
          stagger
          className="mx-auto mt-10 grid w-full max-w-4xl grid-cols-2 gap-3 lg:grid-cols-4"
        >
          {valueProps.map(({ Icon, label, sub }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-2.5 rounded-2xl border border-white/8 bg-white/2 p-4 text-center"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/8 bg-white/3 text-aurora-violet-light">
                <Icon
                  size={18}
                  aria-hidden
                />
              </span>
              <div>
                <div className="text-sm font-bold text-white">{label}</div>
                <p className="mt-1 text-xs leading-relaxed text-blue-100/60">{sub}</p>
              </div>
            </div>
          ))}
        </RevealSection>
      </div>
    </section>
  );
}
