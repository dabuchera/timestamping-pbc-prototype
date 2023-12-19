"use client"

import { useRouter } from 'next/navigation';
import * as React from 'react';

import { Icons } from '@/components/icons';
import { ButtonProps, buttonVariants } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

interface ContractCreateButtonProps extends ButtonProps {}

export function ContractCreateButton({
  className,
  variant,
  ...props
}: ContractCreateButtonProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  async function onClick() {
    setIsLoading(true)

    const response = await fetch("/api/contracts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Untitled Contract",
      }),
    })

    setIsLoading(false)

    if (!response?.ok) {
            return toast({
        title: "Something went wrong.",
        description: "Your contract was not created. Please try again.",
        variant: "destructive",
      })
    }

    const contract = await response.json()

    // This forces a cache invalidation.
    router.refresh()

    router.push(`/dashboard/contracts/editor/${contract.id}`)
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        buttonVariants({ variant }),
        {
          "cursor-not-allowed opacity-60": isLoading,
        },
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Icons.add className="mr-2 h-4 w-4" />
      )}
      New contract
    </button>
  )
}
