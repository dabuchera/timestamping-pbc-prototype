import { DashboardHeader } from '@/components/dashboard-header';
import { EmptyPlaceholder } from '@/components/empty-placeholder';
import { ResultContractItem } from '@/components/result-contract-item';
import { DashboardShell } from '@/components/shell';
import { db } from '@/lib/db';

export const metadata = {
  title: 'Results',
}

async function getContracts() {
  return await db.contract.findMany({
    select: {
      id: true,
      title: true,
      digest: true,
      dataset: true,
      payoutAddress: true,
      checkInterval: true,
      reward: true,
      setPoint: true,
      deviation: true,
      threshold: true,
      penalty: true,
      createdAt: true,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  })
}

export default async function IndexPage() {
  const contracts = await getContracts()

  return (
    <DashboardShell>
      <DashboardHeader heading="Results" text="This one shows the results.">
        {/* <ContractCreateButton /> */}
      </DashboardHeader>
      <div>
        {contracts?.length ? (
          <div className="divide-y divide-border rounded-md border">
            {contracts.map((contract) => (
              <ResultContractItem key={contract.id} contract={contract} />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>No contracts created</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>You don&apos;t have any contracts yet.</EmptyPlaceholder.Description>
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  )
}
