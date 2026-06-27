'use client';

import type { LucideIcon } from 'lucide-react';
import { useCountUp } from '@/hooks/useCountUp';
import { DURATION } from '@/lib/motion';

// Splits "2.4M+" -> { numeric: true, target: 2.4, suffix: "M+", decimals: 1 } so
// the numeric part can tick up while the unit/suffix stays put. Values that don't
// start with a number (e.g. "24/7") render as-is with no count-up.
function parse(value: string) {
  const m = value.match(/^([\d.]+)(.*)$/);
  if (!m) return { numeric: false, target: 0, suffix: value, decimals: 0 };
  const decimals = m[1].includes('.') ? m[1].split('.')[1].length : 0;
  return { numeric: true, target: parseFloat(m[1]), suffix: m[2], decimals };
}

type Props = { value: string; label: string; Icon: LucideIcon; active: boolean };

export default function HeroStat({ value, label, Icon, active }: Props) {
  const { numeric, target, suffix, decimals } = parse(value);
  // Count up once the hero intro flips `active`. Shared engine; format stays local
  // because the suffix/unit handling is specific to these stat strings.
  const { ref, value: n } = useCountUp(target, {
    trigger: 'active',
    active,
    decimals,
    duration: DURATION.hero,
  });

  return (
    <div className="hero-trust-item">
      <Icon
        size={20}
        className="hero-trust-icon"
        aria-hidden
      />
      <span
        ref={ref}
        className="hero-trust-num tabular-nums"
      >
        {numeric ? `${n.toFixed(decimals)}${suffix}` : value}
      </span>
      <span className="hero-trust-label">{label}</span>
    </div>
  );
}
