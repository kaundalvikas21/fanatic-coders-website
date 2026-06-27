import { SectionHeading } from '@/components/ui/SectionHeading';
import { RevealSection } from '@/components/ui/RevealSection';

type Accent = 'violet' | 'cyan' | 'green';

interface Value {
  id: string;
  title: string;
  description: string;
  accent: Accent;
}

// Accent drives only the index colour; sourced from tokens, not raw hex.
const accentVar: Record<Accent, string> = {
  violet: 'var(--aurora-violet-light)',
  cyan: 'var(--aurora-cyan-light)',
  green: 'var(--aurora-green-light)',
};

const values: Value[] = [
  {
    id: 'craft',
    title: 'Craft over shortcuts',
    description:
      'We sweat the details others skip: clean architecture, real tests, and interfaces that feel right.',
    accent: 'violet',
  },
  {
    id: 'speed',
    title: 'Momentum every week',
    description:
      'Tight loops and weekly demos keep work visible and decisions fast. No black boxes.',
    accent: 'cyan',
  },
  {
    id: 'ownership',
    title: 'We own outcomes',
    description:
      "Performance, accessibility, and uptime are ours to defend, not someone else's ticket.",
    accent: 'green',
  },
  {
    id: 'partnership',
    title: 'True partnership',
    description:
      'One senior team, one point of contact, fully embedded in your goals and trade-offs.',
    accent: 'violet',
  },
  {
    id: 'transparency',
    title: 'Open by default',
    description: 'Open roadmaps, honest estimates, and pricing you can predict before we start.',
    accent: 'cyan',
  },
  {
    id: 'people',
    title: 'People first',
    description:
      'Great products come from healthy teams. We hire well, mentor hard, and stay kind.',
    accent: 'green',
  },
];

export function AboutValuesSection() {
  return (
    <section
      id="values"
      className="section-y relative overflow-hidden"
      style={{ background: 'var(--dark-2)' }}
    >
      <div
        className="aurora-bg-section absolute -inset-[14%] pointer-events-none"
        data-parallax="8"
      />

      <div className="relative z-10 container mx-auto px-4">
        <RevealSection>
          <SectionHeading
            badge="values.config"
            title={
              <>
                how.<span className="function">weWork</span>()
              </>
            }
            comment="// the principles behind every engagement"
          />
        </RevealSection>

        {/* A numbered manifest, not a card grid: each principle is a list entry led by a
            mono index, separated by a full-width rule. No glass, no repeated boxes. */}
        <RevealSection
          as="ul"
          stagger
          className="mx-auto mt-14 grid max-w-5xl gap-x-14 gap-y-10 sm:grid-cols-2"
        >
          {values.map((value, i) => (
            <li
              key={value.id}
              className="group relative flex gap-5 pt-6"
            >
              {/* resting rule + accent underline that draws in on hover (terminal motif) */}
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-px bg-white/10"
              />
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 motion-reduce:transition-none"
                style={{ background: accentVar[value.accent] }}
              />
              <span
                aria-hidden
                className="mt-0.5 shrink-0 font-mono text-2xl font-bold leading-none tabular-nums transition-[text-shadow] duration-300 group-hover:[text-shadow:0_0_18px_currentColor] motion-reduce:transition-none md:text-3xl"
                style={{ color: accentVar[value.accent] }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="text-lg font-bold text-[var(--color-text-base)]">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
                  {value.description}
                </p>
              </div>
            </li>
          ))}
        </RevealSection>
      </div>
    </section>
  );
}
