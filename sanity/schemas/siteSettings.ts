import { defineType, defineField } from 'sanity';
import { CogIcon } from '@sanity/icons';

export default defineType({
  name: 'siteSettings',
  title: 'Company & Site Settings',
  type: 'document',
  icon: CogIcon,
  groups: [
    { name: 'general', title: 'Branding & Identity', default: true },
    { name: 'contact', title: 'Contact Details' },
    { name: 'founder', title: 'Founder Information' },
    { name: 'integrations', title: 'Integrations & External' },
  ],
  fields: [
    // --- BRANDING & IDENTITY ---
    defineField({
      name: 'companyName',
      title: 'Company Name',
      type: 'string',
      group: 'general',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'companyType',
      title: 'Company Corporate Form',
      type: 'string',
      description: 'e.g., LLP, LLC, Private Limited',
      group: 'general',
    }),
    defineField({
      name: 'tagline',
      title: 'Main Tagline',
      type: 'string',
      group: 'general',
    }),
    defineField({
      name: 'businessDescription',
      title: 'Primary Business Description',
      type: 'text',
      group: 'general',
      rows: 4,
    }),

    // --- CONTACT DETAILS ---
    defineField({
      name: 'phone',
      title: 'Business Phone Number',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'email',
      title: 'Business Primary Email',
      type: 'string',
      group: 'contact',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'address',
      title: 'HQ Physical Address',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'country',
      title: 'Country of Registration',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'workingHours',
      title: 'System Operational Hours',
      type: 'string',
      description: 'e.g., Mon - Fri: 09:00 - 18:00 UTC',
      group: 'contact',
    }),

    // --- FOUNDER DETAILS ---
    defineField({
      name: 'founderName',
      title: 'Founder Name',
      type: 'string',
      group: 'founder',
    }),
    defineField({
      name: 'founderRole',
      title: 'Founder Executive Role',
      type: 'string',
      group: 'founder',
    }),
    defineField({
      name: 'founderPhoto',
      title: 'Founder Portrait Image',
      type: 'image',
      group: 'founder',
      options: { hotspot: true },
    }),
    defineField({
      name: 'github',
      title: 'Founder Personal GitHub',
      type: 'url',
      group: 'founder',
    }),

    // --- INTEGRATIONS ---
    defineField({
      name: 'cloudinaryImageBaseUrl',
      title: 'Cloudinary Image Base URL',
      type: 'url',
      group: 'integrations',
      description: 'Cloudinary CDN base delivery path for images',
    }),
  ],
  preview: {
    select: {
      title: 'companyName',
      subtitle: 'tagline',
    },
    prepare(selection) {
      const { title, subtitle } = selection;
      return {
        title: title || 'Site Settings',
        subtitle: subtitle || 'Configure company identities and business operations',
      };
    },
  },
});
