import Link from 'next/link';
import { useEffect, useState } from 'react';

import { ContractOperations } from '@/components/contract-operations';
import { Skeleton } from '@/components/ui/skeleton';
import {
    handleVerify, isDigestAnchored, isDigestAnchorPending, isDigestWaitingAnchoring
} from '@/helpers/dcrtime';
import { db } from '@/lib/db';
import { cn, formatDate, getStatus, isDigestBlank } from '@/lib/utils';
import { Digest } from '@/types';
import { Contract } from '@prisma/client';

import { ContractAnalysisButton } from './contract-analysis-button';
import { ContractStatus } from './contract-status';
import { Icons } from './icons';

interface ContractItemProps {
  contract: Pick<Contract, 'id' | 'digest' | 'title' | 'dataset' | 'payoutAddress' | 'checkInterval' | 'reward' | 'setPoint' | 'deviation' | 'threshold' | 'penalty' | 'createdAt'>
}

interface DatasetValue {
  timestamp: string
  [key: string]: any // This allows any additional properties with string keys and any values
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

async function getDatasetValuesByTimestamp(name: string) {

  const datasetValuesByTimestamp: DatasetValue[] = []
    const entries = await getAllEntries(name)
    for (const entry of entries) {
      // const timestamp = entry.timestamp.toISOString() // Convert timestamp to ISO string

      // Format it as a more human-readable string
      const formattedDate = entry.timestamp.toLocaleDateString() // Example output: "1/4/2024"
      const formattedTime = entry.timestamp.toLocaleTimeString() // Example output: "12:00:00 AM"

      // console.log(`${formattedDate} ${formattedTime}`)
      const timestamp = `${formattedDate} ${formattedTime}`
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

  return datasetValuesByTimestamp
}

export async function ResultContractItem({ contract }: ContractItemProps) {

  // const allData = await getDatasetValuesByTimestamp(contract.dataset)
  const allData = await getAllEntries(contract.dataset)

  console.log(allData)

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
        <ContractAnalysisButton
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
          // Button is disabled if contract.digest has no value e.g., not timestamped
          // disabled={isDigestBlank(contract.digest)}
        />
      </div>
    </div>
  )
}

ResultContractItem.Skeleton = function PostItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  )
}
