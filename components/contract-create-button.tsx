'use client'

import cuid from 'cuid';
import { useRouter } from 'next/navigation';
import * as React from 'react';

import { Icons } from '@/components/icons';
import { ButtonProps, buttonVariants } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

interface ContractCreateButtonProps extends ButtonProps {}

async function getSpecificPost(contractId: string) {
  const response = await fetch(`/api/contracts/${contractId}`, {
    method: 'GET',
  })
  const data = await response.json()

  if (response.status === 200) {
    if (data.exists) {
      // Contract exists
      console.log('Contract exists.')
      return data
    } else {
      // Contract does not exist
      console.log('Contract does not exist yet.')
      // toast({
      //   title: 'Not Found',
      //   description: 'The ID does not exist yet',
      //   variant: 'success',
      // })
      return data
    }
  } else {
    // Handle other status codes or errors
    toast({
      title: 'Something went wrong.',
      description: 'An error occurred while fetching the resource.',
      variant: 'destructive',
    })
    return true
  }
}

export function ContractCreateButton({ className, variant, ...props }: ContractCreateButtonProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  // Create empty contract
  async function onClick() {
    setIsLoading(true)

    const generatedCuid: string = cuid()
    // console.log(generatedCuid)

    const IDexists = await getSpecificPost(generatedCuid)
    // const IDexists = await getSpecificPost("clrb47de70000vl1dpromjsot")

    if (IDexists) {
      setIsLoading(false)
      return null
    }

    setIsLoading(false)

    // This forces a cache invalidation.
    router.refresh()

    router.push(`/dashboard/contracts/creator/${generatedCuid}`)
  }

  return (
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
      {isLoading ? <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> : <Icons.add className="mr-2 h-4 w-4" />}
      New contract
    </button>
  )
}
