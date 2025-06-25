import { CollectionConfig } from 'payload/types'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'price', 'duration'],
  },
  access: {
    read: () => true, // Public read access
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      options: [
        {
          label: 'Oil Change',
          value: 'oil-change',
        },
        {
          label: 'Brake Service',
          value: 'brake-service',
        },
        {
          label: 'Tire Service',
          value: 'tire-service',
        },
        {
          label: 'Engine Diagnostics',
          value: 'engine-diagnostics',
        },
        {
          label: 'General Maintenance',
          value: 'general-maintenance',
        },
      ],
      required: true,
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      min: 0,
    },
    {
      name: 'duration',
      type: 'number',
      required: true,
      min: 15,
      admin: {
        description: 'Duration in minutes',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}