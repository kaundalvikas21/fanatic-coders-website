import { DetailItem } from '@/components/shared/detail-item';
import { WidgetCard } from '@/components/shared/widget-card';

export type LeadInfoItem = {
  label: string;
  value: string;
};

type LeadInfoCardProps = {
  items: LeadInfoItem[];
};

export function LeadInfoCard({ items }: LeadInfoCardProps) {
  return (
    <WidgetCard
      title="Request info"
      description="Contact and project details."
      titleClassName="text-xl font-semibold"
      descriptionClassName="text-sm"
    >
      <dl className="grid gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <DetailItem
            key={item.label}
            label={item.label}
            value={item.value}
          />
        ))}
      </dl>
    </WidgetCard>
  );
}
