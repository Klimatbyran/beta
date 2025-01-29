import { defineCollection, z } from 'astro:content'

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string(),
    authorImg: z.string(),
    date: z.string(),
  }),
})

const scope3CategorySchema = z.object({
  title: z.string(),
  description: z.string(),
})

const scope3CategoriesSchema = z.object({
  '1': scope3CategorySchema,
  '2': scope3CategorySchema,
  '3': scope3CategorySchema,
  '4': scope3CategorySchema,
  '5': scope3CategorySchema,
  '6': scope3CategorySchema,
  '7': scope3CategorySchema,
  '8': scope3CategorySchema,
  '9': scope3CategorySchema,
  '10': scope3CategorySchema,
  '11': scope3CategorySchema,
  '12': scope3CategorySchema,
  '13': scope3CategorySchema,
  '14': scope3CategorySchema,
  '15': scope3CategorySchema,
  '16': scope3CategorySchema,
})

export type Scope3CategoryStrings = z.infer<typeof scope3CategoriesSchema>

const contentStrings = defineCollection({
  type: 'data',
  schema: scope3CategoriesSchema,
})

export const collections = {
  blog,
  contentStrings,
}
