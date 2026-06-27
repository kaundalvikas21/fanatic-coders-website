import { Compass, Layers, Hammer, LineChart } from 'lucide-react';
import type { ElementType } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { RevealSection } from '@/components/ui/RevealSection';

interface Step {
  n: string;
  title: string;
  description: string;
  Icon: ElementType;
}

const steps: Step[] = [
  {
    n: '01',
    title: 'Scope',
    description:
      'We frame the problem and the outcome, then agree what success actually looks like.',
    Icon: Compass,
  },
  {
    n: '02',
    title: 'Prototype',
    description: 'Fast, testable prototypes de-risk the big decisions before full build begins.',
    Icon: Layers,
  },
  {
    n: '03',
    title: 'Build',
    description: 'Production engineering in weekly increments, demoed, tested, and shipped.',
    Icon: Hammer,
  },
  {
    n: '04',
    title: 'Measure',
    description: 'We track the metrics that matter and iterate until the numbers move.',
    Icon: LineChart,
  },
];

export function PortfolioProcessSection() {
  return (
    <section
      id="portfolio-process"
      className="section-y relative overflow-hidden"
      style={{ background: 'var(--dark-3)' }}
    >
      <div className="aurora-bg-section absolute inset-0 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4">
        <RevealSection>
          <SectionHeading
            badge="delivery.flow"
            title={
              <>
                how.<span className="function">weDeliver</span>()
              </>
            }
            comment="// the path behind every result above"
          />
        </RevealSection>

        <RevealSection
          stagger
          className="mt-16 grid gap-y-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-y-0 max-w-6xl mx-auto"
        >
          {steps.map((step) => (
            <div
              key={step.n}
              className="process-step group px-4"
            >
              <step.Icon
                size={20}
                className="text-indigo-300 transition-colors group-hover:text-indigo-200"
                aria-hidden
              />
              <span className="process-num mt-3 text-5xl font-bold font-mono tabular-nums">
                {step.n}
              </span>
              <div className="process-rail-row">
                <span
                  className="process-dot"
                  aria-hidden
                />
              </div>
              <h3 className="text-base font-bold text-white">{step.title}</h3>
              <p className="mt-2 text-sm text-blue-100/60 leading-relaxed max-w-[26ch]">
                {step.description}
              </p>
            </div>
          ))}
        </RevealSection>
      </div>
    </section>
  );
}
