import { CollectionConfig } from 'payload/types'

export const Bookings: CollectionConfig = {
  slug: 'bookings',
  admin: {
    useAsTitle: 'id',
    defaultColumns: ['customer', 'service', 'scheduledDate', 'status'],
  },
  fields: [
    {
      name: 'customer',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'service',
      type: 'relationship',
      relationTo: 'services',
      required: true,
    },
    {
      name: 'scheduledDate',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        {
          label: 'Pending',
          value: 'pending',
        },
        {
          label: 'Confirmed',
          value: 'confirmed',
        },
        {
          label: 'In Progress',
          value: 'in-progress',
        },
        {
          label: 'Completed',
          value: 'completed',
        },
        {
          label: 'Cancelled',
          value: 'cancelled',
        },
      ],
      defaultValue: 'pending',
      required: true,
    },
    {
      name: 'vehicleInfo',
      type: 'group',
      fields: [
        {
          name: 'make',
          type: 'text',
          required: true,
        },
        {
          name: 'model',
          type: 'text',
          required: true,
        },
        {
          name: 'year',
          type: 'number',
          required: true,
          min: 1900,
          max: new Date().getFullYear() + 1,
        },
        {
          name: 'licensePlate',
          type: 'text',
        },
      ],
    },
    {
      name: 'notes',
      type: 'textarea',
    },
    {
      name: 'totalPrice',
      type: 'number',
      min: 0,
    },
  ],
}