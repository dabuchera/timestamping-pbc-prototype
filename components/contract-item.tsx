import Link from 'next/link';
import { useEffect, useState } from 'react';

import { ContractOperations } from '@/components/contract-operations';
import { Skeleton } from '@/components/ui/skeleton';
import {
    handleVerify, isDigestAnchored, isDigestAnchorPending, isDigestWaitingAnchoring
} from '@/helpers/dcrtime';
import { cn, formatDate, getStatus } from '@/lib/utils';
import { Digest } from '@/types';
import { Contract } from '@prisma/client';

import { ContractStatus } from './contract-status';
import { ContractTimestampingButton } from './contract-timestamping-button';
import { Icons } from './icons';

interface ContractItemProps {
  contract: Pick<Contract, 'id' | 'title' | 'timestamped' | 'createdAt'>
}

export function ContractItem({ contract }: ContractItemProps) {
  // const status = getStatus(contract.digest)

  let testDigest = { digest: 'bdf6bc93bfdaaa44b3753351d10d2be6a59002cedb2809c3ffec62ca700a7df0', result: 1 }

  const status = getStatus(testDigest)

  console.log("ContractItem")

  // useEffect(() => {
  //   const fetch = async () => {
  //     const verifyRes = await handleVerify(testDigest)
  //   }
  //   if (!fetchedFirst) {
  //     fetch()
  //   }
  //   const timeout = setTimeout(async () => {
  //     await fetch()
  //   }, 60000)
  //   return () => clearTimeout(timeout)
  // }, [fetchedFirst])

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
        <ContractStatus contract={{ id: contract.id, title: contract.title, timestamped: contract.timestamped }} />
      </div>
      <div className="flex gap-4">
        <ContractTimestampingButton contract={{ id: contract.id, title: contract.title }} />
        <ContractOperations contract={{ id: contract.id, title: contract.title }} />
      </div>
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
