import { EmptyState } from '@/components/shared/empty-state';
import { ErrorState } from '@/components/shared/error-state';
import { getLeads } from '@/lib/data/leads/queries';
import { LeadsTable } from '../leads-table';

export async function LeadsTableSection() {
  const response = await getLeads();
  const leads = Array.isArray(response.data) ? response.data : [];

  if (!response.success) {
    return (
      <ErrorState
        title="Could not load leads"
        message={response.message}
      />
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
