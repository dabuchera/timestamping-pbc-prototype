import { notFound } from 'next/navigation';

import { ContractEditor } from '@/components/contract-editor';
import { db } from '@/lib/db';
import { getNames } from '@/lib/queries';
import { Contract } from '@prisma/client';

async function getContractForUser(contractId: Contract['id']) {
  return await db.contract.findFirst({
    where: {
      id: contractId,
    },
  })
}

interface EditorPageProps {
  params: { contractId: string }
}

export default async function EditorPage({ params }: EditorPageProps) {
  const contract = await getContractForUser(params.contractId)

  const distinctDatasets = await getNames()
  const uniqueDatasetNames = distinctDatasets.map((item) => item.name)

  if (!contract) {
    notFound()
  }

  return (
    <ContractEditor
      contract={{
        id: contract.id,
        title: contract.title,
        digest: contract.digest,
        dataset: contract.dataset,
        payoutAddress: contract.payoutAddress,
        checkInterval: contract.checkInterval,
        reward: contract.reward,
        setPoint: contract.setPoint,
        deviation: contract.deviation,
        threshold: contract.threshold,
        penalty: contract.penalty,
      }}
      uniqueDatasetNames={uniqueDatasetNames}
    />
  )
}
