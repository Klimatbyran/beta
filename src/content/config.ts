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
  '1_purchasedGoods': scope3CategorySchema,
  '2_capitalGoods': scope3CategorySchema,
  '3_fuelAndEnergyRelatedActivities': scope3CategorySchema,
  '4_upstreamTransportationAndDistribution': scope3CategorySchema,
  '5_wasteGeneratedInOperations': scope3CategorySchema,
  '6_businessTravel': scope3CategorySchema,
  '7_employeeCommuting': scope3CategorySchema,
  '8_upstreamLeasedAssets': scope3CategorySchema,
  '9_downstreamTransportationAndDistribution': scope3CategorySchema,
  '10_processingOfSoldProducts': scope3CategorySchema,
  '11_useOfSoldProducts': scope3CategorySchema,
  '12_endOfLifeTreatmentOfSoldProducts': scope3CategorySchema,
  '13_downstreamLeasedAssets': scope3CategorySchema,
  '14_franchises': scope3CategorySchema,
  '15_investments': scope3CategorySchema,
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
