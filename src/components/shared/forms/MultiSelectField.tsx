'use client';

import type { ReactNode } from 'react';
import Select, { type MultiValue } from 'react-select';
import { cn } from '@/lib/utils';

export type MultiSelectOption = {
  label: string;
  value: string;
};

type MultiSelectFieldProps<TOption extends MultiSelectOption> = {
  id: string;
  options: readonly TOption[];
  value: readonly string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  noOptionsMessage?: string;
  ariaLabel?: string;
  disabled?: boolean;
  invalid?: boolean;
  className?: string;
  renderOption?: (option: TOption, context: 'menu' | 'value') => ReactNode;
};

export function MultiSelectField<TOption extends MultiSelectOption>({
  id,
  options,
  value,
  onChange,
  placeholder = 'Select options',
  noOptionsMessage = 'No options found.',
  ariaLabel,
  disabled = false,
  invalid = false,
  className,
  renderOption,
}: MultiSelectFieldProps<TOption>) {
  const selectedOptions = options.filter((option) => value.includes(option.value));

  function handleChange(selected: MultiValue<TOption>) {
    onChange(selected.map((option) => option.value));
  }

  return (
    <Select<TOption, true>
      inputId={id}
      instanceId={id}
      isMulti
      options={options}
      value={selectedOptions}
      onChange={handleChange}
      placeholder={placeholder}
      noOptionsMessage={() => noOptionsMessage}
      formatOptionLabel={(option, meta) => renderOption?.(option, meta.context) ?? option.label}
      aria-label={ariaLabel}
      aria-invalid={invalid}
      isDisabled={disabled}
      unstyled
      className={className}
      classNames={{
        control: ({ isFocused, isDisabled }) =>
          cn(
            'min-h-8 rounded-lg border border-input bg-transparent px-1 text-sm transition-colors',
            isFocused && 'border-ring ring-3 ring-ring/50',
            isDisabled && 'cursor-not-allowed bg-input/50 opacity-50',
            invalid && 'border-destructive ring-3 ring-destructive/20',
          ),
        valueContainer: () => 'gap-1 px-1.5 py-1',
        placeholder: () => 'text-muted-foreground',
        input: () => 'text-foreground',
        multiValue: () => 'rounded-md bg-muted text-foreground',
        multiValueLabel: () => 'px-1.5 py-0.5 text-xs',
        multiValueRemove: () =>
          'rounded-r-md px-1 text-muted-foreground hover:bg-destructive/15 hover:text-destructive',
        indicatorsContainer: () => 'text-muted-foreground',
        dropdownIndicator: () => 'cursor-pointer p-1.5 hover:text-foreground',
        menu: () =>
          'mt-1 overflow-hidden rounded-lg bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10',
        menuList: () => 'max-h-60 p-1',
        option: ({ isFocused, isSelected }) =>
          cn(
            'cursor-pointer rounded-md px-2 py-1.5 text-sm',
            isFocused && 'bg-accent text-accent-foreground',
            isSelected && 'bg-primary text-primary-foreground',
          ),
        noOptionsMessage: () => 'px-2 py-4 text-sm text-muted-foreground',
      }}
    />
  );
}
