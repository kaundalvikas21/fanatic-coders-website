import type { SelectOption } from '@/components/shared/forms/SelectField';

export const ALL_PAYMENT_STATUSES_VALUE = 'all';

export const PAYMENT_STATUS_OPTIONS = [
  { value: ALL_PAYMENT_STATUSES_VALUE, label: 'All statuses' },
  { value: 'PAID', label: 'Paid' },
  { value: 'UNPAID', label: 'Unpaid' },
] satisfies SelectOption[];
