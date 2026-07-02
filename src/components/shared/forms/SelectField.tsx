'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

export type SelectOption = {
  value: string;
  label: string;
  className?: string;
};

type SelectFieldProps = {
  id: string;
  value: string;
  options: readonly SelectOption[];
  onChange: (value: string) => void;
  placeholder?: string;
  ariaLabel?: string;
  error?: string;
  className?: string;
  disabled?: boolean;
};

export function SelectField({
  id,
  value,
  options,
  onChange,
  placeholder,
  ariaLabel,
  error,
  className,
  disabled,
}: SelectFieldProps) {
  return (
    <Select
      value={value}
      onValueChange={onChange}
      disabled={disabled}
    >
      <SelectTrigger
        id={id}
        aria-label={ariaLabel}
        aria-invalid={Boolean(error)}
        disabled={disabled}
        className={cn('w-full', className)}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent position="popper">
        <SelectGroup>
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className={option.className}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
