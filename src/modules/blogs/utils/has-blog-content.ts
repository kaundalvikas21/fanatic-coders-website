export function hasBlogContent(value: unknown): boolean {
  if (typeof value !== 'object' || value === null) return false;

  const node = value as { text?: unknown; content?: unknown };
  if (typeof node.text === 'string' && node.text.trim().length > 0) return true;

  return Array.isArray(node.content) && node.content.some(hasBlogContent);
}
