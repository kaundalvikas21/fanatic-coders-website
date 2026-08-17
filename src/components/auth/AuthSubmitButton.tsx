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
      className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-[10px] bg-cyan-300 px-4 text-sm font-bold text-slate-950 transition duration-150 hover:bg-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 focus-visible:ring-offset-3 focus-visible:ring-offset-[#080810] active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60"
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
