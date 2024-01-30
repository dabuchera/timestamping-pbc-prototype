'use client'

import moment from 'moment';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';

import { Icons } from '@/components/icons';
import { ButtonProps, buttonVariants } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { handleTimestamp } from '@/lib/dcrtime';
import { DatasetEntry, DatasetValue } from '@/lib/queries';
import { analyze, cn, findMinMaxTimestamps, processJsonObject } from '@/lib/utils';
import { ContractObject } from '@/types';
import { Contract } from '@prisma/client';

import LineChart from './chart/line-chart';
import {
    Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle
} from './ui/dialog';

interface ContractAnalysisButtonProps extends ButtonProps {
  // Adjust to what needed within the contract class
  contract: Pick<
    Contract,
    'id' | 'digest' | 'title' | 'dataset' | 'payoutAddress' | 'checkInterval' | 'reward' | 'setPoint' | 'deviation' | 'threshold' | 'penalty'
  >
  datasets: DatasetValue[]
  boundaries: DatasetValue[]
}

const colors = ['#7f7f7f', '#ad1714', '#5a45bd']

export function ContractAnalysisButton({ contract, datasets, boundaries, className, variant, ...props }: ContractAnalysisButtonProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [dialogOpen, setDialogOpen] = React.useState<boolean>(false)

  // "Upperboundaries", "LowerBoundaries"]}>

  async function onClick() {
    setIsLoading(true)

    setDialogOpen(true)

    let JsonObject: ContractObject = {
      id: contract.id,
      title: contract.title,
      dataset: contract.dataset,
      payoutAddress: contract.payoutAddress,
      checkInterval: contract.checkInterval,
      reward: contract.reward,
      setPoint: contract.setPoint,
      deviation: contract.deviation,
      threshold: contract.threshold,
      penalty: contract.penalty,
    }

    const results = await analyze(
      datasets,
      contract.dataset,
      contract.checkInterval,
      contract.setPoint,
      contract.reward,
      contract.deviation,
      contract.threshold,
      contract.penalty
    )

    console.log('Resultat handleTimestamp:')
    console.log(results)

    // Update digest
    // const response = await fetch(`/api/contracts/${contract.id}`, {
    //   method: 'PATCH',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     id: contract.id,
    //     title: contract.title,
    //     // digest is changing here
    //     digest: res.digests[0].digest,
    //     dataset: contract.dataset,
    //     payoutAddress: contract.payoutAddress,
    //     checkInterval: contract.checkInterval,
    //     reward: contract.reward,
    //     setPoint: contract.setPoint,
    //     deviation: contract.deviation,
    //     threshold: contract.threshold,
    //     penalty: contract.penalty,
    //   }),
    // })

    setIsLoading(false)

    // if (!response?.ok) {
    //   return toast({
    //     title: 'Something went wrong.',
    //     description: 'Your contract was not saved. Please try again.',
    //     variant: 'destructive',
    //   })
    // }

    // This forces a cache invalidation.
    // router.refresh()

    // return toast({
    //   description: 'Your contract has been saved and timestamping started.',
    // })
  }

  return (
    <>
      <button
        onClick={onClick}
        className={cn(
          buttonVariants({ variant }),
          {
            'cursor-not-allowed opacity-60': isLoading,
          },
          className
        )}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> : <Icons.analysis className="mr-2 h-4 w-4" />}
        {isLoading ? 'Running' : 'Starting'}
      </button>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[750px]">
          <DialogHeader>
            <DialogTitle>Create Dataset</DialogTitle>
            <DialogDescription>
              Currently, you will generate an interval of{' '}
              {/* {increment === 60_000 ? '1 minute' : increment === 3_600_000 ? '1 hour' : increment === 86_400_000 ? '1 day' : ''}. */}
            </DialogDescription>
          </DialogHeader>
          {/* <Input className="py-4" placeholder="Title" value={nameInput} onChange={(e) => setNameInput(e.target.value)} /> */}
          <LineChart data={ [...datasets, ...boundaries]} colors={colors} dataKeys={[contract.dataset, 'Upperboundaries', 'LowerBoundaries']}>
            <Tooltip labelFormatter={(unixTime) => moment(unixTime).format('DD-MM-YYYY HH:mm')} labelClassName="text-yellow-500" /> <Legend />
            <XAxis
              type="number"
              domain={['dataMin', 'dataMax']}
              dataKey="timestamp"
              stroke="#3d3b3b"
              fontSize={12}
              axisLine={false}
              tickLine={false}
              tickFormatter={(unixTime) => moment(unixTime).format('DD-MM-YY')}
            />
            <YAxis
              type="number"
              domain={['dataMin', 'dataMax']}
              stroke="#888888"
              fontSize={12}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value: number) => `${value}°`}
            />
            <CartesianGrid strokeDasharray="3 3" />
          </LineChart>

          <DialogFooter>
            <button
              className={cn(
                buttonVariants({ variant }),
                {
                  'cursor-not-allowed opacity-60': isLoading,
                },
                className
              )}
              disabled={isLoading}
              {...props}
            >
              {isLoading ? <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> : <Icons.save className="mr-2 h-4 w-4" />}
              Save
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
