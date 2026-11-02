import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      order: z.number(),
      status: z.enum(['live', 'code', 'research']),
      problem: z.string(),
      role: z.string().optional(),
      credit: z.string(),
      stack: z.array(z.string()),
      limitations: z.array(z.string()),
      repo: z.url().optional(),
      demo: z.url().optional(),
      paper: z.url().optional(),
      linksNote: z.string().optional(),
      diagram: z.boolean().default(false),
      screenshots: z.array(z.object({ src: image(), alt: z.string() })).default([]),
    }),
});

const notes = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, notes };
