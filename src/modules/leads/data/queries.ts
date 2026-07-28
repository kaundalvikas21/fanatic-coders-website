'use server';

import { authApi } from '@/lib/axios/client';
import { getApiError, unwrap } from '@/lib/axios/utils';
import type { ApiResponse, GetLeadByIdResponse, GetLeadsInput, GetLeadsResponse } from '@/types';

/**
 * Get all leads.
 * Requires lead:read permission in the active organization.
 */
export async function getLeads(
  filters: GetLeadsInput = {},
): Promise<GetLeadsResponse | ApiResponse> {
  try {
    return await unwrap<GetLeadsResponse>(
      authApi.get('/api/v1/leads', {
        params: filters,
      }),
    );
  } catch (error) {
    return getApiError(error);
  }
}

/**
 * Get a single lead by ID.
 * Requires lead:read permission in the active organization.
 */
export async function getLeadById(id: string): Promise<GetLeadByIdResponse | ApiResponse> {
  try {
    return await unwrap<GetLeadByIdResponse>(authApi.get(`/api/v1/leads/${id}`));
  } catch (error) {
    return getApiError(error);
  }
}
