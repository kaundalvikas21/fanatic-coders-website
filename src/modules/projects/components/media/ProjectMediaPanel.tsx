'use client';

import { Images, Plus } from 'lucide-react';
import { toast } from 'sonner';

import { ActionDialog } from '@/components/shared/action-dialog';
import { WidgetCard } from '@/components/shared/widget-card';
import { Button } from '@/components/ui/button';
import { deleteProjectMedia } from '@/modules/projects/data/media';
import { useProjectPermissions } from '@/modules/projects/hooks/use-project-permissions';
import type { Media } from '@/types';
import { FileCard } from './FileCard';
import { ImageCard } from './ImageCard';
import { MediaCardFooter } from './MediaCardFooter';
import { ProjectMediaUploader } from './ProjectMediaUploader';

type ProjectMediaPanelProps = {
  projectId: string;
  media: Media[];
};

function getDownloadHref(href: string, resourceType: Media['resourceType']) {
  const uploadSegment = `/${resourceType}/upload/`;
  return href.replace(uploadSegment, `${uploadSegment}fl_attachment/`);
}

export function ProjectMediaPanel({ projectId, media = [] }: ProjectMediaPanelProps) {
  const { canUpdate } = useProjectPermissions();

  async function handleDelete(mediaId: string) {
    const response = await deleteProjectMedia(projectId, mediaId);

    if (!response.success) {
      toast.error(response.message || 'Could not delete media.');
      throw new Error(response.message || 'Could not delete media.');
    }

    toast.success('Media deleted.');
  }

  return (
    <WidgetCard
      icon={Images}
      title="Project media"
      description="Images and PDFs attached to this project."
      titleClassName="text-xl font-semibold"
      actionSlot={
        canUpdate ? (
          <ActionDialog
            title="Upload media"
            description="Add one image or PDF to this project."
            contentClassName="sm:max-w-lg"
            trigger={
              <Button type="button">
                <Plus data-icon="inline-start" />
                Add media
              </Button>
            }
          >
            <ProjectMediaUploader projectId={projectId} />
          </ActionDialog>
        ) : undefined
      }
    >
      {media.length ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(9rem,10rem))] gap-3">
          {media.map((item) =>
            item.resourceType === 'image' ? (
              <ImageCard
                key={item.id}
                src={item.secureUrl}
                alt="Project image"
                footer={
                  <MediaCardFooter
                    title="Project image"
                    fileType="Image"
                    viewHref={`/dashboard/photo?${new URLSearchParams({ src: item.secureUrl, alt: 'Project image' }).toString()}`}
                    downloadHref={getDownloadHref(item.secureUrl, item.resourceType)}
                    openLabel="Open project image"
                    onDelete={canUpdate ? () => handleDelete(item.id) : undefined}
                  />
                }
              />
            ) : (
              <FileCard
                key={item.id}
                footer={
                  <MediaCardFooter
                    title="Project document"
                    fileType="PDF"
                    downloadHref={getDownloadHref(item.secureUrl, item.resourceType)}
                    onDelete={canUpdate ? () => handleDelete(item.id) : undefined}
                  />
                }
              />
            ),
          )}
        </div>
      ) : (
        <div className="rounded-lg bg-muted/40 px-4 py-5 text-center">
          <p className="text-sm font-medium">No media yet</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Use Add media above to attach an image or PDF.
          </p>
        </div>
      )}
    </WidgetCard>
  );
}
