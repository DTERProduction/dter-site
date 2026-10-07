import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const faq = z.array(z.object({ q: z.string(), a: z.string() })).default([]);
const titled = z.array(z.object({ title: z.string(), text: z.string() })).default([]);

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    client: z.string(),
    categories: z.array(z.enum(['evenement', 'brand-content', 'corporate', 'social', 'influence', 'temoignage'])).min(1),
    vimeoId: z.coerce.string().optional(),
    thumb: z.string().optional(),
    vertical: z.boolean().default(false),
    featured: z.boolean().default(false),
    order: z.number().default(100),
    summary: z.string().optional(),
    year: z.coerce.string().optional(),
    partner: z.string().optional(),
    deliveredIn: z.string().optional(),
    objectiveTitle: z.string().optional(),
    objective: z.string().optional(),
    answerTitle: z.string().optional(),
    answer: z.string().optional(),
    resultTitle: z.string().optional(),
    result: z.string().optional(),
    stats: z.array(z.object({ value: z.string(), label: z.string() })).default([]),
    quote: z.string().optional(),
    quoteFrom: z.string().optional(),
    videos: z.array(z.object({ title: z.string(), vimeoId: z.coerce.string(), thumb: z.string().optional(), vertical: z.boolean().default(false) })).default([]),
    draft: z.boolean().default(false),
  }),
});

const services = defineCollection({
  loader: glob({ pattern: '**/*.yml', base: './src/content/services' }),
  schema: z.object({
    name: z.string(),
    order: z.number().default(100),
    title: z.string(),
    seoDescription: z.string(),
    lead: z.string(),
    short: z.string(),
    tags: z.array(z.string()).default([]),
    vimeoId: z.coerce.string().optional(),
    usesTitle: z.string(),
    uses: titled,
    included: z.array(z.string()).default([]),
    categories: z.array(z.string()).default([]),
    projectsTitle: z.string().optional(),
    priceTitle: z.string(),
    priceFrom: z.string().optional(),
    priceNote: z.string().optional(),
    faqTitle: z.string(),
    faq,
  }),
});

const landings = defineCollection({
  loader: glob({ pattern: '**/*.yml', base: './src/content/landings' }),
  schema: z.object({
    seoTitle: z.string(),
    eyebrow: z.string(),
    title: z.string(),
    lead: z.string(),
    bullets: z.array(z.string()).default([]),
    vimeoId: z.coerce.string().optional(),
    heroProject: z.string().optional(),
    formTitle: z.string(),
    dateLabel: z.string(),
    messageLabel: z.string(),
    clientsLabel: z.string(),
    clients: z.array(z.string()).default([]),
    deliverTitle: z.string(),
    deliverables: titled,
    examplesTitle: z.string(),
    examples: z.array(z.string()).default([]),
    faqTitle: z.string(),
    faq,
    ctaTitle: z.string(),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({ title: z.string(), description: z.string().optional(), updated: z.string().optional() }),
});

const photos = defineCollection({
  loader: glob({ pattern: '**/*.yml', base: './src/content/photos' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      client: z.string().optional(),
      category: z.string().optional(),
      order: z.number().default(100),
      photos: z
        .array(z.object({ image: image(), alt: z.string().optional(), featured: z.boolean().default(false) }))
        .default([]),
    }),
});

export const collections = { projects, services, landings, pages, photos };
