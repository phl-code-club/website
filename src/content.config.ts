
// 1. Import utilities from `astro:content`
import { defineCollection, reference } from 'astro:content';

// 2. Import loader(s)
import { glob } from 'astro/loaders';

// 3. Import Zod
import { z } from 'astro/zod';

// 4. Define your collection(s)
const blog = defineCollection({
  loader: glob({ pattern: "**/*.md(x)", base: "./src/blog" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    pubDate: z.coerce.date(),
    author: reference("organizers"),
    tags: z.array(z.string()).optional()
  })
});

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
export const collections = { blog, organizers };
