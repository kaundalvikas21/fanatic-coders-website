import Image from 'next/image';
import { ArrowRight, ClipboardCheck, CalendarCheck, KeyRound, LifeBuoy } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import GradientButton from '@/components/ui/GradientButton';
import { RevealSection } from '@/components/ui/RevealSection';

const commitments: { Icon: LucideIcon; label: string; sub: string }[] = [
  { Icon: ClipboardCheck, label: 'Honest scoping', sub: 'We tell you what it really takes.' },
  { Icon: CalendarCheck, label: 'Weekly demos', sub: 'Click working software every week.' },
  { Icon: KeyRound, label: 'You own everything', sub: 'Code, assets, access. No lock-in.' },
  { Icon: LifeBuoy, label: 'We stay on', sub: 'Support through launch and the weeks after.' },
];

export function ServicesHeroSection() {
  return (
    <section
      id="services-hero"
      className="relative overflow-hidden hero-shell [--hero-pt:7.5rem] pb-8 min-h-[100svh] flex flex-col"
      style={{ background: 'var(--dark-1)' }}
    >
      <Image
        src="/services_heo_bg.png"
        alt=""
        fill
        priority
        aria-hidden
        sizes="100vw"
        className="object-cover hero-bg-img"
      />
      <div
        className="hero-bg-scrim absolute inset-0 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="hero-bg-sweep"
        aria-hidden="true"
      />

      <div className="relative z-10 container mx-auto px-4 flex w-full flex-1 flex-col justify-center">
        <RevealSection className="max-w-3xl mx-auto text-center">
          <div className="preheading-code">services</div>
          <h1 className="hero-h1 mt-3">
            We design and build software that <span className="text-aurora-sweep">ships</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-blue-100/70 max-w-2xl mx-auto leading-relaxed">
            Web, mobile, commerce, and cloud work from one team. We scope it honestly, build in
            short cycles, and stay on after launch.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
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
              seeOurWork
            </GradientButton>
          </div>
        </RevealSection>

        <RevealSection
          stagger
          className="mt-16 grid w-full max-w-4xl mx-auto grid-cols-2 lg:grid-cols-4 gap-3"
        >
          {commitments.map(({ Icon, label, sub }) => (
            <div
              key={label}
              className="flex flex-col items-start gap-3 rounded-2xl border border-white/8 bg-white/2 p-4 sm:p-5"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/8 bg-white/3 text-aurora-violet-light">
                <Icon
                  size={18}
                  aria-hidden
                />
              </span>
              <div>
                <div className="text-sm font-bold text-white">{label}</div>
                <p className="mt-1 text-xs text-blue-100/60 leading-relaxed">{sub}</p>
              </div>
            </div>
          ))}
        </RevealSection>
      </div>
    </section>
  );
}
