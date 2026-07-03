/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { createClient } from '@sanity/client';

// Configure the Sanity client with environment variable support and correct fallbacks
export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || '4q6e8p6c',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION || '2026-07-03',
  useCdn: true,
});

// TypeScript type interface for a basic Sanity Post as requested
export interface SanityPost {
  _id: string;
  title: string;
  slug: string;
}

/**
 * Fetches all posts from Sanity using the requested query format.
 */
export async function fetchAllPosts(): Promise<SanityPost[]> {
  const query = `*[_type == "post"]{
    _id,
    title,
    "slug": slug.current
  }`;
  return await sanityClient.fetch<SanityPost[]>(query);
}
