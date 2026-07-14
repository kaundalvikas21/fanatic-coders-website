import Link from 'next/link';
import {
  ArrowRight,
  Code2,
  Megaphone,
  MonitorSmartphone,
  Search,
  Smartphone,
  Target,
  type LucideIcon,
} from 'lucide-react';
import { getServiceRequestRoute } from '@/modules/service-requests/config/service-routes';
import { SERVICE_INTEREST_OPTIONS, type ServiceInterest } from '@/types';

type ServiceCatalogItem = {
  service: ServiceInterest;
  label: string;
  context: string;
  description: string;
  Icon: LucideIcon;
};

const serviceContexts = {
  WEB_DEVELOPMENT: 'Web product',
  MOBILE_APP_DEVELOPMENT: 'Mobile product',
  SEO: 'Organic growth',
  GOOGLE_ADS: 'Paid growth',
  GENERAL_MARKETING: 'Growth support',
  OTHER: 'Custom request',
} as const satisfies Record<ServiceInterest, string>;

const serviceDescriptions = {
  WEB_DEVELOPMENT: 'Plan a website, web app, or product build with the team.',
  MOBILE_APP_DEVELOPMENT: 'Share details for an iOS, Android, or cross-platform app.',
  SEO: 'Request search visibility, content, and technical SEO support.',
  GOOGLE_ADS: 'Start a paid search campaign or improve existing ad performance.',
  GENERAL_MARKETING: 'Discuss growth, campaign, and marketing execution needs.',
  OTHER: 'Send a custom request when your service does not fit the list.',
} as const satisfies Record<ServiceInterest, string>;

const serviceIcons = {
  WEB_DEVELOPMENT: Code2,
  MOBILE_APP_DEVELOPMENT: Smartphone,
  SEO: Search,
  GOOGLE_ADS: Target,
  GENERAL_MARKETING: Megaphone,
  OTHER: MonitorSmartphone,
} as const satisfies Record<ServiceInterest, LucideIcon>;

const serviceCatalogItems: ServiceCatalogItem[] = SERVICE_INTEREST_OPTIONS.map((option) => ({
  service: option.value,
  label: option.label,
  context: serviceContexts[option.value],
  description: serviceDescriptions[option.value],
  Icon: serviceIcons[option.value],
}));

export function ServiceCatalog() {
  return (
    <div className="grid auto-cols-[minmax(11rem,1fr)] grid-flow-col gap-2 overflow-x-auto pb-1 xl:grid-flow-row xl:grid-cols-6 xl:overflow-visible xl:pb-0">
      {serviceCatalogItems.map(({ service, label, context, description, Icon }) => (
        <Link
          key={service}
          href={getServiceRequestRoute(service)}
          title={description}
          className="group flex min-h-14 items-center gap-2 rounded-lg border bg-card px-2.5 py-2 text-card-foreground outline-none transition-colors hover:bg-accent/60 focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary ring-1 ring-primary/15 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            <Icon className="size-4" />
          </span>

          <span className="grid min-w-0 flex-1 gap-0.5">
            <span className="truncate text-sm font-medium leading-5">{label}</span>
            <span className="truncate text-xs leading-4 text-muted-foreground">{context}</span>
          </span>

          <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
        </Link>
      ))}
    </div>
  );
}
