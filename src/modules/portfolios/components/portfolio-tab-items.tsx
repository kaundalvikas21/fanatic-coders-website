import { ChartNoAxesCombined, FileText, Images, Lightbulb, ListChecks, Target } from 'lucide-react';
import type { SectionTabItem } from '@/components/shared/section-tabs';

export const portfolioTabItems = [
  {
    value: 'details',
    label: 'Project details',
    icon: (
      <FileText
        className="size-4"
        aria-hidden="true"
      />
    ),
  },
  {
    value: 'facts',
    label: 'Project facts',
    icon: (
      <Images
        className="size-4"
        aria-hidden="true"
      />
    ),
  },
  {
    value: 'challenge',
    label: 'Challenge',
    icon: (
      <Target
        className="size-4"
        aria-hidden="true"
      />
    ),
  },
  {
    value: 'approach',
    label: 'Approach',
    icon: (
      <Lightbulb
        className="size-4"
        aria-hidden="true"
      />
    ),
  },
  {
    value: 'delivery',
    label: 'Delivery',
    icon: (
      <ListChecks
        className="size-4"
        aria-hidden="true"
      />
    ),
  },
  {
    value: 'results',
    label: 'Results',
    icon: (
      <ChartNoAxesCombined
        className="size-4"
        aria-hidden="true"
      />
    ),
  },
] as const satisfies readonly SectionTabItem[];
