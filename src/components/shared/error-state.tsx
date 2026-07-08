import type { LucideIcon } from 'lucide-react';
import { XCircle } from 'lucide-react';

type ErrorStateProps = {
  title: string;
  message?: string;
  Icon?: LucideIcon;
};

export function ErrorState({ title, message, Icon = XCircle }: ErrorStateProps) {
  return (
    <section className="flex items-start gap-3 rounded-lg border px-4 py-5 text-sm">
      <Icon className="mt-0.5 size-4 text-destructive" />
      <div>
        <p className="font-medium">{title}</p>
        {message && <p className="mt-1 text-muted-foreground">{message}</p>}
      </div>
    </section>
  );
}
