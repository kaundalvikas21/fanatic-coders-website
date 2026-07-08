import type { ReactNode } from 'react';
import { Mail } from 'lucide-react';

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
      <Avatar className="size-20">
        {image ? (
          <AvatarImage
            src={image}
            alt={name}
          />
        ) : null}
        <AvatarFallback className="text-xl">{getInitials(name, email) || 'U'}</AvatarFallback>
      </Avatar>
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
