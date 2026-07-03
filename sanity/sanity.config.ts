import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';

export default defineConfig({
  name: 'sovereon-production',
  title: 'Sovereon Content Suite',

  // Project ID & Dataset configuration matching Sovereon's official setup
  projectId: '4q6e8p6c',
  dataset: 'production',

  plugins: [
    structureTool({
      // We can define custom layout desks here in the future
    }),
    visionTool(), // Included for direct GROQ execution & debugging in the studio panel
  ],

  schema: {
    types: schemaTypes,
  },
});
