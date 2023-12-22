import * as z from 'zod';

export const contractPatchSchema = z.object({
  title: z.string().min(3).max(128),
  digest: z.string(),
  input1: z.string(),
  input2: z.string(),
  input3: z.string(),

  // TODO: Type this properly from editorjs block types?
  // content: z.any().optional(),
})

// Generate contract can be done only with title
// Fact until now only created with all
export const contractPostSchema = z.object({
  title: z.string(),
  digest: z.string().optional(),
  input1: z.string().optional(),
  input2: z.string().optional(),
  input3: z.string().optional(),
})
