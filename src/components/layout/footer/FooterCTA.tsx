import { MessageCircle } from 'lucide-react';
import GradientButton from '@/components/ui/GradientButton';
import FooterCodeType from './FooterCodeType';

export default function FooterCTA() {
  return (
    <div className="glass-card rounded-2xl p-8 md:p-12 mb-12">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h3 className="text-2xl md:text-3xl font-mono font-bold tracking-tight mb-4">
            Got a build in mind? Let&apos;s scope it.
          </h3>
          <p className="text-blue-100/70 mb-6">
            Tell us what you&apos;re building and we&apos;ll bring the team to make it real.
          </p>
          <GradientButton href="/contact#contact-form">
            startConversation
            <MessageCircle
              size={16}
              className="ml-2"
              aria-hidden
            />
          </GradientButton>
        </div>
        <div className="relative">
          <FooterCodeType />
        </div>
      </div>
    </div>
  );
}
