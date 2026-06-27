import type { SimpleIcon } from 'simple-icons';

interface TechLogoProps {
  icon: SimpleIcon;
  size?: number;
  className?: string;
}

// Monochrome: fills with currentColor so logos stay visible on the dark ground
// and inherit the section's accent (brand hex like #000 vanished). Decorative —
// the tech name sits in an adjacent label, so the SVG is aria-hidden.
export default function TechLogo({ icon, size = 28, className }: TechLogoProps) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
    >
      <path d={icon.path} />
    </svg>
  );
}
