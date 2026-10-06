import type { JSONContent } from '@tiptap/core';
import type { TiptapDocument } from '@/types';

function nodeText(node: JSONContent): string {
  return [node.text ?? '', ...(node.content ?? []).map(nodeText)].join('');
}

export function getBlogHeadings(content: TiptapDocument) {
  return ((content.content ?? []) as JSONContent[])
    .filter((node) => node.type === 'heading')
    .map((node, index) => ({
      id: `blog-heading-${index}`,
      label: nodeText(node).trim() || 'Untitled section',
    }));
}
