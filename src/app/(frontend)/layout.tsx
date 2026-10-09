import Header from '@/components/layout/Header';
import Footer from '@/components/layout/footer/Footer';
import { BackToTop } from '@/components/ui/BackToTop';
import { ReadingProgress } from '@/components/ui/ReadingProgress';
import { MotionProvider } from '@/components/providers/MotionProvider';
import { ScrollToTopOnRouteChange } from '@/components/shared/ScrollToTopOnRouteChange';
import { getPublicSiteSetting } from '@/lib/data/site-settings/get-public-site-setting';
import { SiteSettingsProvider } from '@/providers/SiteSettingsProvider';

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  const setting = await getPublicSiteSetting();

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
      <SiteSettingsProvider setting={setting}>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </SiteSettingsProvider>
      <BackToTop />
    </>
  );
}
