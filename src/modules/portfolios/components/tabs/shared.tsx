'use client';

import type { ReactNode } from 'react';
import { Save, Trash2 } from 'lucide-react';
import { WidgetCard } from '@/components/shared/widget-card';
import { Button } from '@/components/ui/button';
import { FieldError, FieldGroup, FieldSet } from '@/components/ui/field';
import type { Portfolio, PortfolioAddon, PortfolioSectionType } from '@/types';

export type SectionFormProps = {
  portfolio: Portfolio;
};

export function getSection(
  portfolio: Portfolio,
  type: PortfolioSectionType,
): PortfolioAddon | undefined {
  return portfolio.addons.find((addon) => addon.type === type);
}

export function SectionFormCard({
  title,
  description,
  submitting,
  removing,
  message,
  onDelete,
  children,
}: {
  title: string;
  description: string;
  submitting: boolean;
  removing: boolean;
  message: string | null;
  onDelete?: () => void;
  children: ReactNode;
}) {
  return (
    <FieldSet loading={submitting || removing}>
      <WidgetCard
        icon={Save}
        title={title}
        description={description}
      >
        <FieldGroup>
          {children}
          {message && <FieldError errors={[{ message }]} />}
          <div className="flex flex-wrap items-center gap-2">
            <Button
              type="submit"
              disabled={submitting || removing}
              aria-busy={submitting}
            >
              {submitting ? 'Saving...' : `Save ${title.toLowerCase()}`}
            </Button>
            {onDelete && (
              <Button
                type="button"
                variant="outline"
                disabled={submitting || removing}
                aria-busy={removing}
                onClick={onDelete}
              >
                <Trash2 /> {removing ? 'Deleting...' : 'Delete section'}
              </Button>
            )}
          </div>
        </FieldGroup>
      </WidgetCard>
    </FieldSet>
  );
}
