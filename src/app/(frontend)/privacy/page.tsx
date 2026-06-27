import type { Metadata } from 'next';
import { ComingSoon } from '@/components/ui/ComingSoon';

export const metadata: Metadata = {
  title: 'Privacy Policy | fanaticCoders',
  description:
    'Our privacy policy is being finalized. Contact us with any question about how we handle your data.',
};

export default function Page() {
  return (
    <ComingSoon
      eyebrow="privacy.policy"
      heading="Privacy Policy"
      note="We're finalizing this page. Until it's up, email us with any question about how we handle your data and we'll answer directly."
    />
  );
}
