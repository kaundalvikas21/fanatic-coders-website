import { SectionHeading } from '@/components/ui/SectionHeading';
import { RevealSection } from '@/components/ui/RevealSection';
import { GlassCard } from '@/components/ui/GlassCard';
import { cn } from '@/lib/utils';
import { serviceProcess } from '../data';

export function ServiceProcess() {
  const total = String(serviceProcess.length).padStart(2, '0');
  return (
    <section
      className="relative overflow-hidden section-y cv-auto"
      style={{ background: 'var(--dark-1)' }}
    >
      <div className="aurora-bg-section absolute inset-0 pointer-events-none" />
      <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-6xl">
        <RevealSection>
          <SectionHeading
            badge="process.flow"
            title={
              <>
                how.we.<span className="function">build</span>
                <span className="params">()</span>
              </>
            }
            comment="// seven phases, from first call to long-term support"
          />
        </RevealSection>

        <RevealSection
          as="ol"
          stagger
          className="mt-14 grid list-none sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {serviceProcess.map((step) => {
            const ongoing = step.duration === 'ongoing';
            return (
              <li
                key={step.n}
                className="h-full"
              >
                <GlassCard
                  lift
                  className={cn(
                    'process-card group flex h-full flex-col p-7',
                    ongoing && 'process-card-ongoing',
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-mono tabular-nums leading-none">
                      <span className="process-num text-4xl font-bold">{step.n}</span>
                      <span className="ml-1 text-base font-bold text-blue-100/25">/{total}</span>
                    </span>
                    <span
                      className={cn(
                        'shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-mono',
                        ongoing
                          ? 'border-violet-400/30 bg-violet-500/7 text-violet-200/85'
                          : 'border-white/10 bg-white/3 text-blue-100/65',
                      )}
                    >
                      {step.duration}
                    </span>
                  </div>
                  <div className="mt-5 h-px w-full bg-white/7" />
                  <h3 className="mt-4 text-base font-bold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm text-blue-100/60 leading-relaxed">{step.desc}</p>
                </GlassCard>
              </li>
            );
          })}
        </RevealSection>
      </div>
    </section>
  );
}
