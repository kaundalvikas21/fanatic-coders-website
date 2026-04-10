import type { SimpleIcon } from "simple-icons"

interface TechLogoProps {
  icon: SimpleIcon
  size?: number
  className?: string
}

export default function TechLogo({ icon, size = 28, className }: TechLogoProps) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={`#${icon.hex}`}
      className={className}
    >
      <path d={icon.path} />
    </svg>
  )
}
