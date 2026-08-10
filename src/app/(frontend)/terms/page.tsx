import type { Metadata } from 'next';
import { LegalPage, type LegalSection } from '@/components/pages/legal/LegalPage';

export const metadata: Metadata = {
  title: 'Terms of Service | fanaticCoders',
  description: 'Review the terms governing your use of the fanaticCoders website and services.',
};

const sections = [
  {
    title: 'Using our website',
    paragraphs: [
      'You may use this website for lawful purposes and to learn about or enquire about our services. You must not interfere with the website, attempt unauthorized access, introduce harmful code, or use its content in a misleading or unlawful way.',
    ],
  },
  {
    title: 'Enquiries and project proposals',
    paragraphs: [
      'Submitting a contact form or discussing a project does not create a client relationship or bind either party to a project. Services begin only after both parties agree to a written proposal, statement of work, or other contract.',
    ],
  },
  {
    title: 'Service agreements',
    paragraphs: [
      'Project scope, deliverables, fees, timelines, ownership, warranties, and support terms are defined in the applicable written agreement. If these website terms conflict with a signed service agreement, the signed agreement controls for that project.',
    ],
  },
  {
    title: 'Intellectual property',
    paragraphs: [
      'The website, brand, design, text, graphics, and source materials are owned by fanaticCoders or used with permission. You may not reproduce or commercially use them without prior written permission. Ownership of client deliverables is governed by the relevant service agreement.',
    ],
  },
  {
    title: 'Third-party services',
    paragraphs: [
      'Our website or projects may use or link to third-party services. Those services operate under their own terms and policies, and we are not responsible for third-party websites or services outside our control.',
    ],
  },
  {
    title: 'Disclaimer and liability',
    paragraphs: [
      'The website is provided on an “as available” basis. To the extent permitted by law, we do not guarantee uninterrupted access or that all website information will always be complete or current. We are not liable for indirect or consequential loss arising solely from use of this website.',
    ],
  },
  {
    title: 'Changes to these terms',
    paragraphs: [
      'We may update these terms as our website or business changes. Continued use of the website after an update means the revised terms apply from their effective date.',
    ],
  },
] as const satisfies readonly LegalSection[];

export default function Page() {
  return (
    <LegalPage
      eyebrow="terms.of-service"
      title="Terms of Service"
      summary="These terms explain the rules for using our website and how project enquiries relate to our professional services."
      effectiveDate="August 10, 2026"
      sections={sections}
    />
  );
}
