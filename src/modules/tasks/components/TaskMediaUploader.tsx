'use client';

import { toast } from 'sonner';
import { useActionDialog } from '@/components/shared/action-dialog';
import { FileUploader } from '@/modules/uploads';
import { uploadTaskMedia } from '@/modules/tasks/data/media';
import type { Media } from '@/types';

type TaskMediaUploaderProps = {
  projectId: string;
  taskId: string;
};

export function TaskMediaUploader({ projectId, taskId }: TaskMediaUploaderProps) {
  const dialog = useActionDialog();

  return (
    <FileUploader<Media>
      accept={{
        'application/pdf': ['.pdf'],
        'image/gif': ['.gif'],
        'image/jpeg': ['.jpg', '.jpeg'],
        'image/png': ['.png'],
        'image/webp': ['.webp'],
      }}
      label="Drop an image or PDF here, or click to browse"
      maxSizeBytes={5 * 1024 * 1024}
      name="media"
      onUpload={async (file) => {
        const formData = new FormData();
        formData.append('media', file);
        const response = await uploadTaskMedia(projectId, taskId, formData);

        if (!response.success || !response.data) {
          throw new Error(response.message || 'Could not upload task attachment.');
        }

        return response.data;
      }}
      onUploadSuccess={() => {
        toast.success('Task attachment uploaded.');
        dialog.close();
      }}
    />
  );
}
