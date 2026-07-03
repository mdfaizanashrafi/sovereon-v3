import { defineType, defineField } from 'sanity';
import { CircleIcon } from '@sanity/icons';

export default defineType({
  name: 'footer',
  title: 'Footer Settings',
  type: 'document',
  icon: CircleIcon,
  fields: [
    defineField({
      name: 'companyDescription',
      title: 'Company Brief Description',
      type: 'text',
      rows: 3,
      description: 'Appears in the first column of the footer.',
    }),
    defineField({
      name: 'email',
      title: 'Contact Email Address',
      type: 'string',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'phone',
      title: 'Contact Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Platform Connections',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  { title: 'GitHub', value: 'github' },
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'Twitter / X', value: 'twitter' },
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'YouTube', value: 'youtube' },
                ],
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'url',
              title: 'Platform Profile URL',
              type: 'url',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'linkGroups',
      title: 'Footer Link Directories',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Group Title', type: 'string', validation: (Rule) => Rule.required() },
            {
              name: 'links',
              title: 'Links',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required() },
                    { name: 'url', title: 'URL Path', type: 'string', validation: (Rule) => Rule.required() },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'copyright',
      title: 'Copyright String Override',
      type: 'string',
      description: 'e.g., © 2026 Sovereon LLP. All rights reserved.',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Global Footer Settings',
        subtitle: 'Configure footer branding and directory links',
      };
    },
  },
});
