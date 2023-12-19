import * as z from 'zod';

import { db } from '@/lib/db';

const postCreateSchema = z.object({
  title: z.string(),
  content: z.string().optional(),
})

export async function GET() {
  try {
    const posts = await db.contract.findMany({
      select: {
        id: true,
        title: true,
        timestamped: true,
        createdAt: true,
      },
    })

    return new Response(JSON.stringify(posts))
  } catch (error) {
    return new Response(null, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    // Maybe to be used at some point -> check Taxonomy

    // If user is on a free plan.
    // Check if user has reached limit of 3 posts.
    // if (!subscriptionPlan?.isPro) {
    //   const count = await db.post.count({
    //     where: {
    //       authorId: user.id,
    //     },
    //   })

    //   if (count >= 3) {
    //     throw new RequiresProPlanError()
    //   }
    // }

    const json = await req.json()
    const body = postCreateSchema.parse(json)

    const post = await db.contract.create({
      data: {
        title: body.title,
        content: body.content,
      },
      select: {
        id: true,
      },
    })

    return new Response(JSON.stringify(post))
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}
