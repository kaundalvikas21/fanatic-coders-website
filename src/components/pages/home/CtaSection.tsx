import { Send, ArrowRight } from 'lucide-react';
import GradientButton from '@/components/ui/GradientButton';
import { CtaPanel } from '@/components/ui/CtaPanel';

export default function CtaSection() {
  return (
    <CtaPanel
      sectionId="contact"
      background="var(--dark-1)"
      badge="./start-collaboration.sh"
      heading="Ready to start your build?"
      body="Tell us what you want to build. Our senior team will bring a clear plan and ship it with you."
    >
      <GradientButton href="/contact">
        dropUsALine
        <Send
          size={16}
          className="ml-2 group-hover:translate-x-1 transition-transform"
          aria-hidden
        />
      </GradientButton>
      <GradientButton
        href="/services"
        variant="secondary"
      >
        exploreServices
        <ArrowRight
          size={16}
          className="ml-2 group-hover:translate-x-1 transition-transform"
          aria-hidden
        />
      </GradientButton>
    </CtaPanel>
  );
}
