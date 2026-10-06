import Image from 'next/image';
import { Clock } from 'lucide-react';
import { CodeBreadcrumb } from '@/components/shared/CodeBreadcrumb';
import { RevealSection } from '@/components/ui/RevealSection';

const dateFormatter = new Intl.DateTimeFormat('en', { dateStyle: 'medium' });

type PublishedBlogHeroProps = {
  title: string;
  excerpt: string | null;
  featureImage: string | null;
  createdAt: string;
  readTime: string;
};

export function PublishedBlogHero({
  title,
  excerpt,
  featureImage,
  createdAt,
  readTime,
}: PublishedBlogHeroProps) {
  const trimmedTitle = title.trim();
  const lastSpace = trimmedTitle.lastIndexOf(' ');
  const titleHead = lastSpace === -1 ? '' : trimmedTitle.slice(0, lastSpace);
  const titleLast = lastSpace === -1 ? trimmedTitle : trimmedTitle.slice(lastSpace + 1);

  return (
    <section className="hero-shell relative overflow-hidden pb-20">
      {featureImage ? (
        <>
          <Image
            src={featureImage}
            alt={`${title} cover`}
            fill
            priority
            unoptimized
            sizes="100vw"
            className="absolute inset-0 -z-20 object-cover"
          />
          <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-[var(--dark-1)] via-[color-mix(in_srgb,var(--dark-1)_90%,transparent)] to-[color-mix(in_srgb,var(--dark-1)_60%,transparent)]" />
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[color-mix(in_srgb,var(--dark-1)_45%,transparent)]" />
          <div className="aurora-bg-hero pointer-events-none absolute inset-0 -z-10 opacity-40" />
        </>
      ) : (
        <div className="aurora-bg-hero pointer-events-none absolute inset-0 -z-10" />
      )}
      <div className="container relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6">
        <RevealSection stagger>
          <div className="flex justify-center">
            <CodeBreadcrumb
              items={[
                { label: 'home', href: '/' },
                { label: 'blog', href: '/blog' },
                { label: title },
              ]}
            />
          </div>
          <h1 className="hero-h1 mt-8 text-white">
            {titleHead && <>{titleHead} </>}
            <span className="text-[var(--aurora-violet-light)]">{titleLast}</span>
          </h1>
          {excerpt && (
            <p className="mx-auto mt-5 max-w-[58ch] text-pretty text-lg leading-relaxed text-blue-100/85 md:text-xl">
              {excerpt}
            </p>
          )}
          <div className="mt-8 flex items-center justify-center gap-4 font-mono text-sm tabular-nums text-blue-100/70">
            <time dateTime={createdAt}>{dateFormatter.format(new Date(createdAt))}</time>
            <span
              className="flex items-center gap-1.5"
              aria-label={`Reading time ${readTime}`}
            >
              <Clock
                size={13}
                aria-hidden
              />
              {readTime} read
            </span>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}
