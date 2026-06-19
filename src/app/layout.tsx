import type { Metadata } from "next"
import "@fontsource/plus-jakarta-sans/400.css"
import "@fontsource/plus-jakarta-sans/600.css"
import "@fontsource/plus-jakarta-sans/700.css"
import "@fontsource/jetbrains-mono/400.css"
import "@fontsource/jetbrains-mono/600.css"
import "@fontsource/jetbrains-mono/700.css"
import "./globals.css"

export const metadata: Metadata = {
  title: "fanaticCoders | Digital Agency",
  description:
    "Professional web design, development, and digital marketing. We build digital products with modern technology.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Without JS the IntersectionObserver never runs, so reveal wrappers would
            stay at opacity:0. Force them visible for no-JS users and crawlers. */}
        <noscript>
          <style>{`.reveal,.reveal-stagger>*,.bento-reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  )
}
