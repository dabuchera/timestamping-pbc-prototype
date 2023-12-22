import * as z from 'zod';

// Except titel you can input whatever you want, at the beginning set with ""
export const contractPatchSchema = z.object({
  title: z.string().min(3).max(128),
  digest: z.string().optional(),
  input1: z.string().optional(),
  input2: z.string().optional(),
  input3: z.string().optional(),

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
