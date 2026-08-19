'use server';

import { cache } from 'react';
import { authApi } from '@/lib/axios/client';
import { getApiError, unwrap } from '@/lib/axios/utils';
import type {
  AdminDashboardAttentionTasksResponse,
  AdminDashboardLeadDistributionResponse,
  AdminDashboardOverviewResponse,
  AdminPaymentSummaryResponse,
  AdminDashboardRecentLeadsResponse,
  AdminDashboardTaskDistributionResponse,
  DashboardCurrentProjectsResponse,
  Response,
} from '@/types';

async function getDashboardData<TData>(
  endpoint: string,
  errorCode: string,
): Promise<Response<TData>> {
  try {
    return await unwrap<Response<TData>>(authApi.get(endpoint));
  } catch (error) {
    const response = getApiError(error);

    return {
      success: false,
      status: response.status,
      message: response.message,
      error: {
        code: response.error?.code ?? errorCode,
        details: response.error?.details,
      },
    };
  }
}

export async function getAdminDashboardOverview(): Promise<AdminDashboardOverviewResponse> {
  return await getDashboardData('/api/v1/dashboard/overview', 'ADMIN_DASHBOARD_OVERVIEW_FAILED');
}

export async function getAdminPaymentSummary(): Promise<AdminPaymentSummaryResponse> {
  return await getDashboardData(
    '/api/v1/dashboard/payment-summary',
    'ADMIN_DASHBOARD_PAYMENT_SUMMARY_FAILED',
  );
}

export async function getAdminDashboardLeadDistribution(): Promise<AdminDashboardLeadDistributionResponse> {
  return await getDashboardData('/api/v1/dashboard/leads', 'ADMIN_DASHBOARD_LEADS_FAILED');
}

export async function getAdminDashboardTaskDistribution(): Promise<AdminDashboardTaskDistributionResponse> {
  return await getDashboardData('/api/v1/dashboard/tasks', 'ADMIN_DASHBOARD_TASKS_FAILED');
}

export async function getAdminDashboardRecentLeads(): Promise<AdminDashboardRecentLeadsResponse> {
  return await getDashboardData(
    '/api/v1/dashboard/recent/leads',
    'ADMIN_DASHBOARD_RECENT_LEADS_FAILED',
  );
}

export async function getAdminDashboardAttentionTasks(): Promise<AdminDashboardAttentionTasksResponse> {
  return await getDashboardData(
    '/api/v1/dashboard/attention/tasks',
    'ADMIN_DASHBOARD_ATTENTION_TASKS_FAILED',
  );
}

const getCachedDashboardCurrentProjects = cache(
  async (): Promise<DashboardCurrentProjectsResponse> =>
    await getDashboardData('/api/v1/dashboard/projects', 'DASHBOARD_CURRENT_PROJECTS_FAILED'),
);

export async function getDashboardCurrentProjects(): Promise<DashboardCurrentProjectsResponse> {
  return await getCachedDashboardCurrentProjects();
}
