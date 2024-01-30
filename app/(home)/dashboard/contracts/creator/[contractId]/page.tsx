import { ContractCreator } from '@/components/contract-creator';
import { db } from '@/lib/db';
import { getNames } from '@/lib/queries';

interface EditorPageProps {
  params: { contractId: string }
}

export default async function CreatorPage({ params }: EditorPageProps) {
  const distinctDatasets = await getNames()
  const uniqueDatasetNames = distinctDatasets.map((item) => item.name)
  
  return <ContractCreator contractId={params.contractId} uniqueDatasetNames={uniqueDatasetNames} />
}
