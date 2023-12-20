'use client'

import { useRouter } from 'next/navigation';
import * as React from 'react';

import { Icons } from '@/components/icons';
import { ButtonProps, buttonVariants } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import {
    handleTimestamp, handleVerify, isDigestAnchored, isDigestAnchorPending, isDigestFound,
    isDigestWaitingAnchoring
} from '@/helpers/dcrtime';
import { cn, processJsonObject } from '@/lib/utils';
import { MyJsonObject } from '@/types';

interface ContractTimestampingButtonProps extends ButtonProps {}

const testJsonObject: MyJsonObject = {
  id: 123,
  name: 'Example',
  attributes: {
    type: 'test',
    valid: true,
  },
}

export function ContractTimestampingButton({ className, variant, ...props }: ContractTimestampingButtonProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [status, setStatus] = React.useState<boolean>(false)

  // Icon according to status
  // check if digest is string
  const getStatus = (digest: string): string => {
    if (isDigestAnchored(digest)) {
      return 'Timestamped'
    }
    if (isDigestWaitingAnchoring(digest)) {
      return 'Awaiting anchoring time'
    }
    if (isDigestAnchorPending(digest)) {
      return 'Pending'
    }
    return 'Not Found'
  }

  console.log()

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

    const processedData = processJsonObject(testJsonObject)

    const {digests} = await handleTimestamp(processedData)
    const digestsInServer = digests.filter(isDigestFound)
        // fetch verify of digests already in server
        let verifyRes;
        if (digestsInServer?.length > 0) {
            verifyRes = await handleVerify(digestsInServer)
        }
        let digestsRes = digests;

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
      {isLoading ? <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> : <Icons.timestamping className="mr-2 h-4 w-4" />}
      Timestamp
    </button>
  )
}
