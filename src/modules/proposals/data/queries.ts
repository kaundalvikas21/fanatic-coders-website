'use server';

import { authApi } from '@/lib/axios/client';
import { getApiError, unwrap } from '@/lib/axios/utils';
import type { ApiResponse, ProposalResponse } from '@/types';

export async function getServiceRequestProposal(
  serviceRequestId: string,
): Promise<ProposalResponse | ApiResponse> {
  try {
    return await unwrap<ProposalResponse>(
      authApi.get(`/api/v1/service-requests/${serviceRequestId}/proposal`),
    );
  } catch (error) {
    return getApiError(error);
  }
}
