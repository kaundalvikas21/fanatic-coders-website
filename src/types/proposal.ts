import type { ProjectCurrency } from './enum';
import type { Response } from './api';

export type ProposalStatus = 'DRAFT' | 'SENT' | 'ACCEPTED';
export type ProposalPaymentStatus = 'UNPAID' | 'PAID';

export type Proposal = {
  id: string;
  serviceRequestId: string;
  createdByMemberId: string;
  description: string;
  amount: number | string;
  currency: ProjectCurrency;
  status: ProposalStatus;
  paymentStatus: ProposalPaymentStatus;
  acceptedAt: string | null;
  paidAt: string | null;
  stripeInvoiceId: string | null;
  stripeInvoiceNumber: string | null;
  stripeHostedInvoiceUrl: string | null;
  stripeInvoicePdfUrl: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateProposalRequest = {
  description: string;
  amount: number;
  currency: ProjectCurrency;
};

export type UpdateProposalRequest = Partial<CreateProposalRequest> & {
  status?: ProposalStatus;
};

export type ProposalResponse = Response<Proposal>;
