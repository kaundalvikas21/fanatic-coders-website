'use server';

import { authApi, publicApi } from '@/lib/axios/client';
import { getApiError, unwrap } from '@/lib/axios/utils';
import type {
  ApiResponse,
  CreateLeadRequest,
  CreateLeadResponse,
  DeleteLeadByIdResponse,
  UpdateLeadByIdRequest,
  UpdateLeadByIdResponse,
} from '@/types';

/**
 * Create a lead from the public contact form
 * Uses public backend API and returns the backend ApiResponse shape
 */
export async function createLead(
  payload: CreateLeadRequest,
): Promise<CreateLeadResponse | ApiResponse> {
  try {
    return await unwrap<CreateLeadResponse>(publicApi.post('/api/v1/leads', payload));
  } catch (error) {
    return getApiError(error);
  }
}

/**
 * Update a lead by ID for admin use
 * Requires an authenticated ADMIN or MANAGER user
 */
export async function updateLeadById(
  id: string,
  payload: UpdateLeadByIdRequest,
): Promise<UpdateLeadByIdResponse | ApiResponse> {
  try {
    return await unwrap<UpdateLeadByIdResponse>(authApi.put(`/api/v1/leads/${id}`, payload));
  } catch (error) {
    return getApiError(error);
  }
}

/**
 * Delete a lead by ID for admin use
 * Requires an authenticated ADMIN or MANAGER user
 */
export async function deleteLeadById(id: string): Promise<DeleteLeadByIdResponse | ApiResponse> {
  try {
    return await unwrap<DeleteLeadByIdResponse>(authApi.delete(`/api/v1/leads/${id}`));
  } catch (error) {
    return getApiError(error);
  }
}
