import LineChartEx from '@/components/chart/line-chart-ex';
import { DashboardHeader } from '@/components/dashboard-header';
import { DatasetCreateButton } from '@/components/dataset-create-button';
import { DatasetItem } from '@/components/dataset-item';
import { EmptyPlaceholder } from '@/components/empty-placeholder';
import { DashboardShell } from '@/components/shell';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { db } from '@/lib/db';

export const metadata = {
  title: 'Datasets',
}

interface DatasetValue {
  timestamp: string
  [key: string]: any // This allows any additional properties with string keys and any values
}

async function getNames() {
  return await db.dataset.findMany({
    distinct: ['name'],
    select: {
      name: true,
    },
  })
}

// get all entries with this name
async function getAllEntries(name: string) {
  return await db.dataset.findMany({
    where: {
      name: name,
    },
    orderBy: {
      timestamp: 'asc', // Order by timestamp in ascending order
    },
    select: {
      timestamp: true,
      value: true,
    },
  })
}

async function getDatasetValuesByTimestamp() {
  const distinctNames = await getNames()
  const uniqueDatasetNames = distinctNames.map((item) => item.name)

  const datasetValuesByTimestamp: DatasetValue[] = []

  for (const name of uniqueDatasetNames) {
    const entries = await getAllEntries(name)
    for (const entry of entries) {
      const timestamp = entry.timestamp.toISOString() // Convert timestamp to ISO string
      const existingEntry = datasetValuesByTimestamp.find((item) => item.timestamp === timestamp)
      if (!existingEntry) {
        const newEntry: {
          timestamp: string
          [key: string]: any // Allow any additional properties with string keys
        } = { timestamp }
        newEntry[name] = entry.value
        datasetValuesByTimestamp.push(newEntry)
      } else {
        existingEntry[name] = entry.value
      }
    }
  }

  return datasetValuesByTimestamp
}

export default async function IndexPage() {
  const distinctNames = await getNames()
  const uniqueDatasetNames = distinctNames.map((item) => item.name)

  // console.log(uniqueDatasetNames.length)

  // {
  //   xAxis: 'Mon',
  //   uk: 4000,
  //   us: 2400,
  // },

  // Example usage:
  const allData = await getDatasetValuesByTimestamp()
  // console.log(allData)

  // console.log(a)

  // uniqueDatasetNames.forEach(name => {
  //   const value = await getAllEntries(name)
  // });

  return (
    <DashboardShell>
      <DashboardHeader heading="Datasets" text="Manage datasets.">
        <DatasetCreateButton />
      </DashboardHeader>
      {uniqueDatasetNames.length > 0 ? <LineChartEx data={allData} names={uniqueDatasetNames} /> : <></>}
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
          <EmptyPlaceholder className="min-h-[200px]">
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
