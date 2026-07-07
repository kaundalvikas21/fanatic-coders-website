'use server';

import { revalidatePath } from 'next/cache';
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
    const response = await unwrap<CreateLeadResponse>(publicApi.post('/api/v1/leads', payload));

    revalidatePath('/dashboard/leads');

    return response;
  } catch (error) {
    return getApiError(error);
  }
}

/**
 * Update a lead by ID.
 * Requires lead:update permission in the active organization.
 */
export async function updateLeadById(
  id: string,
  payload: UpdateLeadByIdRequest,
): Promise<UpdateLeadByIdResponse | ApiResponse> {
  try {
    const response = await unwrap<UpdateLeadByIdResponse>(
      authApi.put(`/api/v1/leads/${id}`, payload),
    );

    revalidatePath('/dashboard/leads');

    return response;
  } catch (error) {
    return getApiError(error);
  }
}

/**
 * Delete a lead by ID.
 * Requires lead:delete permission in the active organization.
 */
export async function deleteLeadById(id: string): Promise<DeleteLeadByIdResponse | ApiResponse> {
  try {
    const response = await unwrap<DeleteLeadByIdResponse>(authApi.delete(`/api/v1/leads/${id}`));

    revalidatePath('/dashboard/leads');

    return response;
  } catch (error) {
    return getApiError(error);
  }
}
