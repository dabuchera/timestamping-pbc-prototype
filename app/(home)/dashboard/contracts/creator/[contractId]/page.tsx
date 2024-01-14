import { ContractCreator } from '@/components/contract-creator';

interface EditorPageProps {
  params: { contractId: string }
}

export default async function CreatorPage({ params }: EditorPageProps) {
  return <ContractCreator contractId={params.contractId} />
}
