import type { Metadata } from 'next';
import { LegalPage, type LegalSection } from '@/components/pages/legal/LegalPage';

export const metadata: Metadata = {
  title: 'Privacy Policy | fanaticCoders',
  description:
    'Learn how fanaticCoders collects, uses, stores, and protects your personal information.',
};

const sections = [
  {
    title: 'Information we collect',
    paragraphs: [
      'We collect information you provide directly, including your name, email address, company name, service interests, budget range, and project details submitted through our forms or correspondence.',
    ],
    items: [
      'Contact and business information you submit to us.',
      'Project requirements and communications with our team.',
      'Basic technical data such as browser type, device information, and pages visited.',
    ],
  },
  {
    title: 'How we use your information',
    items: [
      'Respond to enquiries and evaluate potential projects.',
      'Provide, maintain, and improve our services and website.',
      'Send service-related communications and requested updates.',
      'Protect our website, clients, and business from misuse or security threats.',
    ],
  },
  {
    title: 'How we share information',
    paragraphs: [
      'We do not sell your personal information. We may share limited information with trusted service providers that help us operate our website, communicate with you, or deliver contracted services. We may also disclose information when required by law or to protect legal rights.',
    ],
  },
  {
    title: 'Data retention and security',
    paragraphs: [
      'We retain information only for as long as reasonably necessary for the purposes described here, contractual obligations, or legal requirements. We use reasonable administrative and technical safeguards, but no internet transmission or storage system is completely secure.',
    ],
  },
  {
    title: 'Your choices and rights',
    paragraphs: [
      'Depending on your location, you may have rights to access, correct, delete, or restrict the use of your personal information. You may also opt out of non-essential communications. Contact us to submit a request.',
    ],
  },
  {
    title: 'Updates to this policy',
    paragraphs: [
      'We may update this policy when our practices or legal obligations change. The effective date shown on this page indicates the latest revision.',
    ],
  },
] as const satisfies readonly LegalSection[];

export default function Page() {
  return (
    <LegalPage
      eyebrow="privacy.policy"
      title="Privacy Policy"
      summary="This policy explains what information we collect, why we use it, and the choices available to you."
      effectiveDate="August 10, 2026"
      sections={sections}
    />
  );
}
