import Link from 'next/link';
import { useEffect, useState } from 'react';

import { ContractOperations } from '@/components/contract-operations';
import { Skeleton } from '@/components/ui/skeleton';
import {
    handleVerify, isDigestAnchored, isDigestAnchorPending, isDigestWaitingAnchoring
} from '@/helpers/dcrtime';
import { cn, formatDate, getStatus, isDigestBlank } from '@/lib/utils';
import { Digest } from '@/types';
import { Contract } from '@prisma/client';

import { ContractStatus } from './contract-status';
import { ContractTimestampingButton } from './contract-timestamping-button';
import { Icons } from './icons';

interface ContractItemProps {
  contract: Pick<Contract, 'id' | 'digest' | 'title' | 'dataset' | 'payoutAddress' | 'checkInterval' | 'reward' | 'setPoint' | 'deviation' | 'threshold' | 'penalty' | 'createdAt'>
}

export function ContractItem({ contract }: ContractItemProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center gap-20 w-1/2">
        <div className="grid gap-1">
          <Link href={`/dashboard/contracts/editor/${contract.id}`} className="font-semibold hover:underline">
            {contract.title}
          </Link>
          <div>
            <p className="text-sm text-muted-foreground">{formatDate(contract.createdAt?.toDateString())}</p>
          </div>
        </div>
      </div>
      <div className="flex gap-4">
        <ContractStatus contract={{ id: contract.id, digest: contract.digest }} />
      </div>
      <div className="flex gap-4">
        <ContractTimestampingButton
          contract={{
            id: contract.id,
            title: contract.title,
            digest: contract.digest,
            dataset: contract.dataset,
            payoutAddress: contract.payoutAddress,
            checkInterval: contract.checkInterval,
            reward: contract.reward,
            setPoint: contract.setPoint,
            deviation: contract.deviation,
            threshold: contract.threshold,
            penalty: contract.penalty,
          }}
          // Button is disabled if contract.digest has a value
          disabled={!isDigestBlank(contract.digest)}
        />
        <ContractOperations contract={{ id: contract.id, digest: contract.digest, title: contract.title }} />
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
