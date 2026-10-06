import type { JSONContent } from '@tiptap/core';
import type { TiptapDocument } from '@/types';

function nodeText(node: JSONContent): string {
  return [node.text ?? '', ...(node.content ?? []).map(nodeText)].join(' ');
}

export function getBlogReadTime(content: TiptapDocument): string {
  const wordCount = ((content.content ?? []) as JSONContent[])
    .map(nodeText)
    .join(' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return `${Math.max(1, Math.ceil(wordCount / 200))} min`;
}
