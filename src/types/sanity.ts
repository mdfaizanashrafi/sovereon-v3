/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Portable Text Block type definition.
 */
export interface PortableTextBlock {
  _key: string;
  _type: 'block' | 'image' | string;
  children?: Array<{
    _key: string;
    _type: 'span';
    text: string;
    marks?: string[];
  }>;
  markDefs?: Array<{
    _key: string;
    _type: string;
    [key: string]: any;
  }>;
  style?: string;
  listItem?: string;
  level?: number;
  [key: string]: any;
}

/**
 * Sanity Image Reference interface.
 */
export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
}

/**
 * FAQ Item schema representation.
 */
export interface FaqItem {
  _key: string;
  question: string;
  answer: string;
}

/**
 * Social Link representation.
 */
export interface SocialLink {
  _key: string;
  platform: 'github' | 'linkedin' | 'twitter' | 'facebook' | 'instagram' | 'youtube';
  url: string;
}

/**
 * Navigation Column / Link Group for footers.
 */
export interface FooterLinkGroup {
  _key: string;
  title: string;
  links: Array<{
    _key: string;
    label: string;
    url: string;
  }>;
}

/**
 * 1. Author Interface
 */
export interface SanityAuthor {
  _id: string;
  _type: 'author';
  name: string;
  slug: {
    _type: 'slug';
    current: string;
  };
  role?: string;
  photo?: SanityImage;
  bio?: PortableTextBlock[];
  github?: string;
  linkedin?: string;
  twitter?: string;
}

/**
 * 2. Category Interface
 */
export interface SanityCategory {
  _id: string;
  _type: 'category';
  name: string;
  slug: {
    _type: 'slug';
    current: string;
  };
  description?: string;
  seoTitle?: string;
  seoDescription?: string;
}

/**
 * 3. Blog Post Interface
 */
export interface SanityBlogPost {
  _id: string;
  _type: 'post';
  title: string;
  slug: {
    _type: 'slug';
    current: string;
  };
  excerpt?: string;
  body?: PortableTextBlock[];
  featuredImage?: SanityImage;
  featuredImageAlt?: string;
  author?: {
    _ref: string;
    _type: 'reference';
  } | SanityAuthor;
  category?: {
    _ref: string;
    _type: 'reference';
  } | SanityCategory;
  tags?: string[];
  publishedAt?: string;
  status: 'draft' | 'review' | 'published' | 'archived';
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: SanityImage;
  canonicalUrl?: string;
  faq?: FaqItem[];
  relatedPosts?: Array<{
    _ref: string;
    _type: 'reference';
  } | SanityBlogPost>;
  featured?: boolean;
  readingTime?: number;
}

/**
 * 4. Page Interface
 */
export interface SanityPage {
  _id: string;
  _type: 'page';
  title: string;
  slug: {
    _type: 'slug';
    current: string;
  };
  pageType: 'home' | 'philosophy' | 'solutions' | 'about' | 'contact';
  heroHeading?: string;
  heroSubheading?: string;
  body?: PortableTextBlock[];
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: SanityImage;
}

/**
 * 5. Navigation Item Interface
 */
export interface SanityNavigationItem {
  _id: string;
  _type: 'navigation';
  label: string;
  url: string;
  order: number;
}

/**
 * 6. Footer Interface
 */
export interface SanityFooterSettings {
  _id: string;
  _type: 'footer';
  companyDescription?: string;
  email?: string;
  phone?: string;
  socialLinks?: SocialLink[];
  linkGroups?: FooterLinkGroup[];
  copyright?: string;
}

/**
 * 7. Site Settings Interface
 */
export interface SanitySiteSettings {
  _id: string;
  _type: 'siteSettings';
  companyName: string;
  companyType?: string;
  tagline?: string;
  businessDescription?: string;
  phone?: string;
  email?: string;
  address?: string;
  country?: string;
  founderName?: string;
  founderRole?: string;
  founderPhoto?: SanityImage;
  github?: string;
  workingHours?: string;
  cloudinaryImageBaseUrl?: string;
}

/**
 * 8. SEO Defaults Interface
 */
export interface SanitySeoDefaults {
  _id: string;
  _type: 'seoDefaults';
  defaultTitle: string;
  defaultDescription: string;
  defaultOgImage?: SanityImage;
  robots?: 'index, follow' | 'noindex, nofollow' | string;
  twitterHandle?: string;
}
