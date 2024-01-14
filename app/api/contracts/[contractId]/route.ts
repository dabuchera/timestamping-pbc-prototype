import * as z from 'zod';

import { db } from '@/lib/db';
import { contractPatchSchema } from '@/lib/validations/contract';

const routeContextSchema = z.object({
  params: z.object({
    contractId: z.string(),
  }),
})

export async function DELETE(req: Request, context: z.infer<typeof routeContextSchema>) {
  try {
    // Validate the route params.
    const { params } = routeContextSchema.parse(context)

    // Delete the post.
    await db.contract.delete({
      where: {
        id: params.contractId as string,
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

// Update
export async function PATCH(req: Request, context: z.infer<typeof routeContextSchema>) {
  try {
    // Validate route params.
    const { params } = routeContextSchema.parse(context)

    // Get the request body and validate it.
    const json = await req.json()
    console.log(json)

    const body = contractPatchSchema.parse(json)

    console.log("patch")
    console.log(body)

    // Update the post.
    // TODO: Implement sanitization for content.
    await db.contract.update({
      where: {
        id: params.contractId,
      },
      data: {
        title: body.title,
        digest: body.digest,
        dataset: body.dataset,
        setPoint: body.setPoint,
        deviation: body.deviation,
        penalty: body.penalty,
        checkInterval: body.checkInterval,
      },
    })

    return new Response(null, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log("Validation Error:", error.issues); // Log the validation issues
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}

// Function to retrieve a specific contract by ID
export async function GET(req: Request, context: z.infer<typeof routeContextSchema>) {
  try {
    // Validate route params.
    const { params } = routeContextSchema.parse(context);

    // Retrieve the contract by ID.
    const contract = await db.contract.findFirst({
      where: {
        id: params.contractId,
      },
    });

    if (contract) {
      // Contract exists
      return new Response(JSON.stringify(true), { status: 200 });
    } else {
      // Contract does not exist
      return new Response(JSON.stringify(false), { status: 200 });
    }
  } catch (error) {
    // Handle any errors
    return new Response(null, { status: 500 });
  }
}

