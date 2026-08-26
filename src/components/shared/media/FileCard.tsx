import Image from 'next/image';
import type { ReactNode } from 'react';

import { Card } from '@/components/ui/card';

type FileCardProps = {
  footer: ReactNode;
};

export function FileCard({ footer }: FileCardProps) {
  return (
    <Card
      size="sm"
      className="group aspect-square min-w-0 border border-foreground/15 bg-card/80 py-0 ring-0 transition-[transform,border-color,background-color] duration-200 ease-out hover:-translate-y-0.5 hover:border-primary/40 hover:bg-muted/30 motion-reduce:transform-none motion-reduce:transition-none"
    >
      <div className="flex size-full flex-col overflow-hidden rounded-lg bg-muted/30">
        <div className="relative min-h-0 flex-1">
          <Image
            src="/pdf.png"
            alt=""
            fill
            sizes="(max-width: 1024px) 50vw, 160px"
            className="object-contain p-5 transition-transform duration-200 ease-out group-hover:scale-[1.03] motion-reduce:transform-none motion-reduce:transition-none"
            aria-hidden="true"
          />
        </div>

        {footer}
      </div>
    </Card>
  );
}
