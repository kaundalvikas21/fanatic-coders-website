import Image from 'next/image';
import Link from 'next/link';
import { Clock, Calendar, ArrowRight, Hash, FileText } from 'lucide-react';
import GradientButton from '@/components/ui/GradientButton';
import { RevealSection } from '@/components/ui/RevealSection';
import { posts } from '@/components/pages/blog/data';

// First three real posts (single source of truth with /blog) — slugs link correctly.
const featured = posts.slice(0, 3);

export default function BlogSection() {
  return (
    <section
      className="section-y relative overflow-hidden"
      style={{ background: 'var(--dark-1)' }}
    >
      {/* Code-grid background */}
      <div className="absolute inset-0 -z-10">
        <div className="code-grid absolute inset-0" />
      </div>

      <RevealSection
        stagger
        className="container mx-auto px-4"
      >
        {/* Header */}
        <div className="text-center mb-16">
          <div className="preheading-code">blog.module.ts</div>
          <h2 className="heading-code">
            tech.<span className="function">insights</span>()
          </h2>
          <p className="subheading-code">{'// notes from the team on what we build and why'}</p>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {featured.map((post) => (
            <article
              key={post.id}
              className="blog-card group rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-[1.02]"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f1a] to-transparent opacity-50 z-10" />
                <Image
                  src={post.coverUrl ?? ''}
                  alt={`Cover image for ${post.title}`}
                  fill
                  className="object-cover transition-[filter] duration-500 group-hover:brightness-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading="lazy"
                />
                {/* Category badge */}
                <div className="absolute top-4 left-4 z-20">
                  <span className="px-3 py-1 rounded-full text-sm font-mono bg-[rgba(124,58,237,0.2)] text-[var(--aurora-violet-light)] border border-[rgba(124,58,237,0.3)] backdrop-blur-sm">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Meta */}
                <div className="flex items-center gap-4 text-sm text-blue-100/60">
                  <span className="flex items-center gap-1">
                    <Clock
                      size={14}
                      className="text-[var(--aurora-violet-light)]"
                      aria-hidden
                    />
                    {post.readTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar
                      size={14}
                      className="text-[var(--aurora-violet-light)]"
                      aria-hidden
                    />
                    {post.date}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg md:text-xl font-bold leading-tight">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="block no-underline text-white hover:text-[var(--aurora-violet-light)] transition-colors"
                  >
                    {post.title}
                  </Link>
                </h3>

                {/* Excerpt */}
                <p className="text-blue-100/70 line-clamp-2 text-sm">{post.excerpt}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {(post.tags ?? []).map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 text-xs py-1 px-2 rounded-full bg-[rgba(124,58,237,0.1)] border border-[rgba(124,58,237,0.22)] text-[var(--aurora-violet-light)] font-mono"
                    >
                      <Hash
                        size={10}
                        aria-hidden
                      />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Read more */}
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-[var(--aurora-violet-light)] transition-[filter] hover:brightness-125 text-sm no-underline group/link"
                >
                  <span>Read More</span>
                  <ArrowRight
                    size={14}
                    className="group-hover/link:translate-x-1 transition-transform"
                    aria-hidden
                  />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* View All */}
        <div className="text-center">
          <GradientButton href="/blog">
            viewAllPosts
            <FileText
              size={16}
              className="ml-2 group-hover:translate-x-1 transition-transform"
              aria-hidden
            />
          </GradientButton>
        </div>
      </RevealSection>
    </section>
  );
}
