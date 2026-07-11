import type { UiSchema } from '@rjsf/utils';
import type { ServiceRequestTemplateField } from '@/modules/service-requests/config/templates';

function getFieldUiSchema(field: ServiceRequestTemplateField): UiSchema {
  const uiSchema: UiSchema = {
    'ui:placeholder': field.placeholder,
  };

  if (field.input === 'textarea') {
    uiSchema['ui:widget'] = 'textarea';
    uiSchema['ui:options'] = { rows: 4, layout: 'wide' };
  }

  if (field.input === 'tags') {
    uiSchema.items = {
      'ui:placeholder': field.placeholder,
    };
    uiSchema['ui:options'] = {
      addable: true,
      orderable: false,
      removable: true,
      layout: 'wide',
    };
  }

  if (field.input === 'multi-select') {
    uiSchema['ui:widget'] = 'checkboxes';
    uiSchema['ui:options'] = { layout: 'wide' };
  }

  return uiSchema;
}

export function getServiceRequestStepUiSchema(
  fields: readonly ServiceRequestTemplateField[],
): UiSchema {
  return Object.fromEntries(fields.map((field) => [field.name, getFieldUiSchema(field)]));
}
