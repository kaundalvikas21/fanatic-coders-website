'use client';

import { toast } from 'sonner';
import { FileCard } from '@/components/shared/media/FileCard';
import { ImageCard } from '@/components/shared/media/ImageCard';
import { MediaCardFooter } from '@/components/shared/media/MediaCardFooter';
import { deleteTaskMedia } from '@/modules/tasks/data/media';
import { useTaskPermissions } from '@/modules/tasks/hooks/use-task-permissions';
import type { Media } from '@/types';

type TaskAttachmentsPanelProps = {
  projectId: string;
  taskId: string;
  attachments: Media[];
};

function getDownloadHref(href: string, resourceType: Media['resourceType']) {
  const uploadSegment = `/${resourceType}/upload/`;
  return href.replace(uploadSegment, `${uploadSegment}fl_attachment/`);
}

export function TaskAttachmentsPanel({
  projectId,
  taskId,
  attachments,
}: TaskAttachmentsPanelProps) {
  const { canUpdate } = useTaskPermissions();

  async function handleDelete(mediaId: string) {
    const response = await deleteTaskMedia(projectId, taskId, mediaId);
    if (!response.success) {
      toast.error(response.message || 'Could not delete attachment.');
      throw new Error(response.message || 'Could not delete attachment.');
    }
    toast.success('Task attachment deleted.');
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(9rem,10rem))] gap-3">
      {attachments.map((item) => {
        const footer = (
          <MediaCardFooter
            title={item.resourceType === 'image' ? 'Task image' : 'Task document'}
            fileType={item.resourceType === 'image' ? 'Image' : 'PDF'}
            viewHref={
              item.resourceType === 'image'
                ? `/dashboard/photo?${new URLSearchParams({ src: item.secureUrl, alt: 'Task image' }).toString()}`
                : undefined
            }
            openLabel={item.resourceType === 'image' ? 'Open task image' : undefined}
            downloadHref={getDownloadHref(item.secureUrl, item.resourceType)}
            deleteDescription="This attachment will be permanently removed from the task."
            onDelete={canUpdate ? () => handleDelete(item.id) : undefined}
          />
        );

        return item.resourceType === 'image' ? (
          <ImageCard
            key={item.id}
            src={item.secureUrl}
            alt="Task attachment"
            footer={footer}
          />
        ) : (
          <FileCard
            key={item.id}
            footer={footer}
          />
        );
      })}
    </div>
  );
}
