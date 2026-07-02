import Image from 'next/image';
import {
  ArrowRight,
  ShoppingBag,
  Globe,
  Cloud,
  Smartphone,
  Palette,
  Tag,
  type LucideIcon,
} from 'lucide-react';
import type { PortfolioProject } from '@/types';
import GradientButton from '@/components/ui/GradientButton';
import { RevealSection } from '@/components/ui/RevealSection';
import { CodeBreadcrumb } from '@/components/shared/CodeBreadcrumb';
import { TechTile } from './TechTile';

const TAG_ICONS: Record<string, LucideIcon> = {
  'E-Commerce': ShoppingBag,
  Web: Globe,
  SaaS: Cloud,
  Mobile: Smartphone,
  Branding: Palette,
};

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3.5">
      <dt className="text-[11px] font-mono uppercase tracking-[0.14em] text-blue-100/40">
        {label}
      </dt>
      <dd className="text-sm font-semibold text-white text-right">{value}</dd>
    </div>
  );
}

export function CaseHero({ project }: { project: PortfolioProject }) {
  const hasImage = Boolean(project.imageUrl);
  const hasMeta = Boolean(
    project.client ||
    project.industry ||
    project.year ||
    project.duration ||
    project.services?.length,
  );

  const titleWords = project.title.trim().split(' ');
  const titleLast = titleWords.pop() ?? project.title;
  const titleHead = titleWords.join(' ');

  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden hero-shell [--hero-pt:7.5rem] pb-8">
      {/* Background */}
      {hasImage ? (
        <>
          <Image
            src={project.imageUrl!}
            alt={`${project.title} cover`}
            fill
            priority
            sizes="100vw"
            className="absolute inset-0 -z-20 object-cover"
          />
          <div className="absolute inset-0 -z-10 pointer-events-none bg-gradient-to-t from-[#080810] via-[#080810]/75 to-[#080810]/25" />
          <div className="absolute inset-0 -z-10 pointer-events-none bg-gradient-to-r from-[#080810]/80 via-[#080810]/25 to-transparent" />
          <div className="absolute inset-0 -z-10 pointer-events-none aurora-bg-hero opacity-30" />
        </>
      ) : (
        <div className="absolute inset-0 -z-10 pointer-events-none aurora-bg-hero" />
      )}

      <div className="relative z-10 container mx-auto flex flex-1 flex-col justify-center px-4 sm:px-6 max-w-6xl">
        <RevealSection>
          <CodeBreadcrumb
            items={[
              { label: 'home', href: '/' },
              { label: 'portfolio', href: '/portfolio' },
              { label: project.title },
            ]}
          />
        </RevealSection>

        <div className="mt-8 grid lg:grid-cols-[1.5fr_1fr] gap-8 lg:gap-12 items-start">
          {/* Left: content */}
          <RevealSection>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => {
                const Icon = TAG_ICONS[tag] ?? Tag;
                return (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-mono text-indigo-200 ring-1 ring-indigo-400/30 backdrop-blur-sm"
                  >
                    <Icon
                      size={13}
                      aria-hidden
                      className="shrink-0"
                    />
                    {tag}
                  </span>
                );
              })}
            </div>
            <h1 className="mt-4 text-4xl md:text-6xl font-bold text-white leading-[1.03] tracking-tight">
              {titleHead && <>{titleHead} </>}
              <span className="text-aurora-sweep">{titleLast}</span>
            </h1>
            {project.overview && (
              <p className="mt-5 text-lg text-blue-100/85 leading-relaxed max-w-[52ch]">
                {project.overview}
              </p>
            )}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <GradientButton href="/contact">
                startAProject
                <ArrowRight
                  size={16}
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                  aria-hidden
                />
              </GradientButton>
              <GradientButton
                href="/portfolio"
                variant="secondary"
              >
                allWork
              </GradientButton>
            </div>
          </RevealSection>

          {/* Right: frosted-glass meta card */}
          {hasMeta && (
            <RevealSection>
              <div className="rounded-2xl border border-white/12 bg-white/[0.05] p-6 md:p-7 backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.07)]">
                <div className="border-b border-white/10 pb-4 text-[11px] font-mono uppercase tracking-[0.18em] text-blue-100/40">
                  {'// at a glance'}
                </div>
                <dl className="divide-y divide-white/[0.07] pt-1">
                  {project.client && (
                    <MetaRow
                      label="client"
                      value={project.client}
                    />
                  )}
                  {project.industry && (
                    <MetaRow
                      label="industry"
                      value={project.industry}
                    />
                  )}
                  {project.year && (
                    <MetaRow
                      label="year"
                      value={project.year}
                    />
                  )}
                  {project.duration && (
                    <MetaRow
                      label="duration"
                      value={project.duration}
                    />
                  )}
                </dl>
                {project.services && project.services.length > 0 && (
                  <div className="mt-1 border-t border-white/10 pt-4">
                    <div className="text-[11px] font-mono uppercase tracking-[0.14em] text-blue-100/40">
                      services
                    </div>
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {project.services.map((s) => (
                        <span
                          key={s}
                          className="rounded-md border border-white/10 bg-white/[0.06] px-2.5 py-1 text-xs text-blue-100/85"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </RevealSection>
          )}
        </div>

        {project.tech && project.tech.length > 0 && (
          <RevealSection className="mt-14 md:mt-16">
            <div className="border-t border-white/10 pt-8 text-center">
              <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-blue-100/45">
                built with
              </div>
              <div className="mt-4 flex flex-wrap justify-center gap-2.5">
                {project.tech.map((t) => (
                  <TechTile
                    key={t}
                    name={t}
                  />
                ))}
              </div>
            </div>
          </RevealSection>
        )}
      </div>
    </section>
  );
}
