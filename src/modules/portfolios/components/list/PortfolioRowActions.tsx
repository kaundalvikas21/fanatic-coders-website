'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { Pencil, Settings2, Trash2 } from 'lucide-react';
import { ActionDialog } from '@/components/shared/action-dialog';
import { ActionDropdown } from '@/components/shared/action-dropdown';
import { DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { usePermissions } from '@/providers/PermissionProvider';
import type { Portfolio } from '@/types';
import { PortfolioDeleteActions } from './PortfolioDeleteActions';
import { PortfolioStatusForm } from './PortfolioStatusForm';

export function PortfolioRowActions({ portfolio }: { portfolio: Portfolio }) {
  const { can } = usePermissions();
  const canEdit = can('portfolio', 'update');
  const canDelete = can('portfolio', 'delete');
  const [statusOpen, setStatusOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);

  if (!canEdit && !canDelete) return null;

  return (
    <>
      <ActionDropdown
        triggerRef={trigger}
        ariaLabel={`Actions for ${portfolio.title}`}
        onCloseAutoFocus={(event) => {
          if (statusOpen || deleteOpen) event.preventDefault();
        }}
      >
        {canEdit && (
          <DropdownMenuItem asChild>
            <Link href={`/dashboard/portfolios/${encodeURIComponent(portfolio.id)}`}>
              <Pencil /> Edit portfolio
            </Link>
          </DropdownMenuItem>
        )}
        {canEdit && (
          <DropdownMenuItem onSelect={() => setStatusOpen(true)}>
            <Settings2 /> Change status
          </DropdownMenuItem>
        )}
        {canDelete && (
          <>
            {canEdit && <DropdownMenuSeparator />}
            <DropdownMenuItem
              variant="destructive"
              onSelect={() => setDeleteOpen(true)}
            >
              <Trash2 /> Delete portfolio
            </DropdownMenuItem>
          </>
        )}
      </ActionDropdown>
      {canEdit && (
        <ActionDialog
          open={statusOpen}
          onOpenChange={(open) => {
            setStatusOpen(open);
            if (!open) trigger.current?.focus();
          }}
          title="Change portfolio status"
          description={`Choose whether ${portfolio.title} is published.`}
        >
          <PortfolioStatusForm
            portfolioId={portfolio.id}
            initialStatus={portfolio.isPublished}
          />
        </ActionDialog>
      )}
      {canDelete && (
        <ActionDialog
          open={deleteOpen}
          onOpenChange={(open) => {
            setDeleteOpen(open);
            if (!open) trigger.current?.focus();
          }}
          title={`Delete ${portfolio.title}?`}
          description="This permanently deletes the portfolio, its sections, and its cover image. This cannot be undone."
        >
          <PortfolioDeleteActions portfolioId={portfolio.id} />
        </ActionDialog>
      )}
    </>
  );
}
