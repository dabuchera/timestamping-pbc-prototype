import * as z from 'zod';

// *************** Create contract Database Schema ***************
export const contractPostSchemaDatabase = z.object({
  id: z.string(),
  title: z.string().min(3).max(128),
  digest: z.string().optional(),
  dataset: z.string(),
  setPoint: z.number(),
  deviation: z.number().gte(0).lte(100),
  penalty: z.number(),
  checkInterval: z.string(),
})

// *************** Create & Update contract Form Schema & Database Update Schema ***************
export const contractPatchSchema = z.object({
  title: z.string().min(3).max(128),
  digest: z.string().optional(),
  dataset: z.string(),
  setPoint: z.number(),
  deviation: z.number().gte(0).lte(100),
  penalty: z.number(),
  checkInterval: z.string(),

  // TODO: Type this properly from editorjs block types?
  // content: z.any().optional(),
})

// *************** Create dataset Database Schema ***************
export const datasetPostSchemaDatabase = z.object({
  name: z.string(),
  value: z.number(),
  timestamp: z.string().transform((str) => new Date(str)),
})


