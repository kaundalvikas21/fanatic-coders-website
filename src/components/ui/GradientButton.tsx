import { cn } from "@/lib/utils"
import Link from "next/link"
import type { ReactNode } from "react"

interface BaseProps {
  children: ReactNode
  className?: string
  variant?: "primary" | "secondary"
  size?: "sm" | "md" | "lg"
}

interface ButtonProps extends BaseProps {
  href?: undefined
  type?: "button" | "submit" | "reset"
  onClick?: () => void
  disabled?: boolean
}

interface LinkProps extends BaseProps {
  href: string
  target?: string
  rel?: string
}

type GradientButtonProps = ButtonProps | LinkProps

const sizeMap = {
  sm: "!px-5 !py-2 !text-sm",
  md: "",
  lg: "!px-10 !py-4 !text-lg",
}

function Inner({ children, variant }: { children: ReactNode; variant: "primary" | "secondary" }) {
  return (
    <>
      <span className="relative z-10 flex items-center justify-center text-white">
        {variant === "primary" ? (
          <>
            <span className="text-white mr-2">{"{"}</span>
            {children}
            <span className="text-white ml-2">{"}"}</span>
          </>
        ) : (
          <>
            <span className="text-indigo-400 mr-2">./</span>
            {children}
          </>
        )}
      </span>
      <div className="absolute inset-0 bg-gradient-1" />
      <div className="absolute inset-0 bg-gradient-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute inset-0 bg-gradient-3 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100" />
      <div className="absolute inset-0 bg-glow opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </>
  )
}

export default function GradientButton(props: GradientButtonProps) {
  const { children, className, variant = "primary", size = "md" } = props

  const baseClass = cn(
    "gradient-btn group relative px-8 py-3 rounded-lg overflow-hidden inline-flex items-center justify-center",
    variant === "secondary" && "secondary",
    sizeMap[size],
    className
  )

  if (props.href !== undefined) {
    const { href, target, rel } = props as LinkProps
    return (
      <Link href={href} target={target} rel={rel} className={baseClass}>
        <Inner variant={variant}>{children}</Inner>
      </Link>
    )
  }

  const { type = "button", onClick, disabled } = props as ButtonProps
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={baseClass}>
      <Inner variant={variant}>{children}</Inner>
    </button>
  )
}
