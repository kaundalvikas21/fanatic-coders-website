import { format } from 'date-fns';

export function formatMediumDate(value?: Date | string) {
  if (!value) {
    return 'Unknown';
  }

  return format(new Date(value), 'PP');
}
