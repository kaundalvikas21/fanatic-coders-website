import { Loader2 } from 'lucide-react';

type AuthSubmitButtonProps = {
  label: string;
  pendingLabel: string;
  isPending: boolean;
  disabled?: boolean;
};

// Dumb auth action button: parent owns auth state, this only renders the visual state.
export function AuthSubmitButton({
  label,
  pendingLabel,
  isPending,
  disabled = false,
}: AuthSubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={disabled || isPending}
      className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-cyan-300 px-4 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isPending ? (
        <>
          <Loader2 className="size-4 animate-spin" />
          {pendingLabel}
        </>
      ) : (
        label
      )}
    </button>
  );
}
