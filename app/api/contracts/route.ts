import * as z from 'zod';

import { db } from '@/lib/db';
import { contractPostSchemaDatabase } from '@/lib/validations/contract';

export async function GET() {
  try {
    const contracts = await db.contract.findMany({
      select: {
        id: true,
        title: true,
        createdAt: true,
      },
    })

    return new Response(JSON.stringify(contracts))
  } catch (error) {
    return new Response(null, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    /* Maybe to be used at some point -> check Taxonomy

    If user is on a free plan.
    Check if user has reached limit of 3 posts.
    if (!subscriptionPlan?.isPro) {
      const count = await db.post.count({
        where: {
          authorId: user.id,
        },
      })

      if (count >= 3) {
        throw new RequiresProPlanError()
      }
    } */

    const json = await req.json()
    const body = contractPostSchemaDatabase.parse(json)

    const contract = await db.contract.create({
      data: {
        // Generate contract can be done only with title & digest
        id: body.id,
        title: body.title,
        digest: '',
        dataset: body.dataset,
        setPoint: body.setPoint,
        deviation: body.deviation,
        penalty: body.penalty,
        checkInterval: body.checkInterval,
      },
      select: {
        id: true,
      },
    })

    return new Response(JSON.stringify(contract))
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    // Handle errors here and return an appropriate response
    return new Response('POST', { status: 500 })
  }
}
