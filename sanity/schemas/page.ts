import { defineType, defineField } from 'sanity';
import { BookIcon } from '@sanity/icons';

export default defineType({
  name: 'page',
  title: 'Page Manager',
  type: 'document',
  icon: BookIcon,
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'seo', title: 'SEO & Meta' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pageType',
      title: 'System Node Page',
      type: 'string',
      group: 'content',
      description: 'Which core route does this document govern?',
      options: {
        list: [
          { title: 'Home', value: 'home' },
          { title: 'Philosophy', value: 'philosophy' },
          { title: 'Solutions', value: 'solutions' },
          { title: 'About Us', value: 'about' },
          { title: 'Contact', value: 'contact' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroHeading',
      title: 'Hero Heading Override',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'heroSubheading',
      title: 'Hero Subheading / Tagline',
      type: 'text',
      rows: 2,
      group: 'content',
    }),
    defineField({
      name: 'body',
      title: 'Body Rich Content',
      type: 'array',
      group: 'content',
      of: [{ type: 'block' }],
    }),

    // --- SEO ---
    defineField({
      name: 'seoTitle',
      title: 'SEO Page Title',
      type: 'string',
      group: 'seo',
      validation: (Rule) => Rule.max(70),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Page Description',
      type: 'text',
      group: 'seo',
      rows: 3,
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image Override',
      type: 'image',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      pageType: 'pageType',
      slug: 'slug.current',
    },
    prepare(selection) {
      const { title, pageType, slug } = selection;
      return {
        title,
        subtitle: `Node: /${slug || ''} [Type: ${pageType?.toUpperCase() || 'UNSET'}]`,
      };
    },
  },
});
