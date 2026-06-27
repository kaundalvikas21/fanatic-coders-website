import type { Metadata } from 'next';
import { PortfolioPage } from '@/components/pages/portfolio/PortfolioPage';

export const metadata: Metadata = {
  title: 'Portfolio | fanaticCoders',
  description:
    "Selected work from fanaticCoders: products we've designed and built across web, mobile, SaaS, and e-commerce, with the results they delivered.",
};

export default function Page() {
  return <PortfolioPage />;
}
