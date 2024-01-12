import * as z from 'zod';

// Generate contract can be done only with title
// Fact until now only created with all
// *************** Create empty contract ***************
export const contractPostSchema = z.object({
  title: z.string(),
  digest: z.string()
})

// Except titel you can input whatever you want, at the beginning set with ""
// *************** Update contract ***************
export const contractPatchSchema = z.object({
  title: z.string().min(3).max(128),
  digest: z.string().optional(),
  dataset: z.string().optional(),
  setPoint: z.number().optional(),
  deviation: z.number().gte(0).lte(100).optional(),
  penalty: z.number().optional(),
  checkInterval: z.string().optional(),

  // TODO: Type this properly from editorjs block types?
  // content: z.any().optional(),
})


