import FooterBackground from './FooterBackground';
import FooterCTA from './FooterCTA';
import FooterContent from './FooterContent';
import FooterBottomBar from './FooterBottomBar';

export default function Footer() {
  return (
    <footer className="footer-root relative overflow-hidden pt-24 pb-12">
      <div className="aurora-top-fade absolute top-0 left-0 right-0 h-32 pointer-events-none" />
      <FooterBackground />
      <div className="container mx-auto px-4 relative">
        <FooterCTA />
        <FooterContent />
        <FooterBottomBar />
      </div>
    </footer>
  );
}
