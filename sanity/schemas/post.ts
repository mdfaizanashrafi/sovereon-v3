import { defineType, defineField } from 'sanity';
import { DocumentTextIcon } from '@sanity/icons';

export default defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  icon: DocumentTextIcon,
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'meta', title: 'References & Meta' },
    { name: 'seo', title: 'SEO & Socials' },
  ],
  fields: [
    // --- CONTENT GROUP ---
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required().min(5).max(100),
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
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      group: 'content',
      rows: 3,
      description: 'A brief summary of the article for blog cards.',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'body',
      title: 'Body Content',
      type: 'array',
      group: 'content',
      description: 'Write the main body using the visual editor.',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
              description: 'Important for SEO & accessibility',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      group: 'content',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'featuredImageAlt',
      title: 'Featured Image Alt Text',
      type: 'string',
      group: 'content',
      description: 'Describe the image for search engine indexing.',
      validation: (Rule) => Rule.required(),
    }),

    // --- META GROUP ---
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
      group: 'meta',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      group: 'meta',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'meta',
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      group: 'meta',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      group: 'meta',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'In Review', value: 'review' },
          { title: 'Published', value: 'published' },
          { title: 'Archived', value: 'archived' },
        ],
        layout: 'radio',
      },
      initialValue: 'draft',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured Post',
      type: 'boolean',
      group: 'meta',
      description: 'Pin this post to the top of the feed',
      initialValue: false,
    }),
    defineField({
      name: 'readingTime',
      title: 'Reading Time (Minutes)',
      type: 'number',
      group: 'meta',
      description: 'Estimated reading time, e.g., 5',
    }),
    defineField({
      name: 'relatedPosts',
      title: 'Related Posts',
      type: 'array',
      group: 'meta',
      of: [{ type: 'reference', to: [{ type: 'post' }] }],
    }),

    // --- SEO GROUP ---
    defineField({
      name: 'seoTitle',
      title: 'SEO Title Override',
      type: 'string',
      group: 'seo',
      description: 'Optimal size: 50-60 characters',
      validation: (Rule) => Rule.max(70),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Meta Description',
      type: 'text',
      group: 'seo',
      rows: 2,
      description: 'Optimal size: 120-160 characters',
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image Override',
      type: 'image',
      group: 'seo',
      description: 'Recommended dimension: 1200 x 630 pixels',
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
      group: 'seo',
      description: 'Full canonical link for indexing control',
    }),
    defineField({
      name: 'faq',
      title: 'FAQ Schema Accordion',
      type: 'array',
      group: 'seo',
      description: 'Insert Q&A blocks to inject FAQPage schema markup into the HTML header',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'question', type: 'string', title: 'Question', validation: (Rule) => Rule.required() },
            { name: 'answer', type: 'text', title: 'Answer', rows: 3, validation: (Rule) => Rule.required() },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'featuredImage',
      status: 'status',
    },
    prepare(selection) {
      const { title, author, media, status } = selection;
      return {
        title,
        subtitle: `${author ? `by ${author}` : 'No Author'} [Status: ${status?.toUpperCase() || 'DRAFT'}]`,
        media,
      };
    },
  },
});
