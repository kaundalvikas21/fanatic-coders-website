'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';

type BackButtonProps = {
  label: string;
};

export function BackButton({ label }: BackButtonProps) {
  const router = useRouter();

  return (
    <Button
      type="button"
      variant="link"
      size="lg"
      className="text-foreground hover:text-foreground"
      aria-label={label}
      onClick={() => router.back()}
    >
      <ArrowLeft className="size-6" />
    </Button>
  );
}
