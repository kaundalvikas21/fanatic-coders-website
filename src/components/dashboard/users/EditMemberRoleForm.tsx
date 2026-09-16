'use client';

import { useState, type FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { LoaderCircle, Save } from 'lucide-react';
import { useSWRConfig } from 'swr';
import { toast } from 'sonner';
import { useActionDialog } from '@/components/shared/action-dialog';
import { useOrganizationMemberOptions } from '@/hooks/useOrganizationMemberOptions';
import { SelectField } from '@/components/shared/forms/SelectField';
import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field';
import { authClient } from '@/lib/auth/client';
import { getFcopOrganizationId } from '@/lib/auth/organization-client';
import { USER_ROLE_OPTIONS } from '@/lib/auth/roles';

type UpdateMemberRoleBody = Parameters<typeof authClient.organization.updateMemberRole>[0];

export function EditMemberRoleForm({ memberId }: { memberId?: string }) {
  const { close } = useActionDialog();
  const params = useParams<{ id?: string }>();
  const id = memberId ?? params.id;
  const {
    memberOptions,
    isLoading,
    error: loadError,
    data,
    mutate: reload,
  } = useOrganizationMemberOptions([], id);
  const member = memberOptions.find((option) => option.value === id);
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const [selectedRole, setRole] = useState<string>();
  const role = selectedRole ?? member?.role ?? '';
  const canSave =
    role !== member?.role && USER_ROLE_OPTIONS.some((option) => option.value === role);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string>();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending || !member || !canSave) return;
    setPending(true);
    setError(undefined);

    try {
      const organizationId = await getFcopOrganizationId();
      if (!organizationId) {
        setError('Could not find the workspace. Refresh and try again.');
        return;
      }
      const result = await authClient.organization.updateMemberRole({
        memberId: member.value,
        organizationId,
        role: role as UpdateMemberRoleBody['role'],
      });
      if (result.error) {
        setError(result.error.message || 'Could not update role.');
        return;
      }

      // Refresh role-filtered assignment pickers and server-rendered access details.
      void mutate(
        (key) => typeof key === 'string' && key.startsWith('/api/organization/members/options'),
      ).catch(() => undefined);
      toast.success('Member role updated.');
      close();
      router.refresh();
    } catch {
      setError('Request failed. Refresh before retrying.');
    } finally {
      setPending(false);
    }
  }

  if (isLoading)
    return (
      <p
        className="text-sm text-muted-foreground"
        role="status"
      >
        Loading member...
      </p>
    );
  if (loadError || !data?.success || !member) {
    return (
      <div className="space-y-4">
        <p
          role="alert"
          className="text-sm text-destructive"
        >
          Could not load this member.
        </p>
        <Button
          variant="outline"
          onClick={() => void reload().catch(() => undefined)}
        >
          Try again
        </Button>
      </div>
    );
  }

  return (
    <form
      className="grid gap-5"
      onSubmit={handleSubmit}
      aria-busy={pending}
    >
      <Field data-invalid={Boolean(error)}>
        <FieldLabel htmlFor="edit-member-role">Organization role</FieldLabel>
        <SelectField
          id="edit-member-role"
          value={role}
          options={USER_ROLE_OPTIONS}
          disabled={pending}
          onChange={(value) => {
            setRole(value);
            setError(undefined);
          }}
          error={error}
        />
        <FieldDescription>
          This role determines workspace permissions for {member.name}.
        </FieldDescription>
        {error && <FieldError errors={[{ message: error }]} />}
      </Field>
      <div className="flex justify-end gap-2 border-t pt-5">
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={close}
          disabled={pending}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          size="lg"
          disabled={pending || !canSave}
        >
          {pending ? (
            <LoaderCircle className="animate-spin motion-reduce:animate-none" />
          ) : (
            <Save data-icon="inline-start" />
          )}
          {pending ? 'Saving...' : 'Save role'}
        </Button>
      </div>
    </form>
  );
}
