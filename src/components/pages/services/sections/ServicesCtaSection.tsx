import { Send, ArrowRight } from 'lucide-react';
import GradientButton from '@/components/ui/GradientButton';
import { CtaPanel } from '@/components/ui/CtaPanel';

export function ServicesCtaSection() {
  return (
    <CtaPanel
      sectionId="services-cta"
      badge="./scope-your-build.sh"
      heading="Not sure where to start?"
      body="Tell us the problem and we'll recommend the right mix of services with a clear plan to get there."
    >
      <GradientButton href="/contact#contact-form">
        bookADiscoveryCall
        <Send
          size={16}
          className="ml-2 group-hover:translate-x-1 transition-transform"
          aria-hidden
        />
      </GradientButton>
      <GradientButton
        href="/login"
        variant="secondary"
      >
        seeCaseStudies
        <ArrowRight
          size={16}
          className="ml-2 group-hover:translate-x-1 transition-transform"
          aria-hidden
        />
      </GradientButton>
    </CtaPanel>
  );
}
