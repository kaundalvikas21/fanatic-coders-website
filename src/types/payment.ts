import type { operations } from './backend-types';
import type { Response, Schemas } from './api';

export type Payment = Schemas['Payment'];
export type PaymentStatus = Schemas['ProposalPaymentStatus'];
export type PaginatedPayments = Schemas['PaymentsResponse']['data'];
export type PaymentsResponse = Response<PaginatedPayments>;
export type GetPaymentsInput = NonNullable<operations['getPayments']['parameters']['query']>;
export type GetPaymentsResponse = PaymentsResponse;
