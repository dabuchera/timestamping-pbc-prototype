'use client'

import moment from 'moment';
import { useRouter } from 'next/navigation';
import { QRCodeSVG } from 'qrcode.react';
import * as React from 'react';
import { CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';

import { Icons } from '@/components/icons';
import { ButtonProps, buttonVariants } from '@/components/ui/button';
import { DatasetValue } from '@/lib/queries';
import { analyze, cn, Results } from '@/lib/utils';
import { Contract } from '@prisma/client';

import LineChart from './chart/line-chart';
import {
    Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle
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
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [dialogOpen, setDialogOpen] = React.useState<boolean>(false)
  const [results, setResults] = React.useState<Results>()

  async function onClick() {
    setIsLoading(true)

    setResults(
      analyze(
        datasets,
        contract.dataset,
        contract.checkInterval,
        contract.setPoint,
        contract.reward,
        contract.deviation,
        contract.threshold,
        contract.penalty
      )
    )

    console.log('Resultat handleTimestamp:')
    console.log(results)

    setIsLoading(false)

    setDialogOpen(true)
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
        Show Analysis
      </button>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[750px]">
          <DialogHeader>
            <DialogTitle>Results</DialogTitle>
            {/* <DialogDescription>Here you find the summary of the analysis</DialogDescription> */}
          </DialogHeader>
          {/* <Input className="py-4" placeholder="Title" value={nameInput} onChange={(e) => setNameInput(e.target.value)} /> */}
          <LineChart data={[...datasets, ...boundaries]} colors={colors} dataKeys={[contract.dataset, 'UpperBoundaries', 'LowerBoundaries']}>
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

          <hr />

          <h2 className="font-semibold">Summary</h2>
          <div className="grid gap-x-10 gap-y-3 grid-cols-3">
            <div>Check Interval: {contract.checkInterval}</div>
            <div>Allowed Deviation {contract.deviation}%</div>
            <div>Threshold: {contract.threshold}%</div>
            <div>Set Point: {contract.setPoint}°</div>
            <div>Reward: {contract.reward}$</div>
            <div>Penalty: {contract.penalty}$</div>
          </div>

          <hr />

          <h2 className="font-semibold">Violations</h2>
          <div className="grid grid-flow-row-dense grid-cols-3 grid-rows-2 gap-x-10 gap-y-3">
            <div className="col-span-2">Percentage of Datapoints above your deviation</div>
            <div
              className={
                results?.violationsAbovePercentage
                  ? results.violationsAbovePercentage < contract.threshold
                    ? 'text-green-700'
                    : 'text-red-700'
                  : 'text-white'
              }
            >
              {results?.violationsAbovePercentage}%
            </div>
            <div className="col-span-2">Percentage of Datapoints below your deviation</div>
            <div
              className={
                results?.violationsBelowPercentage
                  ? results.violationsBelowPercentage < contract.threshold
                    ? 'text-green-700'
                    : 'text-red-700'
                  : 'text-white'
              }
            >
              {results?.violationsBelowPercentage}%
            </div>
          </div>

          <hr />

          <div className="grid grid-cols-2">
            <h2 className="font-semibold">Payouts</h2>
            {results?.finalPenalty == 0 ? (
              <div className="text-green-700 font-semibold">No Penalty applied</div>
            ) : (
              <div className="text-red-700 font-semibold">Penalty applied</div>
            )}
          </div>
          <div className="grid grid-flow-row-dense grid-cols-4 grid-rows-3 gap-x-10 gap-y-3">
            <div className="row-span-3">
              <QRCodeSVG
                size={125} // Set the size of the QR code
                bgColor={'#ffffff'}
                fgColor={'#000000'}
                includeMargin={false}
                value={`https://mempool.space/address/${contract.payoutAddress}`}
              />
            </div>
            <div className="col-span-3">
              Eligible payout is {results?.finalPayout}$ and can be transferred to{' '}
              {contract.payoutAddress.substring(0, 4) + '...' + contract.payoutAddress.substring(contract.payoutAddress.length - 4)}
            </div>
            <div className="col-span-3">Check QR-Code</div>
            <div className="col-span-3">Necessary Signatures for Transfer from Multi-Sig (2/2)</div>
          </div>

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
              {isLoading ? <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> : <Icons.check className="mr-2 h-4 w-4" />}
              Close
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
