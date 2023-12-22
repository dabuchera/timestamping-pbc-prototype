'use client'

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { ContractOperations } from '@/components/contract-operations';
import { Skeleton } from '@/components/ui/skeleton';
import {
    handleVerify, isDigestAnchored, isDigestAnchorPending, isDigestWaitingAnchoring
} from '@/helpers/dcrtime';
import { cn, formatDate } from '@/lib/utils';
import { Contract } from '@prisma/client';

import { Icons } from './icons';

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

// Adjust to what needed within the contract class
interface ContractStatusProps {
  contract: Pick<Contract, 'id' | 'title'| 'timestamped'>
}

export function ContractStatus({ contract }: ContractStatusProps) {
  // const status = getStatus(contract.digest)
  const [fetchedFirst, setFetchedFirst] = useState(false)

  let testDigest = [{ digest: 'bdf6bc93bfdaaa44b3753351d10d2be6a59002cedb2809c3ffec62ca700a7df0', result: 1 }]

  const status = getStatus(testDigest)
  // const status = "Not Found"

  console.log("ContractStatus")

  // useEffect(() => {
  //   const fetch = async () => {
  //     const verifyRes = await handleVerify(testDigest)
  //     console.log(verifyRes)
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
  )
}