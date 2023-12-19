import Link from 'next/link';

import { ContractOperations } from '@/components/contract-operations';
import { Skeleton } from '@/components/ui/skeleton';
import { formatDate } from '@/lib/utils';
import { Contract } from '@prisma/client';

interface ContractItemProps {
  contract: Pick<Contract, "id" | "title" | "timestamped" | "createdAt">
}

export function ContractItem({ contract }: ContractItemProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <Link
          href={`/dashboard/contracts/editor/${contract.id}`}
          className="font-semibold hover:underline"
        >
          {contract.title}
        </Link>
        <div>
          <p className="text-sm text-muted-foreground">
            {formatDate(contract.createdAt?.toDateString())}
          </p>
        </div>
      </div>
      <ContractOperations contract={{ id: contract.id, title: contract.title }} />
    </div>
  )
}

ContractItem.Skeleton = function PostItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  )
}
