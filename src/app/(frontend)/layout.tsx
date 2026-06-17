import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { BackToTop } from "@/components/ui/BackToTop"
import { ReadingProgress } from "@/components/ui/ReadingProgress"

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <ReadingProgress />
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
      <BackToTop />
    </>
  )
}
