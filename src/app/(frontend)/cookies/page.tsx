import type { Metadata } from 'next';
import { LegalPage, type LegalSection } from '@/components/pages/legal/LegalPage';

export const metadata: Metadata = {
  title: 'Cookie Policy | fanaticCoders',
  description: 'Learn how fanaticCoders uses cookies and similar browser technologies.',
};

const sections = [
  {
    title: 'What cookies are',
    paragraphs: [
      'Cookies are small text files stored by your browser. Similar technologies, such as local storage, can also remember information or help a website function across visits.',
    ],
  },
  {
    title: 'How we use them',
    items: [
      'Essential storage needed for security, authentication, and core website functionality.',
      'Preference storage that remembers choices you make on the website.',
      'Analytics technologies that help us understand website performance and usage when enabled.',
    ],
  },
  {
    title: 'Third-party technologies',
    paragraphs: [
      'Some features may rely on third-party providers, such as hosting, analytics, embedded media, or authentication services. These providers may set or access their own cookies according to their respective privacy policies.',
    ],
  },
  {
    title: 'Managing cookies',
    paragraphs: [
      'You can block or delete cookies using your browser settings. Blocking essential storage may prevent login, preferences, or other parts of the website from working correctly.',
    ],
  },
  {
    title: 'Policy updates',
    paragraphs: [
      'We may revise this policy if the technologies used on our website change. The effective date at the top of this page shows when it was last updated.',
    ],
  },
] as const satisfies readonly LegalSection[];

export default function Page() {
  return (
    <LegalPage
      eyebrow="cookie.policy"
      title="Cookie Policy"
      summary="This policy explains the browser technologies our website may use, why we use them, and how you can control them."
      effectiveDate="August 10, 2026"
      sections={sections}
    />
  );
}
