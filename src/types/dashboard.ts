import type { Response, Schemas } from './api';

export type AdminDashboardOverview = Schemas['AdminDashboardOverview'];
export type AdminDashboardLeadDistribution = Schemas['LeadStatusDistribution'];
export type AdminDashboardTaskDistribution = Schemas['TaskStatusDistribution'];
export type AdminDashboardRecentLead = Schemas['AdminDashboardRecentLead'];
export type AdminDashboardAttentionTask = Schemas['AdminDashboardAttentionTask'];

export type AdminDashboardOverviewResponse = Response<AdminDashboardOverview>;
export type AdminDashboardLeadDistributionResponse = Response<AdminDashboardLeadDistribution>;
export type AdminDashboardTaskDistributionResponse = Response<AdminDashboardTaskDistribution>;
export type AdminDashboardRecentLeadsResponse = Response<AdminDashboardRecentLead[]>;
export type AdminDashboardAttentionTasksResponse = Response<AdminDashboardAttentionTask[]>;
