import type { PortfolioProject } from '@/types';
import { RevealSection } from '@/components/ui/RevealSection';

export function CaseQuote({ project }: { project: PortfolioProject }) {
  if (!project.quote) return null;
  const { text, author, role } = project.quote;
  const initials = author
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

  return (
    <section
      className="relative overflow-hidden section-y"
      style={{ background: 'var(--dark-0)' }}
    >
      <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-3xl text-center">
        <RevealSection>
          <div
            className="flex items-center justify-center gap-1.5"
            aria-hidden
          >
            <span
              className="h-5 w-2 rounded-sm"
              style={{ background: 'var(--aurora-violet)' }}
            />
            <span
              className="h-5 w-2 rounded-sm"
              style={{ background: 'var(--aurora-violet)' }}
            />
          </div>

          <blockquote className="mt-8 text-2xl md:text-3xl font-medium text-blue-100/85 leading-snug">
            {text}
          </blockquote>

          <figcaption className="mt-10 flex items-center justify-center gap-4">
            <div
              className="rounded-full p-[2px]"
              style={{
                background: 'linear-gradient(135deg, var(--aurora-violet), var(--aurora-blue))',
              }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--dark-1)] text-sm font-bold text-white">
                {initials}
              </div>
            </div>
            <div className="text-left">
              <div className="font-bold text-white">{author}</div>
              <div className="text-sm text-blue-100/55">{role}</div>
            </div>
          </figcaption>
        </RevealSection>
      </div>
    </section>
  );
}
