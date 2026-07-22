'use client';

import { CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { formatDate, formatDateInputValue, parseDateInputValue } from '@/utils/date';

type DatePickerFieldProps = {
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  ariaLabel?: string;
  error?: string;
  className?: string;
  disabled?: boolean;
  minDate?: Date;
};

export function DatePickerField({
  id,
  value,
  onChange,
  placeholder = 'Pick a date',
  ariaLabel,
  error,
  className,
  disabled,
  minDate,
}: DatePickerFieldProps) {
  const selectedDate = parseDateInputValue(value);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id={id}
          type="button"
          variant="outline"
          disabled={disabled}
          aria-label={ariaLabel}
          aria-invalid={Boolean(error)}
          data-empty={!selectedDate}
          className={cn(
            'w-full justify-start text-left font-normal data-[empty=true]:text-muted-foreground',
            className,
          )}
        >
          <CalendarIcon data-icon="inline-start" />
          {selectedDate ? formatDate(selectedDate) : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-0"
        align="start"
      >
        <Calendar
          mode="single"
          selected={selectedDate}
          defaultMonth={selectedDate ?? minDate}
          disabled={minDate ? { before: minDate } : undefined}
          onSelect={(date) => {
            if (date) {
              onChange(formatDateInputValue(date));
            }
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
