import { db } from '@/lib/db';

export async function GET() {
  try {
    const distinctNames = await db.dataset.findMany({
      distinct: ['name'],
      select: {
        name: true,
      },
    });

    const uniqueNames = distinctNames.map((item) => item.name);

    return new Response(JSON.stringify(uniqueNames));
  } catch (error) {
    return new Response(null, { status: 500 });
  }
}
