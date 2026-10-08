import type { Metadata } from 'next';
import { AboutPage } from '@/components/pages/about/AboutPage';
import { getPublicTeam } from '@/lib/data/team/queries';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'About | fanaticCoders',
  description:
    'Meet fanaticCoders, a senior digital product studio that pairs sharp design with solid engineering to ship fast, reliable software.',
};

export default async function Page() {
  const team = await getPublicTeam();
  return <AboutPage team={team} />;
}
