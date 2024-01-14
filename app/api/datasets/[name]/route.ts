import * as z from 'zod';

import { db } from '@/lib/db';
import { contractPatchSchema } from '@/lib/validations/contract';

const routeContextSchema = z.object({
  params: z.object({
    name: z.string(),
  }),
})

export async function DELETE(req: Request, context: z.infer<typeof routeContextSchema>) {
  try {
    // Validate the route params.
    const { params } = routeContextSchema.parse(context)

    // Delete the post.
    await db.dataset.deleteMany({
      where: {
        name: params.name as string,
      },
    })

    return new Response(null, { status: 204 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}

// ************* Not used *************
// // Function to retrieve all entries with a specific name
// export async function GET(req: Request, context: z.infer<typeof routeContextSchema>) {
//   try {
//     // Validate route params.
//     const { params } = routeContextSchema.parse(context);

//     // Retrieve the entries by name.
//     const datasets = await db.dataset.findMany({
//       where: {
//         name: params.name as string,
//       },
//     });

//     if (datasets.length > 0) {
//       // At least one entry with the specified name exists
//       return new Response(JSON.stringify(datasets), { status: 200 });
//     } else {
//       // No entries with the specified name were found
//       return new Response(JSON.stringify([]), { status: 200 });
//     }
//   } catch (error) {
//     // Handle any errors
//     return new Response(null, { status: 500 });
//   }
// }


