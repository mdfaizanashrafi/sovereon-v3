import { defineType, defineField } from 'sanity';
import { SearchIcon } from '@sanity/icons';

export default defineType({
  name: 'seoDefaults',
  title: 'SEO Defaults Engine',
  type: 'document',
  icon: SearchIcon,
  fields: [
    defineField({
      name: 'defaultTitle',
      title: 'Default Page Title Prefix',
      type: 'string',
      description: 'Used when pages do not define custom meta titles.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'defaultDescription',
      title: 'Default Meta Description',
      type: 'text',
      rows: 3,
      description: 'Used for search engines index fallback.',
      validation: (Rule) => Rule.required().max(160),
    }),
    defineField({
      name: 'defaultOgImage',
      title: 'Default Social Share Image (OG)',
      type: 'image',
      description: 'Standard card shared on messaging pipelines and feed platforms.',
    }),
    defineField({
      name: 'robots',
      title: 'Robots Directives Header',
      type: 'string',
      description: 'e.g., index, follow or noindex, nofollow',
      options: {
        list: [
          { title: 'index, follow (Standard Indexing)', value: 'index, follow' },
          { title: 'noindex, nofollow (Private Server)', value: 'noindex, nofollow' },
          { title: 'index, nofollow', value: 'index, nofollow' },
          { title: 'noindex, follow', value: 'noindex, follow' },
        ],
      },
      initialValue: 'index, follow',
    }),
    defineField({
      name: 'twitterHandle',
      title: 'Company Twitter/X Handle',
      type: 'string',
      description: 'Include the @ symbol, e.g., @sovereon',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'SEO Global Default Standards',
        subtitle: 'Configure robots.txt, default cards and meta titles',
      };
    },
  },
});
