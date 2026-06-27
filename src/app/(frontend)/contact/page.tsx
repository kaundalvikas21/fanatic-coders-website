import type { Metadata } from 'next';
import { ContactPage } from '@/components/pages/contact/ContactPage';

export const metadata: Metadata = {
  title: 'Contact | fanaticCoders',
  description:
    "Get in touch with fanaticCoders. Tell us what you're building and a senior team member will reply within one business day.",
};

export default function Page() {
  return <ContactPage />;
}
