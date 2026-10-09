import type { Metadata } from 'next';
import { ComingSoon } from '@/components/ui/ComingSoon';
import { siteConfig } from '@/config/site';
import { getPublicSiteSetting } from '@/lib/data/site-settings/get-public-site-setting';

export const metadata: Metadata = {
  title: 'Careers | fanaticCoders',
  description:
    'We hire senior engineers and designers who sweat the details. No public openings right now, but we always want to meet good people.',
};

export default async function Page() {
  const setting = await getPublicSiteSetting();
  const contactEmail = setting?.contactEmail ?? siteConfig.contactEmail;

  return (
    <ComingSoon
      eyebrow="careers.module"
      ctaHref={`mailto:${contactEmail}?subject=${encodeURIComponent('Careers at fanaticCoders')}`}
      heading="We hire slowly, and"
      headingSweep="well"
      note="No public openings right now. If you're a senior engineer or designer who cares about the details, send us your work and we'll talk."
    />
  );
}
