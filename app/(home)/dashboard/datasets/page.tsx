import { Legend, XAxis, YAxis } from 'recharts';

import LineChartEx from '@/components/chart/line-chart-ex';
import { ContractCreateButton } from '@/components/contract-create-button';
import { ContractItem } from '@/components/contract-item';
import { DashboardHeader } from '@/components/dashboard-header';
import { EmptyPlaceholder } from '@/components/empty-placeholder';
import { DashboardShell } from '@/components/shell';
import { db } from '@/lib/db';

export const metadata = {
  title: 'Datasets',
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
      <DashboardHeader heading="Datasets" text="Manage datasets.">
        {/* <ContractCreateButton /> */}
      </DashboardHeader>
      {/* add here the selected dataset */}
      <LineChartEx/>
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
