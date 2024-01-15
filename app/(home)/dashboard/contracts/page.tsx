import { ContractCreateButton } from '@/components/contract-create-button';
import { ContractItem } from '@/components/contract-item';
import { DashboardHeader } from '@/components/dashboard-header';
import { EmptyPlaceholder } from '@/components/empty-placeholder';
import { DashboardShell } from '@/components/shell';
import { TestingButton } from '@/components/testing-button';
import { db } from '@/lib/db';

export const metadata = {
  title: 'Contracts',
}

async function getContracts() {
  return await db.contract.findMany({
    select: {
      id: true,
      title: true,
      digest: true,
      dataset: true,
      setPoint: true,
      deviation: true,
      penalty: true,
      checkInterval: true,
      createdAt: true,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  })
}

export default async function IndexPage() {
  console.log('IndexPage')

  // const contracts = await getContracts()
  const contracts = await db.contract.findMany({
    select: {
      id: true,
      title: true,
      digest: true,
      dataset: true,
      setPoint: true,
      deviation: true,
      penalty: true,
      checkInterval: true,
      createdAt: true,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  })
  
  console.log(contracts)

  return (
    <DashboardShell>
      <DashboardHeader heading="Contracts" text="Create and manage contracts.">
        {/* Test Button */}
        <TestingButton text={'Test'} output1={'Button Clicked!'} output2={contracts} output3={undefined}></TestingButton>
        <ContractCreateButton />
      </DashboardHeader>
      <div>
        {contracts?.length ? (
          <div className="divide-y divide-border rounded-md border">
            {contracts.map((contract) => (
              <ContractItem key={contract.id} contract={contract} />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>No contracts created</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>You don&apos;t have any contracts yet.</EmptyPlaceholder.Description>
            <ContractCreateButton variant="outline" />
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  )
}
