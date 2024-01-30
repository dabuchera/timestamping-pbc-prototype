'use client'

import { useRouter } from 'next/navigation';
import * as React from 'react';

import { Icons } from '@/components/icons';
import { ButtonProps, buttonVariants } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { handleTimestamp } from '@/lib/dcrtime';
import { cn, processJsonObject } from '@/lib/utils';
import { ContractObject } from '@/types';
import { Contract } from '@prisma/client';

interface ContractAnalysisButtonProps extends ButtonProps {
  // Adjust to what needed within the contract class
  contract: Pick<
    Contract,
    'id' | 'digest' | 'title' | 'dataset' | 'payoutAddress' | 'checkInterval' | 'reward' | 'setPoint' | 'deviation' | 'threshold' | 'penalty'
  >
}

export function ContractAnalysisButton({ contract, className, variant, ...props }: ContractAnalysisButtonProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  async function onClick() {
    setIsLoading(true)

    
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

    const processedData = await processJsonObject(JsonObject)

    const res = await handleTimestamp(processedData)

    console.log('Resultat handleTimestamp:')
    console.log(res)

    // Update digest
    const response = await fetch(`/api/contracts/${contract.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: contract.id,
        title: contract.title,
        // digest is changing here
        digest: res.digests[0].digest,
        dataset: contract.dataset,
        payoutAddress: contract.payoutAddress,
        checkInterval: contract.checkInterval,
        reward: contract.reward,
        setPoint: contract.setPoint,
        deviation: contract.deviation,
        threshold: contract.threshold,
        penalty: contract.penalty,
      }),
    })

    setIsLoading(false)

    if (!response?.ok) {
      return toast({
        title: 'Something went wrong.',
        description: 'Your contract was not saved. Please try again.',
        variant: 'destructive',
      })
    }

    // This forces a cache invalidation.
    router.refresh()

    return toast({
      description: 'Your contract has been saved and timestamping started.',
    })
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
        Start Analysis
      </button>
    </>
  )
}
