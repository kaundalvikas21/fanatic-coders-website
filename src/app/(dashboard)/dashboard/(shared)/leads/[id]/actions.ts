'use server';

import { revalidatePath } from 'next/cache';

import { updateLeadById } from '@/lib/data/leads/mutations';
import { LEAD_STATUSES, type Lead, type LeadStatus, type UpdateLeadByIdRequest } from '@/types';

type UpdateLeadActionState = {
  success: boolean;
  message: string;
  data?: Lead;
};

export async function updateLeadAction(
  leadId: string,
  payload: UpdateLeadByIdRequest,
): Promise<UpdateLeadActionState> {
  if (!leadId) {
    return {
      success: false,
      message: 'Lead id is missing.',
    };
  }

  if (payload.status && !LEAD_STATUSES.includes(payload.status as LeadStatus)) {
    return {
      success: false,
      message: 'Select a valid status.',
    };
  }

  const response = await updateLeadById(leadId, payload);

  if (!response.success) {
    return {
      success: false,
      message: response.message || 'Could not update lead.',
    };
  }

  revalidatePath('/dashboard');
  revalidatePath('/dashboard/admin');
  revalidatePath('/dashboard/leads');
  revalidatePath(`/dashboard/leads/${leadId}`);

  return {
    success: true,
    message: 'Lead updated.',
    data: response.data as Lead,
  };
}
