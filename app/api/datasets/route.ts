import * as z from 'zod';

import { db } from '@/lib/db';
import { datasetPostSchemaDatabase } from '@/lib/validations/contract';

export async function GET() {
  try {
    const contracts = await db.dataset.findMany({
      select: {
        id: true,
        name: true,
        value: true,
        timestamp: true,
      },
    })

    return new Response(JSON.stringify(contracts))
  } catch (error) {
    return new Response(null, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const json = await req.json()
    const body = datasetPostSchemaDatabase.parse(json)

    const dataset = await db.dataset.create({
      data: {
        // Generate contract can be done only with title & digest
        name: body.name,
        value: body.value,
        timestamp: body.timestamp,
      },
      select: {
        id: true,
        name: true,
      },
    })

    return new Response(JSON.stringify(dataset))
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Log the Zod validation issues
      console.error('Zod validation issues:', error.issues);
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    // Handle errors here and return an appropriate response
    return new Response('POST', { status: 500 })
  }
}
