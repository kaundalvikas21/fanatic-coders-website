'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';

import { PhotoViewer } from '@/components/dashboard/dialog/photo/PhotoViewer';
import { ActionDialog } from '@/components/shared/action-dialog';

type PhotoModalPageProps = {
  searchParams: Promise<{
    src?: string | string[];
    alt?: string | string[];
  }>;
};

function getFirstValue(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

export default function PhotoModalPage({ searchParams }: PhotoModalPageProps) {
  const router = useRouter();
  const params = use(searchParams);
  const src = getFirstValue(params.src);
  const alt = getFirstValue(params.alt) || 'Photo';

  return (
    <ActionDialog
      title={alt}
      defaultOpen
      contentClassName="max-h-[calc(100svh-2rem)] overflow-auto sm:max-w-3xl"
      onOpenChange={(open) => {
        if (!open) router.back();
      }}
    >
      <PhotoViewer
        src={src}
        alt={alt}
      />
    </ActionDialog>
  );
}
