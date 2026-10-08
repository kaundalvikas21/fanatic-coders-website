import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { BackToTop } from '@/components/ui/BackToTop';
import { ReadingProgress } from '@/components/ui/ReadingProgress';
import { MotionProvider } from '@/components/providers/MotionProvider';
import { ScrollToTopOnRouteChange } from '@/components/shared/ScrollToTopOnRouteChange';

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MotionProvider />
      <ScrollToTopOnRouteChange />
      <ReadingProgress />
      <a
        href="#main-content"
        className="skip-link"
      >
        Skip to content
      </a>
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
      <BackToTop />
    </>
  );
}
