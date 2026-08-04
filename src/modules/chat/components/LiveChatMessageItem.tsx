import type { ComponentProps, ReactNode } from 'react';
import { UserAvatar } from '@/components/shared/user-avatar';
import { cn } from '@/lib/utils';

type LiveChatMessageItemProps = Omit<ComponentProps<'article'>, 'children'> & {
  author: {
    name: string;
    email?: string | null;
    image?: string | null;
  };
  label?: ReactNode;
  meta?: ReactNode;
  timestamp?: ReactNode;
  children: ReactNode;
};

export function LiveChatMessageItem({
  author,
  label,
  meta,
  timestamp,
  children,
  className,
  ...props
}: LiveChatMessageItemProps) {
  return (
    <article
      className={cn('flex gap-3 px-6 py-4', className)}
      {...props}
    >
      <UserAvatar
        name={author.name}
        email={author.email}
        image={author.image}
        className="mt-0.5"
      />

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <p className="text-sm font-medium">{author.name}</p>
          {label && <span className="text-xs text-muted-foreground">{label}</span>}
          {meta}
          {timestamp && <div className="ml-auto">{timestamp}</div>}
        </div>
        <div className="mt-2 max-w-[75ch] whitespace-pre-wrap wrap-break-word text-sm leading-6">
          {children}
        </div>
      </div>
    </article>
  );
}
