'use client';

import { toast } from 'sonner';
import { useActionDialog } from '@/components/shared/action-dialog';
import { uploadProjectMedia } from '@/modules/projects/data/media';
import { FileUploader } from '@/modules/uploads';
import type { Media } from '@/types';

type ProjectMediaDialogProps = {
  projectId: string;
};

export function ProjectMediaUploader({ projectId }: ProjectMediaDialogProps) {
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
        const response = await uploadProjectMedia(projectId, formData);

        if (!response.success || !response.data) {
          throw new Error(response.message || 'Could not upload project media.');
        }

        return response.data;
      }}
      onUploadSuccess={() => {
        toast.success('Project media uploaded.');
        dialog.close();
      }}
    />
  );
}
