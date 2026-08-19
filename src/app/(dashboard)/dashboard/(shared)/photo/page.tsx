import { ImageIcon } from 'lucide-react';

import { PhotoViewer } from '@/components/dashboard/dialog/photo/PhotoViewer';
import { WidgetCard } from '@/components/shared/widget-card';

type PhotoPageProps = {
  searchParams: Promise<{
    src?: string | string[];
    alt?: string | string[];
  }>;
};

function getFirstValue(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function PhotoPage({ searchParams }: PhotoPageProps) {
  const params = await searchParams;
  const src = getFirstValue(params.src);
  const alt = getFirstValue(params.alt) || 'Photo';

  return (
    <WidgetCard
      icon={ImageIcon}
      title={alt}
      description="Full-size photo."
      className="w-full max-w-5xl"
    >
      <PhotoViewer
        src={src}
        alt={alt}
      />
    </WidgetCard>
  );
}
