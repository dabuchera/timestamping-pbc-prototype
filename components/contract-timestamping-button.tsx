'use client'

import { useRouter } from 'next/navigation';
import * as React from 'react';

import { Icons } from '@/components/icons';
import { ButtonProps, buttonVariants } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import {
    Digest, handleGetStatus, handleTimestamp, handleVerify, isDigestAnchored, isDigestAnchorPending,
    isDigestWaitingAnchoring
} from '@/lib/dcrtime';
import { cn, getStatus, processJsonObject } from '@/lib/utils';
import { ContractObject } from '@/types';
import { Contract } from '@prisma/client';

interface ContractTimestampingButtonProps extends ButtonProps {
  // Adjust to what needed within the contract class
  contract: Pick<Contract, 'id' | 'title'>
}

export function ContractTimestampingButton({ contract, className, variant, ...props }: ContractTimestampingButtonProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  // Test Hash
  // 045829216aa9164cd5dde156e458cebd2e03e210ae8f6ba0bf475468a4664cfb

  // Process data
  // return something like that

  // digest: "bdf6bc93bfdaaa44b3753351d10d2be6a59002cedb2809c3ffec62ca700a7df0"
  // name: "JSON Object"
  // payload: "eyJpZCI6MTIzLCJuYW1lIjoiRXhhbXBsZSIsImF0dHJpYnV0ZXMiOnsidHlwZSI6InRlc3QiLCJ2YWxpZCI6dHJ

  //

  // "bdf6bc93bfdaaa44b3753351d10d2be6a59002cedb2809c3ffec62ca700a7df0"

  async function onClick() {
    // setIsLoading(true)
    console.log('onClick')
    const JsonObject: ContractObject = {
      id: contract.id,
      title: contract.title,
    }

    const processedData = await processJsonObject(JsonObject)

    console.log(processedData)

    // const contracts = await handleTimestamp(processedData)

    const res = await handleTimestamp(processedData)
    console.log(res)

    const status = getStatus(res.digests[0])
    console.log(status)
    // const { digests } = await handleTimestamp(processedData)

    // console.log()

    // add here store digest to db

    return null

    const digestsInServer = digests.filter(isDigestFound)
    // fetch verify of digests already in server
    let verifyRes
    if (digestsInServer?.length > 0) {
      verifyRes = await handleVerify(digestsInServer)
    }
    let digestsRes = digests

    console.log(processedData)
    console.log(digestsInServer)
    console.log(digestsRes)

    // const response = await fetch("/api/contracts", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     title: "Untitled Contract",
    //   }),
    // })

    // setIsLoading(false)

    // if (!response?.ok) {
    //         return toast({
    //     title: "Something went wrong.",
    //     description: "Your contract was not created. Please try again.",
    //     variant: "destructive",
    //   })
    // }

    // This forces a cache invalidation.
    router.refresh()
  }

  async function onClickStatus() {
    // const res = await handleGetStatus(contract.id)
    const res = await handleVerify([
      { digest: 'e966f1ec9b8ced6e41b3132f63bfc164ff86f5bf2b49ea73feb6254728292852', id: contract.id, payload: 'IlRlc3Qi' },
    ])
    console.log(res)

    const status = getStatus(res.digests[0])
    console.log(status)

    // This forces a cache invalidation.
    router.refresh()


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
        {isLoading ? <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> : <Icons.timestamping className="mr-2 h-4 w-4" />}
        Timestamp
      </button>
      <button
        onClick={onClickStatus}
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
        <Icons.info className="mr-2 h-4 w-4" />
        Status
      </button>
    </>
  )
}
