import type { Metadata } from 'next';
import { ComingSoon } from '@/components/ui/ComingSoon';

export const metadata: Metadata = {
  title: 'Terms of Service | fanaticCoders',
  description:
    "Our terms of service are being written. Reach out if you need them before they're published.",
};

export default function Page() {
  return (
    <ComingSoon
      eyebrow="terms.of-service"
      heading="Terms of Service"
      note="This page is being written. Reach out if you need our terms before it's published and we'll send them over."
    />
  );
}
