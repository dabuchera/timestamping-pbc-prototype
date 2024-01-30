import LineChartEx from '@/components/chart/line-chart-ex';
import { DashboardHeader } from '@/components/dashboard-header';
import { DatasetCreateButton } from '@/components/dataset-create-button';
import { DatasetItem } from '@/components/dataset-item';
import { EmptyPlaceholder } from '@/components/empty-placeholder';
import { DashboardShell } from '@/components/shell';
import { TestingButton } from '@/components/testing-button';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { db } from '@/lib/db';
import { getAllEntriesUnix, getAllEntriesWithName, getNames } from '@/lib/queries';

export const metadata = {
  title: 'Datasets',
}

// https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-nd-revalidating#fetching-data-on-the-server-with-third-party-libraries
// https://vercel.com/docs/infrastructure/data-cache
// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
export const revalidate = 0

export default async function IndexPage() {
  const distinctNames = await getNames()
  const uniqueDatasetNames = distinctNames.map((item) => item.name)

  // const allData = await getDatasetValuesByTimestamp(uniqueDatasetNames)
  const allData = await getAllEntriesUnix()


  console.log(allData.length)

  return (
    <DashboardShell>
      <DashboardHeader heading="Datasets" text="Manage datasets.">
        {/* Test Button */}
        {/* <TestingButton text={'Test'} output1={'Button Clicked!'} output2={allData} output3={undefined}></TestingButton> */}
        <DatasetCreateButton disabled={true} />
      </DashboardHeader>
      <LineChartEx data={allData} names={uniqueDatasetNames} />
      <div>
        {uniqueDatasetNames?.length ? (
          <ScrollArea className="h-52">
            <div className="divide-y divide-border rounded-md border">
              {uniqueDatasetNames.map((name) => (
                <DatasetItem key={name} name={name} />
              ))}
            </div>
          </ScrollArea>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="data" />
            <EmptyPlaceholder.Title>No datasets created</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>You don&apos;t have any datasets yet.</EmptyPlaceholder.Description>
            {/* <ContractCreateButton variant="outline" /> */}
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  )
}
