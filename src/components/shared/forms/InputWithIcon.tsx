import type { LucideIcon } from 'lucide-react';
import type { ComponentProps } from 'react';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { cn } from '@/lib/utils';

type InputWithIconProps = ComponentProps<typeof InputGroupInput> & {
  icon: LucideIcon;
  groupClassName?: string;
  iconClassName?: string;
};

export function InputWithIcon({
  icon: Icon,
  groupClassName,
  iconClassName,
  ...props
}: InputWithIconProps) {
  return (
    <InputGroup
      className={cn(
        'h-11 focus-within:ring-2 focus-within:ring-aurora-violet-light',
        groupClassName,
      )}
    >
      <InputGroupInput {...props} />
      <InputGroupAddon>
        <Icon
          className={cn(
            'transition-colors group-focus-within/input-group:text-aurora-violet-light',
            iconClassName,
          )}
          aria-hidden="true"
        />
      </InputGroupAddon>
    </InputGroup>
  );
}
