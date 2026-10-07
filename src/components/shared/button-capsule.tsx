import { cn } from '@/lib/utils';

type CapsuleButtonProps = {
  name: string;
  kind: 'category' | 'tag';
  className?: string;
};

export function CapsuleButton({ name, kind, className }: CapsuleButtonProps) {
  return (
    <span
      className={cn(
        'inline-flex min-h-9 items-center rounded-full border px-4 py-2 font-mono text-xs leading-none tracking-[0.03em] whitespace-nowrap',
        kind === 'category'
          ? 'border-violet-400/45 bg-violet-500/15 text-violet-100 shadow-[0_4px_18px_rgb(112_67_219_/_0.12)]'
          : 'border-white/12 bg-white/5 text-blue-100/75',
        className,
      )}
    >
      {kind === 'tag' ? `#${name.replace(/^#+/, '')}` : name}
    </span>
  );
}
