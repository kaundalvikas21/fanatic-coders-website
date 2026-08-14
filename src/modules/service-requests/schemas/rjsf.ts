import type { RJSFSchema } from '@rjsf/utils';
import type { ServiceRequestTemplateField } from '@/modules/service-requests/config/templates';

function getFieldSchema(field: ServiceRequestTemplateField): RJSFSchema {
  const baseSchema: RJSFSchema = {
    title: field.label,
    description: field.description,
  };

  if (field.input === 'email') {
    return { ...baseSchema, type: 'string', format: 'email', minLength: field.required ? 1 : 0 };
  }

  if (field.input === 'url') {
    return { ...baseSchema, type: 'string', minLength: field.required ? 2 : 0 };
  }

  if (field.input === 'number') {
    return { ...baseSchema, type: 'number' };
  }

  if (field.input === 'tags') {
    return {
      ...baseSchema,
      type: 'array',
      items: { type: 'string', minLength: 1 },
      default: [],
    };
  }

  if (field.input === 'multi-select') {
    return {
      ...baseSchema,
      type: 'array',
      items: {
        type: 'string',
        enum: field.options?.map((option) => String(option.value)) ?? [],
      },
      uniqueItems: true,
      minItems: field.required ? 1 : 0,
      default: [],
    };
  }

  if (field.input === 'select') {
    return {
      ...baseSchema,
      type: 'string',
      enum: field.options?.map((option) => String(option.value)) ?? [],
      enumNames: field.options?.map((option) => option.label),
    };
  }

  return {
    ...baseSchema,
    type: 'string',
    minLength: field.required ? (field.input === 'textarea' ? 10 : 2) : 0,
    maxLength: field.input === 'textarea' ? 2000 : 255,
  };
}

export function getServiceRequestStepJsonSchema(
  fields: readonly ServiceRequestTemplateField[],
  title: string,
): RJSFSchema {
  return {
    type: 'object',
    title,
    required: fields.filter((field) => field.required).map((field) => field.name),
    properties: Object.fromEntries(fields.map((field) => [field.name, getFieldSchema(field)])),
  };
}
