import { ContractCreateButton } from '@/components/contract-create-button';
import { ContractItem } from '@/components/contract-item';
import { DashboardHeader } from '@/components/dashboard-header';
import { EmptyPlaceholder } from '@/components/empty-placeholder';
import { DashboardShell } from '@/components/shell';
import { db } from '@/lib/db';

export const metadata = {
  title: 'Info',
}

export default async function IndexPage() {
//   const contracts = await db.contract.findMany({
//     select: {
//       id: true,
//       title: true,
//       timestamped: true,
//       createdAt: true,
//     },
//     orderBy: {
//       updatedAt: 'desc',
//     },
//   })

  return (
    <DashboardShell>
      <DashboardHeader heading="Info" text="This should describe some background stuff.">
        {/* <ContractCreateButton /> */}
      </DashboardHeader>
      {/* <div>
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
      </div> */}
    </DashboardShell>
  )
}
