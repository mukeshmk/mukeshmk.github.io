import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

/**
 * Content model for the site.
 *
 * - Long-form content (blog posts, project case studies) uses the `glob`
 *   loader over Markdown files.
 * - Structured list data (experience, education, skills, certifications,
 *   stats) lives in JSON files loaded with the `file` loader, so each entry is
 *   still validated against a Zod schema and fully typed.
 *
 * `src/data/profile.json` is a single object, so it's imported directly where
 * needed rather than modelled as a collection.
 *
 * The `file` loader resolves paths relative to the project root and requires
 * every array item to carry a unique `id`. An `order` field gives us
 * deterministic sorting since collection order isn't otherwise guaranteed.
 */

const blog = defineCollection({
  // Content Layer glob loader: Markdown/MDX files in src/content/blog.
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  // One Markdown file per project deep dive in src/content/projects.
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tech: z.array(z.string()).default([]),
    links: z
      .object({
        github: z.string().url().optional(),
        live: z.string().url().optional(),
        paper: z.string().optional(),
      })
      .default({}),
    // Featured projects get emphasised styling and sort first.
    featured: z.boolean().default(false),
    // Lower `order` sorts first within the same featured group.
    order: z.number().default(999),
    year: z.string().optional(),
    // Drafts render only in `astro dev`, never in production builds.
    draft: z.boolean().default(false),
  }),
});

const experience = defineCollection({
  loader: file('src/data/experience.json'),
  schema: z.object({
    id: z.string(),
    order: z.number(),
    title: z.string(),
    company: z.string(),
    location: z.string(),
    period: z.string(),
    current: z.boolean().default(false),
    summary: z.string(),
    highlights: z.array(z.string()).default([]),
  }),
});

const education = defineCollection({
  loader: file('src/data/education.json'),
  schema: z.object({
    id: z.string(),
    order: z.number(),
    degree: z.string(),
    school: z.string(),
    location: z.string(),
    period: z.string(),
    detail: z.string().optional(),
  }),
});

const skills = defineCollection({
  loader: file('src/data/skills.json'),
  schema: z.object({
    id: z.string(),
    order: z.number(),
    title: z.string(),
    skills: z.array(z.string()),
  }),
});

const certifications = defineCollection({
  loader: file('src/data/certifications.json'),
  schema: z.object({
    id: z.string(),
    order: z.number(),
    name: z.string(),
    issuer: z.string(),
    year: z.string().optional(),
    // Public verification / badge URL.
    link: z.string().url().optional(),
    // Root-relative path to the certificate PDF in /public.
    file: z.string().optional(),
  }),
});

const stats = defineCollection({
  loader: file('src/data/stats.json'),
  schema: z.object({
    id: z.string(),
    order: z.number(),
    value: z.string(),
    label: z.string(),
  }),
});

export const collections = {
  blog,
  projects,
  experience,
  education,
  skills,
  certifications,
  stats,
};
