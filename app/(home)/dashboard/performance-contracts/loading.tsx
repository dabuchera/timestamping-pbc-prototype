import { DashboardHeader } from '@/components/dashboard-header';
import { ContractCreateButton } from '@/components/contract-create-button';
import { ContractItem } from '@/components/contract-item';
import { DashboardShell } from '@/components/shell';

export default function Loading() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Contracts" text="Create and manage contracts.">
        <ContractCreateButton />
      </DashboardHeader>
      <div className="divide-border-200 divide-y rounded-md border">
        <ContractItem.Skeleton />
        <ContractItem.Skeleton />
        <ContractItem.Skeleton />
        <ContractItem.Skeleton />
        <ContractItem.Skeleton />
      </div>
    </DashboardShell>
  )
}
