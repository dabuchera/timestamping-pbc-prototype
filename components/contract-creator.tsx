'use client'

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Icons } from '@/components/icons';
import { buttonVariants } from '@/components/ui/button';
import {
    Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { contractPatchSchema } from '@/lib/validations/contract';
import { zodResolver } from '@hookform/resolvers/zod';

import { TestingButton } from './testing-button';

interface CreatorProps {
  contractId: string
  uniqueDatasetNames: string[]
}

export function ContractCreator({ contractId, uniqueDatasetNames }: CreatorProps) {
  const router = useRouter()
  const [isSaving, setIsSaving] = React.useState<boolean>(false)

  // 1. Define your form.
  const form = useForm<z.infer<typeof contractPatchSchema>>({
    resolver: zodResolver(contractPatchSchema),
    defaultValues: {
      title: '',
      dataset: uniqueDatasetNames.length !== 0 ? uniqueDatasetNames[0] : 'None',
      // Die Fehlermeldung @ts-ignore below sind ok. Da diese Werte zu Beginn Null sind brauchen sie ein empty string um controlled zu werden
      // @ts-ignore
      payoutAddress: '',
      // @ts-ignore
      checkInterval: '1d',
      // @ts-ignore
      reward: '',
      // @ts-ignore
      setPoint: '',
      // @ts-ignore
      deviation: '',
      // @ts-ignore
      threshold: '',
      // @ts-ignore
      penalty: '',
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof contractPatchSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsSaving(true)

    const response = await fetch(`/api/contracts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: contractId,
        title: values.title,
        // digest will be set in route.ts
        // digest: "",
        dataset: values.dataset,
        payoutAddress: values.payoutAddress,
        checkInterval: values.checkInterval,
        reward: values.reward,
        setPoint: values.setPoint,
        deviation: values.deviation,
        threshold: values.threshold,
        penalty: values.penalty,
      }),
    })

    setIsSaving(false)
    router.refresh()

    if (!response?.ok) {
      return toast({
        title: 'Something went wrong.',
        description: 'Your post was not saved. Please try again.',
        variant: 'destructive',
      })
    }

    return toast({
      description: 'Your post has been saved.',
    })
  }

  return (
    <div className="grid gap-5">
      {/* Back */}
      <div className="prose prose-stone mx-auto w-full dark:prose-invert">
        <div className="flex items-center space-x-10">
          <Link href="/dashboard/contracts" className={cn(buttonVariants({ variant: 'ghost' }))}>
            <>
              <Icons.chevronLeft className="mr-2 h-4 w-4" />
              Back
            </>
          </Link>
          {/* Test Button */}
          <TestingButton text={'Test'} output1={'Button Clicked!'} output2={form.getValues()} output3={form.formState.errors}></TestingButton>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-5">
            {/* Display the digest or a message if it's null */}
            <div className="flex items-center justify-between">
              <p>
                <strong>Digest:</strong> Not available
              </p>
              {/* Save Button */}
              <button type="submit" className={cn(buttonVariants())}>
                {isSaving && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                <span>Save</span>{' '}
              </button>
            </div>
            <div className="prose prose-stone mx-auto w-full dark:prose-invert grid grid-cols-2 gap-10">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Title" {...field} />
                    </FormControl>
                    <FormDescription>This is the title of your contract.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dataset"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dataset</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a dataset for your contract" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {uniqueDatasetNames.map((value) => (
                          <SelectItem key={value} value={value}>
                            {value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>This is the used dataset.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="payoutAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payout Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Payout Address" {...field} />
                    </FormControl>
                    <FormDescription>This is the payout address of your contract.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div></div>
              <FormField
                control={form.control}
                name="checkInterval"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Checking Interval</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a checking Interval for your contract" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1d">Daily Interval</SelectItem>
                        <SelectItem value="2d">Bi-Daily Interval</SelectItem>
                        <SelectItem value="3d">Tri-Daily Interval</SelectItem>
                        <SelectItem value="7d">Weekly Interval</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>This is the used checking Interval.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="reward"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reward</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        placeholder="Reward"
                        {...field}
                        onChange={(e) => {
                          e.target.value ? field.onChange(parseFloat(e.target.value)) : field.onChange(e.target.value)
                        }}
                      />
                    </FormControl>
                    <FormDescription>This is the reward used.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="setPoint"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Set Point</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        placeholder="Set Point"
                        {...field}
                        onChange={(e) => {
                          e.target.value ? field.onChange(parseFloat(e.target.value)) : field.onChange(e.target.value)
                        }}
                      />
                    </FormControl>
                    <FormDescription>This is the set point used.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="deviation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deviation between 0% - 100%</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        placeholder="Deviation [%]"
                        {...field}
                        onChange={(e) => {
                          e.target.value ? field.onChange(parseFloat(e.target.value)) : field.onChange(e.target.value)
                        }}
                      />
                    </FormControl>
                    <FormDescription>This is the deviation used.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="threshold"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Threshold between 1% - 50%</FormLabel>
                    <FormControl>
                      {/* Set the default value to the current title, if it exists{} */}
                      <Input
                        type="number"
                        min="0"
                        placeholder="Threshold [%]"
                        {...field}
                        onChange={(e) => {
                          e.target.value ? field.onChange(parseFloat(e.target.value)) : field.onChange(e.target.value)
                        }}
                      />
                    </FormControl>
                    <FormDescription>This is the threshold used.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="penalty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Penalty per Interval</FormLabel>
                    <FormControl>
                      {/* Set the default value to the current title, if it exists{} */}
                      <Input
                        type="number"
                        min="0"
                        placeholder="Penalty [$]"
                        {...field}
                        onChange={(e) => {
                          e.target.value ? field.onChange(parseFloat(e.target.value)) : field.onChange(e.target.value)
                        }}
                      />
                    </FormControl>
                    <FormDescription>This is the penalty used.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}
