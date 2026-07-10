import type { Metadata } from 'next';
import { JetBrains_Mono, Plus_Jakarta_Sans } from 'next/font/google';
import { PublicProvider } from '@/providers/PublicProvider';
import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plus-jakarta-sans',
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
});

export const metadata: Metadata = {
  title: 'fanaticCoders | Digital Agency',
  description:
    'Professional web design, development, and digital marketing. We build digital products with modern technology.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${jetBrainsMono.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body>
        <PublicProvider>{children}</PublicProvider>
      </body>
    </html>
  );
}
