
// 1. Import utilities from `astro:content`
import { defineCollection, reference } from 'astro:content';

// 2. Import loader(s)
import { glob } from 'astro/loaders';

// 3. Import Zod
import { z } from 'astro/zod';
import { rssSchema } from '@astrojs/rss';

// 4. Define your collection(s)
const blog = defineCollection({
  loader: glob({ pattern: "**/*.md(x)", base: "./src/blog" }),
  schema: rssSchema.omit({ title: true, author: true, pubDate: true, }).extend({
    title: z.string(),
    author: reference("organizers"),
    pubDate: z.coerce.date()
  })
});

const external_blogs = defineCollection({
  loader: glob({ pattern: "*.json", base: "./src/blog/external" }),
  schema: z.object({
    name: z.string(),
    feedURL: z.string().url(),
    author: reference("organizers").optional()
  })
})

const organizers = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/organizers" }),
  schema: ({ image }) => z.object({
    name: z.string(),
    bio: z.string(),
    likes: z.array(z.string()),
    dislikes: z.array(z.string()),
    title: z.string(),
    photo: image(),
    emoticon: z.string(),
    email: z.string().email(),
    links: z.record(z.string(), z.object({
      icon: z.string().emoji(),
      url: z.string().url(),
    })),
  })
});

// 5. Export a single `collections` object to register your collection(s)
export const collections = { blog, organizers, external_blogs };
