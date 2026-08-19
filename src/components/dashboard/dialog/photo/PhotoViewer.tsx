'use client';

import { useState } from 'react';
import { ImageOff, ImageIcon } from 'lucide-react';

import { Skeleton } from '@/components/ui/skeleton';

type PhotoViewerProps = {
  src?: string | null;
  alt: string;
  isPending?: boolean;
  emptyDescription?: string;
};

function getSafePhotoSource(src?: string | null) {
  if (!src) return null;
  if (src.startsWith('/') && !src.startsWith('//')) return src;

  try {
    const url = new URL(src);
    return url.protocol === 'https:' || url.protocol === 'http:' ? url.toString() : null;
  } catch {
    return null;
  }
}

function PhotoState({ error = false, description }: { error?: boolean; description: string }) {
  const Icon = error ? ImageOff : ImageIcon;

  return (
    <div className="flex min-h-64 flex-col items-center justify-center gap-3 rounded-lg bg-muted px-6 text-center">
      <div className="flex size-10 items-center justify-center rounded-lg bg-background text-muted-foreground">
        <Icon aria-hidden="true" />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-foreground">
          {error ? 'Photo unavailable' : 'No photo'}
        </p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

function PhotoImage({ src, alt }: { src: string; alt: string }) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <PhotoState
        error
        description="The photo could not be loaded."
      />
    );
  }

  return (
    <div className="relative flex min-h-64 items-center justify-center overflow-hidden rounded-lg bg-muted">
      {isLoading ? (
        <Skeleton
          className="absolute inset-0 rounded-lg"
          role="status"
          aria-label="Loading photo"
        />
      ) : null}
      {/* Photo URLs can come from storage providers unknown at build time. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="max-h-[75svh] w-full object-contain"
        onLoad={() => setIsLoading(false)}
        onError={() => setHasError(true)}
      />
    </div>
  );
}

export function PhotoViewer({
  src,
  alt,
  isPending = false,
  emptyDescription = 'No photo is available.',
}: PhotoViewerProps) {
  const safeSrc = getSafePhotoSource(src);

  if (isPending) {
    return (
      <Skeleton
        className="min-h-64 w-full rounded-lg"
        role="status"
        aria-label="Loading photo"
      />
    );
  }

  if (!safeSrc) {
    return <PhotoState description={emptyDescription} />;
  }

  return (
    <PhotoImage
      key={safeSrc}
      src={safeSrc}
      alt={alt}
    />
  );
}
