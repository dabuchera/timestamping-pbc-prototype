import Link from 'next/link';

import { ContractOperations } from '@/components/contract-operations';
import { Skeleton } from '@/components/ui/skeleton';
import {
    isDigestAnchored, isDigestAnchorPending, isDigestWaitingAnchoring
} from '@/helpers/dcrtime';
import { cn, formatDate } from '@/lib/utils';
import { Contract } from '@prisma/client';

import { Icons } from './icons';

interface ContractItemProps {
  contract: Pick<Contract, 'id' | 'title' | 'timestamped' | 'createdAt'>
}

const getStatus = (digest: any): string => {
  if (isDigestAnchored(digest)) {
    return 'Timestamped'
  }
  if (isDigestWaitingAnchoring(digest)) {
    return 'Awaiting Anchoring Time'
  }
  if (isDigestAnchorPending(digest)) {
    return 'Pending'
  }
  return 'Not Found'
}

export function ContractItem({ contract }: ContractItemProps) {
  // const status = getStatus(contract.digest)

  let testDigest =  {digest: "bdf6bc93bfdaaa44b3753351d10d2be6a59002cedb2809c3ffec62ca700a7df0", result: 1}

  const status = getStatus(testDigest)
  
  console.log(status)

  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center gap-20">
        <div className="grid gap-1">
          <Link href={`/dashboard/contracts/editor/${contract.id}`} className="font-semibold hover:underline">
            {contract.title}
          </Link>
          <div>
            <p className="text-sm text-muted-foreground">{formatDate(contract.createdAt?.toDateString())}</p>
          </div>
        </div>
        <Link href={contract.timestamped ? '/add Here timestamp link' : ''}>
          <span
            className={cn(
              'group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:text-accent-foreground',
              contract.timestamped ? 'hover:bg-accent' : 'cursor-default'
            )}
          >
            {/* {contract.timestamped? <Icons.timestamped className="mr-2 h-4 w-4" />
                :<Icons.nottimestamped className="mr-2 h-4 w-4" />
                } */}
            {status === 'Timestamped' && <Icons.timestamped className="mr-2 h-4 w-4" />}
            {status === 'Awaiting Anchoring Time' && <Icons.spinner className="animate-spin mr-2 h-4 w-4" />}
            {status === 'Pending' && <Icons.loader className="animate-spin mr-2 h-4 w-4" />}
            {status === 'Not Found' && <Icons.nottimestamped className="mr-2 h-4 w-4" />}
            {/* Other content */}
            <span>{status}</span>
          </span>
        </Link>
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
