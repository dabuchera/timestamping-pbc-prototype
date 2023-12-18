import { DashboardHeader } from '@/components/dashboard-header'
import { EmptyPlaceholder } from '@/components/empty-placeholder'
import { ContractCreateButton } from '@/components/contract-create-button'
import { ContractItem } from '@/components/contract-item'
import { DashboardShell } from '@/components/shell'
import { db } from '@/lib/db'

export const metadata = {
  title: 'Dashboard',
}

export default function IndexPage() {

  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text="This is the main dashboard site.">
      </DashboardHeader>
      <div>
        <h2>Write some description of the process here</h2>
      </div>
    </DashboardShell>
  )
}
