import { Package, Repeat, Users } from 'lucide-react';
import type { CSSProperties, ElementType } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { RevealSection } from '@/components/ui/RevealSection';
import GradientButton from '@/components/ui/GradientButton';

type Accent = 'violet' | 'cyan' | 'green';

const iconColor: Record<Accent, string> = { violet: '#a855f7', cyan: '#22d3ee', green: '#34d399' };

const accentMap: Record<Accent, { border: string; icon: string; glow: string; tag: string }> = {
  violet: {
    border: 'rgba(124,58,237,0.22)',
    icon: 'rgba(124,58,237,0.10)',
    glow: '0 0 0 1px rgba(124,58,237,0.45), 0 10px 34px rgba(124,58,237,0.18), inset 0 1px 0 rgba(255,255,255,0.05)',
    tag: 'rgba(124,58,237,0.08)',
  },
  cyan: {
    border: 'rgba(6,182,212,0.22)',
    icon: 'rgba(6,182,212,0.10)',
    glow: '0 0 0 1px rgba(6,182,212,0.45), 0 10px 34px rgba(6,182,212,0.18), inset 0 1px 0 rgba(255,255,255,0.05)',
    tag: 'rgba(6,182,212,0.08)',
  },
  green: {
    border: 'rgba(16,185,129,0.22)',
    icon: 'rgba(16,185,129,0.10)',
    glow: '0 0 0 1px rgba(16,185,129,0.45), 0 10px 34px rgba(16,185,129,0.18), inset 0 1px 0 rgba(255,255,255,0.05)',
    tag: 'rgba(16,185,129,0.08)',
  },
};

function accentVars(accent: Accent): CSSProperties {
  const a = accentMap[accent];
  // `.bento-card` carries global nth-child grid placement (for the home 4-col
  // `.services-bento`); reset it so this section keeps its own 3-col grid.
  return {
    '--accent-border': a.border,
    '--accent-icon': a.icon,
    '--accent-glow': a.glow,
    '--accent-tag': a.tag,
    background: '#00000063',
    gridColumn: 'auto',
    gridRow: 'auto',
  } as CSSProperties;
}

interface Model {
  id: string;
  label: string;
  title: string;
  desc: string;
  whoItSuits: string;
  included: string[];
  Icon: ElementType;
  accent: Accent;
  primary?: boolean;
}

const models: Model[] = [
  {
    id: 'project',
    label: 'project',
    title: 'Project',
    desc: 'Fixed scope, clear deadline.',
    whoItSuits: 'A launch with defined requirements.',
    included: ['Scoped statement of work', 'Fixed timeline', 'Dedicated team', 'Weekly demos'],
    Icon: Package,
    accent: 'violet',
  },
  {
    id: 'retainer',
    label: 'retainer',
    title: 'Retainer',
    desc: 'Ongoing monthly capacity.',
    whoItSuits: 'Continuous product work.',
    included: [
      'Reserved hours each month',
      'Priority queue',
      'Monthly planning',
      'One point of contact',
    ],
    Icon: Repeat,
    accent: 'cyan',
    primary: true,
  },
  {
    id: 'augment',
    label: 'team augmentation',
    title: 'Team Augmentation',
    desc: 'Our engineers in your team.',
    whoItSuits: 'Scaling an existing team.',
    included: [
      'Senior developers',
      'Your tools and process',
      'Flexible ramp up',
      'Knowledge transfer',
    ],
    Icon: Users,
    accent: 'green',
  },
];

export function ServicesEngagementSection() {
  return (
    <section
      id="engagement"
      className="section-y relative overflow-hidden"
      style={{ background: 'var(--dark-3)' }}
    >
      <div className="aurora-bg-section absolute inset-0 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4">
        <RevealSection>
          <SectionHeading
            badge="engagement.models"
            title={
              <>
                how.to.<span className="function">work</span>().withUs()
              </>
            }
            comment="// three ways to bring us in"
          />
        </RevealSection>

        <RevealSection
          stagger
          className="mt-14 grid md:grid-cols-3 gap-5 max-w-6xl mx-auto"
        >
          {models.map((model) => {
            const color = iconColor[model.accent];
            return (
              <div
                key={model.id}
                className="bento-card rounded-2xl p-7"
                style={accentVars(model.accent)}
              >
                <div className="relative z-[1] flex flex-col h-full">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono uppercase tracking-[0.15em] text-blue-100/45">{`// ${model.label}`}</span>
                    <model.Icon
                      size={28}
                      style={{ color }}
                      aria-hidden
                    />
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-white">{model.title}</h3>
                  <p className="mt-1.5 text-sm text-blue-100/60">{model.desc}</p>

                  <div className="mt-6">
                    <div className="text-[11px] font-mono text-blue-100/45">who it suits</div>
                    <div className="mt-1.5 text-sm text-white/85">{model.whoItSuits}</div>
                  </div>

                  <div className="mt-6 flex-1">
                    <div className="text-[11px] font-mono text-blue-100/45">what is included</div>
                    <ul className="mt-2.5 space-y-2">
                      {model.included.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-2 text-sm text-blue-100/70"
                        >
                          <span
                            className="h-1.5 w-1.5 rounded-full flex-shrink-0"
                            style={{ background: color }}
                            aria-hidden
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <GradientButton
                    href="/contact#contact-form"
                    variant={model.primary ? 'primary' : 'secondary'}
                    size="sm"
                    className="w-full mt-6"
                  >
                    talk to us
                  </GradientButton>
                </div>
              </div>
            );
          })}
        </RevealSection>
      </div>
    </section>
  );
}
