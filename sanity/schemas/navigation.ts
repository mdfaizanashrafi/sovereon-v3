import { defineType, defineField } from 'sanity';
import { MenuIcon } from '@sanity/icons';

export default defineType({
  name: 'navigation',
  title: 'Navigation Header Link',
  type: 'document',
  icon: MenuIcon,
  fields: [
    defineField({
      name: 'label',
      title: 'Link Label',
      type: 'string',
      validation: (Rule) => Rule.required().min(2).max(30),
    }),
    defineField({
      name: 'url',
      title: 'Destination URL Path',
      type: 'string',
      description: 'Relative (e.g., /solutions) or Absolute (e.g., https://...)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Sequence Order',
      type: 'number',
      description: 'Lower values appear first',
      initialValue: 0,
      validation: (Rule) => Rule.required().integer(),
    }),
  ],
  preview: {
    select: {
      title: 'label',
      subtitle: 'url',
      order: 'order',
    },
    prepare(selection) {
      const { title, subtitle, order } = selection;
      return {
        title: `${title} (Order: ${order})`,
        subtitle,
      };
    },
  },
});
