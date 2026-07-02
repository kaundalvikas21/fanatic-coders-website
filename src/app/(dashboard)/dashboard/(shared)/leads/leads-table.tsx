'use client';

import { DataTable } from '@/components/ui/data-table';
import type { Lead } from '@/types';
import { leadColumns } from './columns';

export function LeadsTable({ data }: { data: Lead[] }) {
  return (
    <DataTable
      columns={leadColumns}
      data={data}
      tableClassName="min-w-[920px]"
    />
  );
}
