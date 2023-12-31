import { notFound, redirect } from 'next/navigation';

import { Editor } from '@/components/editor';
import { db } from '@/lib/db';
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

  console.log(contract)

  if (!contract) {
    notFound()
  }

  return (
    <Editor
      contract={{
        id: contract.id,
        title: contract.title,
        digest: contract.digest,
        input1: contract.input1,
        input2: contract.input2,
        input3: contract.input3,
      }}
    />
  )
}
