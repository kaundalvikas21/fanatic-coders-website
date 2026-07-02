import { XCircle } from 'lucide-react';
import { EmptyState } from '@/components/shared/empty-state';
import { getLeads } from '@/lib/data/leads/queries';
import { LeadsTable } from '../leads-table';

export async function LeadsTableSection() {
  const response = await getLeads();
  const leads = Array.isArray(response.data) ? response.data : [];

  if (!response.success) {
    return (
      <section className="flex items-start gap-3 rounded-lg border px-4 py-5 text-sm">
        <XCircle className="mt-0.5 size-4 text-destructive" />
        <div>
          <p className="font-medium">Could not load leads</p>
          <p className="mt-1 text-muted-foreground">{response.message}</p>
        </div>
      </section>
    );
  }

  if (leads.length === 0) {
    return (
      <EmptyState
        entity="leads"
        description="Contact form submissions will appear here."
      />
    );
  }

  return <LeadsTable data={leads} />;
}
