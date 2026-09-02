import type { ReactNode } from 'react';
import { Mail } from 'lucide-react';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { getInitials } from '@/utils/string';

type ProfileDetailsProps = {
  name: string;
  email?: string;
  image?: string | null;
  meta?: ReactNode;
  nameAsHeading?: boolean;
  children?: ReactNode;
  actionSlot?: ReactNode;
  className?: string;
};

export function ProfileDetails({
  name,
  email,
  image,
  meta,
  nameAsHeading = false,
  children,
  actionSlot,
  className,
}: ProfileDetailsProps) {
  const NameElement = nameAsHeading ? 'h1' : 'p';

  return (
    <Card
      className={cn(
        'relative border border-border/80 bg-card/80 transition-colors duration-200 hover:border-primary/20',
        className,
      )}
    >
      {actionSlot && <div className="absolute top-2 left-2 z-10">{actionSlot}</div>}
      <CardHeader className="flex flex-col items-center gap-4 px-6 pt-2 text-center">
        {image ? (
          <Link
            href={{
              pathname: '/dashboard/photo',
              query: {
                src: image,
                alt: `${name} profile photo`,
              },
            }}
            aria-label={`View ${name}'s profile photo`}
            className="cursor-zoom-in rounded-full outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <Avatar className="size-20">
              <AvatarImage
                src={image}
                alt=""
              />
              <AvatarFallback className="text-xl">{getInitials(name, email) || 'U'}</AvatarFallback>
            </Avatar>
          </Link>
        ) : (
          <Avatar className="size-20">
            <AvatarFallback className="text-xl">{getInitials(name, email) || 'U'}</AvatarFallback>
          </Avatar>
        )}
        <div className="min-w-0">
          <NameElement className={nameAsHeading ? 'text-xl font-semibold' : 'font-medium'}>
            {name}
          </NameElement>
          {email && (
            <a
              href={`mailto:${email}`}
              className="inline-flex max-w-full items-center gap-1 break-all text-sm text-muted-foreground hover:text-primary hover:underline"
            >
              <Mail className="size-3.5 shrink-0" />
              {email}
            </a>
          )}
        </div>
        {meta}
      </CardHeader>
      {children && <CardContent className="px-6 pb-2">{children}</CardContent>}
    </Card>
  );
}
