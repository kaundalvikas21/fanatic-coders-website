import type { ReactNode } from 'react';
import { Mail } from 'lucide-react';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getInitials } from '@/utils/string';

type ProfileDetailsProps = {
  name: string;
  email?: string;
  image?: string | null;
  meta?: ReactNode;
};

export function ProfileDetails({ name, email, image, meta }: ProfileDetailsProps) {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
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
        <p className="font-medium">{name}</p>
        {email && (
          <a
            href={`mailto:${email}`}
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary hover:underline"
          >
            <Mail className="size-3.5" />
            {email}
          </a>
        )}
      </div>
      {meta}
    </div>
  );
}
