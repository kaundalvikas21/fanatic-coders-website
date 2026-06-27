import { ArrowRight } from 'lucide-react';
import GradientButton from '@/components/ui/GradientButton';
import { RevealSection } from '@/components/ui/RevealSection';

interface ComingSoonProps {
  /** Mono code eyebrow, e.g. `privacy.policy`. */
  eyebrow: string;
  heading: string;
  /** Closing phrase of the heading swept in the aurora gradient (optional). */
  headingSweep?: string;
  note: string;
}

/**
 * Placeholder page for routes that are linked but not built yet (legal pages,
 * careers). Mirrors the site hero shell so it reads on-brand, not like a 404,
 * and points people at /contact in the meantime.
 */
export function ComingSoon({ eyebrow, heading, headingSweep, note }: ComingSoonProps) {
  return (
    <section className="hero-shell relative flex min-h-[80svh] flex-col overflow-hidden pb-16">
      <div className="aurora-bg-hero absolute inset-0 pointer-events-none" />
      <div
        className="dot-grid absolute inset-0 pointer-events-none opacity-30"
        style={{ maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent 70%)' }}
      />

      <div className="relative z-10 container mx-auto px-4 flex flex-1 flex-col justify-center">
        <RevealSection className="max-w-2xl mx-auto text-center">
          <div className="preheading-code">{eyebrow}</div>
          <h1 className="hero-h1 mt-3">
            {heading}
            {headingSweep ? (
              <>
                {' '}
                <span className="text-aurora-sweep">{headingSweep}</span>
              </>
            ) : null}
          </h1>
          <p className="mt-6 text-base sm:text-lg text-blue-100/70 max-w-xl mx-auto leading-relaxed">
            {note}
          </p>
          <div className="mt-8 flex justify-center">
            <GradientButton href="/contact">
              getInTouch
              <ArrowRight
                size={16}
                className="ml-2"
                aria-hidden
              />
            </GradientButton>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}
