import { DashboardHeader } from '@/components/dashboard-header';
import { DatasetCreateButton } from '@/components/dataset-create-button';
import { DatasetItem } from '@/components/dataset-item';
import { DashboardShell } from '@/components/shell';

export default function Loading() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Contracts" text="Create and manage contracts.">
        <DatasetCreateButton />
      </DashboardHeader>
      <div className="divide-border-200 divide-y rounded-md border">
        <DatasetItem.Skeleton />
        <DatasetItem.Skeleton />
        <DatasetItem.Skeleton />
        <DatasetItem.Skeleton />
        <DatasetItem.Skeleton />
      </div>
    </DashboardShell>
  )
}
