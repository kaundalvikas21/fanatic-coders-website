'use client';

import { Plus, Trash2 } from 'lucide-react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import type { TaskFormInput } from '@/modules/tasks/schemas/task';

export function TaskCreateAddOnFields() {
  const form = useFormContext<TaskFormInput>();
  const addOnTasks = useFieldArray({
    control: form.control,
    name: 'addOnTasks',
  });
  const isSubmitting = form.formState.isSubmitting;

  return (
    <Field>
      <div className="flex items-center justify-between gap-3">
        <div>
          <FieldLabel>Add-ons</FieldLabel>
          <p className="mt-1 text-sm text-muted-foreground">
            Add smaller checklist items for this task.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={isSubmitting || addOnTasks.fields.length >= 5}
          onClick={() => addOnTasks.append({ name: '' })}
        >
          <Plus data-icon="inline-start" />
          Add item
        </Button>
      </div>

      <div className="mt-3 space-y-2">
        {addOnTasks.fields.map((addOn, index) => {
          const error = form.formState.errors.addOnTasks?.[index]?.name;

          return (
            <div
              key={addOn.id}
              className="flex items-start gap-2"
            >
              <div className="min-w-0 flex-1">
                <Input
                  aria-label={`Add-on item ${index + 1}`}
                  placeholder="Add checklist item"
                  disabled={isSubmitting}
                  aria-invalid={Boolean(error)}
                  {...form.register(`addOnTasks.${index}.name`)}
                />
                {error && <FieldError errors={[error]} />}
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label={`Remove add-on item ${index + 1}`}
                disabled={isSubmitting}
                onClick={() => addOnTasks.remove(index)}
              >
                <Trash2 aria-hidden="true" />
              </Button>
            </div>
          );
        })}
      </div>
    </Field>
  );
}
