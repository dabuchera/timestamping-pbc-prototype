'use client'

import { useRouter } from 'next/navigation';
import * as React from 'react';
import { z } from 'zod';

import { Icons } from '@/components/icons';
import { ButtonProps, buttonVariants } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

import {
    Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
    DialogTrigger
} from './ui/dialog';
import { Input } from './ui/input';

const validationSchema = z.object({
  nameInput: z.string().min(3, { message: 'Name must be at least 3 character' }).max(20, { message: 'Name cannot exceed 20 characters' }),
});

interface ContractCreateButtonProps extends ButtonProps {}

export function DatasetCreateButton({ className, variant, ...props }: ContractCreateButtonProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  // const increment = 60_000 // 1 minute in milliseconds
  //  const increment = 3_600_000 // 1 hour in milliseconds
  //  const increment = 86_400_000 // 1 day in milliseconds
  const [increment] = React.useState<number>(86_400_000) // State to manage the increment

  const [nameInput, setNameInput] = React.useState<string>('')

  // Create empty dataset
  async function onSave() {
    setIsLoading(true)

    // Get all names which are in the dataset
    // Used API Routes (Serverless Functions) with Prisma because it is "use client"
    const response = await fetch(`/api/datasets/distinct`, {
      method: 'GET',
    })
    const data = await response.json()
    console.log(data)

    // Check if Name is already in database
    if (data.includes(nameInput)) {
      console.log(`${nameInput} is in the array.`)
      setIsLoading(false)
      setNameInput('')
      return toast({
        title: 'Name already in use.',
        description: 'Your used name is already in use. Please change that.',
        variant: 'destructive',
      })
    }

    const startTimestamp = new Date('2024-01-01T00:00:00Z').getTime()
    // const endTimestamp = new Date('2024-01-04T23:59:59Z').getTime()
    const endTimestamp = new Date('2024-01-31T23:59:59Z').getTime()

    for (let timestamp = startTimestamp; timestamp <= endTimestamp; timestamp += increment) {
      // Generate a random value within the range of 20 to 30
      const randomValue = 20 + Math.random() * 10 // Generates a random value between 20 and 30

      const date = new Date(timestamp)

      const response = await fetch(`/api/datasets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: nameInput,
          value: randomValue,
          timestamp: date,
        }),
      })

      console.log(date)

      if (!response?.ok) {
        setIsLoading(false)
        setNameInput('')
        return toast({
          title: 'Something went wrong.',
          description: 'Your post was not saved. Please try again.',
          variant: 'destructive',
        })
      }
    }

    setIsLoading(false)
    setNameInput('')
    router.refresh()

    return toast({
      description: 'Your dataset has been saved.',
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
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
          {isLoading ? <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> : <Icons.add className="mr-2 h-4 w-4" />}
          New dataset
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Dataset</DialogTitle>
          <DialogDescription>
            Currently, you will generate an interval of{' '}
            {increment === 60_000 ? '1 minute' : increment === 3_600_000 ? '1 hour' : increment === 86_400_000 ? '1 day' : ''}.
          </DialogDescription>
        </DialogHeader>
        <Input className="py-4" placeholder="Title" value={nameInput} onChange={(e) => setNameInput(e.target.value)} />
        <DialogFooter>
          <DialogClose asChild>
            <button
              onClick={onSave}
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
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
