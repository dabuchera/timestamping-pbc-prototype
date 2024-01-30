import { Skeleton } from '@/components/ui/skeleton';
import { getAllEntriesNameUnix } from '@/lib/queries';
import { filterDataByInterval, findMinMaxTimestamps, formatDate } from '@/lib/utils';
import { Contract } from '@prisma/client';

import { ContractAnalysisButton } from './contract-analysis-button';
import { ContractStatus } from './contract-status';

interface ContractItemProps {
  contract: Pick<
    Contract,
    | 'id'
    | 'digest'
    | 'title'
    | 'dataset'
    | 'payoutAddress'
    | 'checkInterval'
    | 'reward'
    | 'setPoint'
    | 'deviation'
    | 'threshold'
    | 'penalty'
    | 'createdAt'
  >
}

export async function ResultContractItem({ contract }: ContractItemProps) {
  const datasets = await getAllEntriesNameUnix(contract.dataset)

  const timestamps = findMinMaxTimestamps(datasets)
  // console.log('Min Timestamp:', timestamps.minTimestamp)

  const boundaries = [
    {
      UpperBoundaries: contract.setPoint * (1 + contract.deviation / 100),
      timestamp: timestamps.minTimestamp,
    },
    {
      UpperBoundaries: contract.setPoint * (1 + contract.deviation / 100),
      timestamp: timestamps.maxTimestamp,
    },
    {
      LowerBoundaries: contract.setPoint * (1 - contract.deviation / 100),
      timestamp: timestamps.minTimestamp,
    },
    {
      LowerBoundaries: contract.setPoint * (1 - contract.deviation / 100),
      timestamp: timestamps.maxTimestamp,
    },
  ]

  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center gap-20 w-1/2">
        <div className="grid gap-1">
          {contract.title}

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
          datasets={datasets}
          boundaries={boundaries}
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
