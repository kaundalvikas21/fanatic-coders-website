import type { Response, Schemas } from './api';
import type { ProjectCurrency } from './enum';

export type AdminDashboardOverview = Schemas['AdminDashboardOverview'];
export type AdminDashboardLeadDistribution = Schemas['LeadStatusDistribution'];
export type AdminDashboardTaskDistribution = Schemas['TaskStatusDistribution'];
export type AdminDashboardRecentLead = Schemas['AdminDashboardRecentLead'];
export type AdminDashboardAttentionTask = Schemas['AdminDashboardAttentionTask'];
export type DashboardCurrentProjects = Schemas['DashboardCurrentProjects'];

export type AdminDashboardOverviewResponse = Response<AdminDashboardOverview>;
export type AdminDashboardLeadDistributionResponse = Response<AdminDashboardLeadDistribution>;
export type AdminDashboardTaskDistributionResponse = Response<AdminDashboardTaskDistribution>;
export type AdminDashboardRecentLeadsResponse = Response<AdminDashboardRecentLead[]>;
export type AdminDashboardAttentionTasksResponse = Response<AdminDashboardAttentionTask[]>;
export type DashboardCurrentProjectsResponse = Response<DashboardCurrentProjects>;

export type AdminPaymentSummary = {
  paidTransactions: number;
  unpaidTransactions: number;
  byCurrency: Array<{
    currency: ProjectCurrency;
    totalAmount: string;
    averageAmount: string;
    transactionCount: number;
  }>;
  recentTransactions: Array<{
    id: string;
    serviceRequestId: string;
    clientName: string;
    description: string;
    amount: string;
    currency: ProjectCurrency;
    status: 'PAID';
    paidAt: string;
    stripeInvoiceNumber: string | null;
  }>;
};

export type AdminPaymentSummaryResponse = Response<AdminPaymentSummary>;
