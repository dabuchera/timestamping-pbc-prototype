import { ContractCreator } from '@/components/contract-creator';
import { db } from '@/lib/db';

interface EditorPageProps {
  params: { contractId: string }
}

async function getNames() {
  return await db.dataset.findMany({
    distinct: ['name'],
    select: {
      name: true,
    },
  })
}

export default async function CreatorPage({ params }: EditorPageProps) {
  const distinctDatasets = await getNames()
  const uniqueDatasetNames = distinctDatasets.map((item) => item.name)
  
  return <ContractCreator contractId={params.contractId} uniqueDatasetNames={uniqueDatasetNames} />
}
