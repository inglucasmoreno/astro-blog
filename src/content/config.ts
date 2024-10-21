import { defineCollection, reference, z } from "astro:content";


const blogCollections = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    date: z.date(),
    description: z.string(),
    image: image().refine((img) => img.width < 1200, {
      message: 'La imagen debe tener un ancho mayor a 5000px',
    }),

    // Relacion
    // author: z.string(),
    author: reference('author'),

    // Relacion
    tags: z.array(z.string()),

    // Boolean
    isDraft: z.boolean().default(false),
  })
})


const authorCollections = defineCollection({
  type: 'data',
  schema: ({ image }) => z.object({
    name: z.string(),
    avatar: image(),
    twitter: z.string(),
    linkedIn: z.string(),
    github: z.string(),
    bio: z.string(),
    subtitle: z.string(),
  })
})

export const collections = {
  blog: blogCollections,
  author: authorCollections,
};