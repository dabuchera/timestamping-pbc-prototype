import Link from 'next/link';

import { Skeleton } from '@/components/ui/skeleton';
import { db } from '@/lib/db';
import { formatDate } from '@/lib/utils';

import { DatasetOperations } from './dataset-operations';

// get Min and Max for all entries with this name
async function getMinMaxTimestamp(name: string) {
  return await db.dataset.aggregate({
    where: {
      name: name,
    },
    _min: {
      timestamp: true,
    },
    _max: {
      timestamp: true,
    },
  })
}

interface DatasetItemProps {
  name: string
}

export async function DatasetItem({ name }: DatasetItemProps) {
  const minmax = await getMinMaxTimestamp(name)

  let min = undefined
  let max = undefined

  if (minmax._min.timestamp && minmax._max.timestamp) {
    min = minmax._min.timestamp
    max = minmax._max.timestamp
  }

  return (
    <div className="flex items-center justify-between p-4">
      {/* <Checkbox onChange={handleCheckboxChange}/> */}
      <div className="flex items-center gap-20 w-1/2">
        <div className="grid gap-1">
          <Link href={`/dashboard/contracts/editor`} className="font-semibold hover:underline">
            {name}
          </Link>
          <div>
            {
              <p className="text-sm text-muted-foreground">
                {min && max ? formatDate(min.toDateString()) + ' - ' + formatDate(max.toDateString()) : 'Not Set'}
              </p>
            }
          </div>
        </div>
      </div>
      <div className="flex gap-4">
        test
        {/* <ContractStatus contract={{ id: contract.id, digest: contract.digest }} /> */}
      </div>
      <div className="flex gap-4">
        {/* <ContractTimestampingButton
          contract={{
            id: contract.id,
            title: contract.title,
            digest: contract.digest,
            dataset: contract.dataset,
            setPoint: contract.setPoint,
            deviation: contract.deviation,
            penalty: contract.deviation,
            checkInterval: contract.checkInterval,
          }}
          // Button is disabled if contract.digest has a value
          disabled={!isDigestBlank(contract.digest)}
        /> */}
        <DatasetOperations name={name} />
      </div>
    </div>
  )
}

DatasetItem.Skeleton = function PostItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  )
}
