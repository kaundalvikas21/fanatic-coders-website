import { isValidElement } from 'react';
import type {
  FormContextType,
  ObjectFieldTemplateProps,
  RJSFSchema,
  StrictRJSFSchema,
} from '@rjsf/utils';

import { cn } from '@/lib/utils';

function isWideField(element: ObjectFieldTemplateProps['properties'][number]) {
  if (!isValidElement<{ uiSchema?: RJSFSchema }>(element.content)) {
    return false;
  }

  const uiOptions = element.content.props.uiSchema?.['ui:options'] as
    | { layout?: 'wide' | 'compact' }
    | undefined;

  return uiOptions?.layout === 'wide';
}

export function ServiceRequestObjectFieldTemplate<
  T = unknown,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = never,
>({ properties }: ObjectFieldTemplateProps<T, S, F>) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {properties.map((element) => (
        <div
          key={element.name}
          className={cn(element.hidden && 'hidden', isWideField(element) && 'md:col-span-2')}
        >
          {element.content}
        </div>
      ))}
    </div>
  );
}
