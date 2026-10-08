'use client';

import { toast } from 'sonner';
import { FileUploader } from '@/modules/uploads';
import {
  deletePortfolioCoverImageById,
  uploadPortfolioCoverImageById,
} from '@/modules/portfolios/data/media';
import type { Portfolio } from '@/types';

type PortfolioCoverImageUploaderProps = {
  portfolio?: Portfolio;
  disabled?: boolean;
  pendingFile: File | null;
  onChange: (portfolio: Portfolio) => void;
  onStage: (file: File | null) => void;
};

export function PortfolioCoverImageUploader({
  portfolio,
  disabled,
  pendingFile,
  onChange,
  onStage,
}: PortfolioCoverImageUploaderProps) {
  return (
    <FileUploader<Portfolio | null>
      accept={{
        'image/jpeg': ['.jpg', '.jpeg'],
        'image/png': ['.png'],
        'image/webp': ['.webp'],
      }}
      currentUrl={portfolio?.imageUrl}
      disabled={disabled}
      label="Drop a cover image here or click to browse"
      maxSizeBytes={5 * 1024 * 1024}
      name="image"
      onUpload={async (file) => {
        if (!portfolio) {
          onStage(file);
          return null;
        }

        const formData = new FormData();
        formData.append('image', file);
        const response = await uploadPortfolioCoverImageById(portfolio.id, formData);
        if (!response.success || !response.data) {
          throw new Error(response.message || 'Could not upload cover image.');
        }
        return response.data as Portfolio;
      }}
      onUploadSuccess={(updatedPortfolio) => {
        if (!updatedPortfolio) return;
        onStage(null);
        onChange(updatedPortfolio);
        toast.success('Cover image updated.');
      }}
      onRemove={async () => {
        if (pendingFile && !portfolio?.imageUrl) {
          onStage(null);
          return;
        }
        if (!portfolio?.imageUrl) return;

        const response = await deletePortfolioCoverImageById(portfolio.id);
        if (!response.success || !response.data) {
          throw new Error(response.message || 'Could not remove cover image.');
        }
        onStage(null);
        onChange(response.data as Portfolio);
        toast.success('Cover image removed.');
      }}
    />
  );
}
