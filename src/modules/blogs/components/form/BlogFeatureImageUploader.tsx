'use client';

import { toast } from 'sonner';

import { FileUploader } from '@/modules/uploads';
import { deleteBlogFeatureImageById, uploadBlogFeatureImageById } from '@/modules/blogs/data/media';
import type { Blog, UpdateBlogFeatureImageByIdRequest } from '@/types';

type BlogFeatureImageUploaderProps = {
  blog?: Blog;
  disabled?: boolean;
  pendingFile: File | null;
  onChange: (blog: Blog) => void;
  onStage: (file: File | null) => void;
};

export function BlogFeatureImageUploader({
  blog,
  disabled,
  pendingFile,
  onChange,
  onStage,
}: BlogFeatureImageUploaderProps) {
  return (
    <FileUploader<Blog | null>
      accept={{
        'image/jpeg': ['.jpg', '.jpeg'],
        'image/png': ['.png'],
        'image/webp': ['.webp'],
      }}
      currentUrl={blog?.featureImage}
      disabled={disabled}
      label="Drop a feature image here or click to browse"
      maxSizeBytes={5 * 1024 * 1024}
      name="image"
      onUpload={async (file) => {
        if (!blog) {
          onStage(file);
          return null;
        }

        const formData = new FormData();
        formData.append('image' satisfies keyof UpdateBlogFeatureImageByIdRequest, file);
        const response = await uploadBlogFeatureImageById(blog.id, formData);

        if (!response.success || !response.data) {
          throw new Error(response.message || 'Could not upload feature image.');
        }

        return response.data as Blog;
      }}
      onUploadSuccess={(updatedBlog) => {
        if (!updatedBlog) return;
        onStage(null);
        onChange(updatedBlog);
        toast.success('Feature image updated.');
      }}
      onRemove={async () => {
        if (pendingFile && !blog?.featureImage) {
          onStage(null);
          return;
        }
        if (!blog?.featureImage) return;

        const response = await deleteBlogFeatureImageById(blog.id);
        if (!response.success || !response.data) {
          throw new Error(response.message || 'Could not remove feature image.');
        }

        onStage(null);
        onChange(response.data as Blog);
        toast.success('Feature image removed.');
      }}
    />
  );
}
