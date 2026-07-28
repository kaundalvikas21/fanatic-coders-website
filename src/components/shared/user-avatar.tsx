'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getInitials } from '@/utils/string';

type UserAvatarProps = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  className?: string;
  fallbackClassName?: string;
};

export function UserAvatar({ name, email, image, className, fallbackClassName }: UserAvatarProps) {
  return (
    <Avatar className={className}>
      {image && (
        <AvatarImage
          src={image}
          alt=""
        />
      )}
      <AvatarFallback className={fallbackClassName}>
        {getInitials(name, email) || 'U'}
      </AvatarFallback>
    </Avatar>
  );
}
