'use server';

import { revalidatePath } from 'next/cache';

import { authApi } from '@/lib/axios/client';
import { getApiError, unwrap } from '@/lib/axios/utils';
import type {
  ApiResponse,
  CreateProposalRequest,
  ProposalResponse,
  UpdateProposalRequest,
} from '@/types';

function revalidateProposalPages(serviceRequestId: string) {
  // Refresh every dashboard surface that summarizes proposal and invoice state.
  revalidatePath('/dashboard/services');
  revalidatePath(`/dashboard/services/${serviceRequestId}`);
  revalidatePath('/dashboard/client');
}

export async function createServiceRequestProposal(
  serviceRequestId: string,
  payload: CreateProposalRequest,
): Promise<ProposalResponse | ApiResponse> {
  try {
    const response = await unwrap<ProposalResponse>(
      authApi.post(`/api/v1/service-requests/${serviceRequestId}/proposal`, payload),
    );

    revalidateProposalPages(serviceRequestId);
    return response;
  } catch (error) {
    return getApiError(error);
  }
}

export async function updateServiceRequestProposal(
  serviceRequestId: string,
  payload: UpdateProposalRequest,
): Promise<ProposalResponse | ApiResponse> {
  try {
    const response = await unwrap<ProposalResponse>(
      authApi.patch(`/api/v1/service-requests/${serviceRequestId}/proposal`, payload),
    );

    revalidateProposalPages(serviceRequestId);
    return response;
  } catch (error) {
    return getApiError(error);
  }
}

export async function deleteServiceRequestProposal(
  serviceRequestId: string,
): Promise<ProposalResponse | ApiResponse> {
  try {
    const response = await unwrap<ProposalResponse>(
      authApi.delete(`/api/v1/service-requests/${serviceRequestId}/proposal`),
    );

    revalidateProposalPages(serviceRequestId);
    return response;
  } catch (error) {
    return getApiError(error);
  }
}
