'use client'

// import '@/styles/editor.css';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useForm } from 'react-hook-form';
// import TextareaAutosize from 'react-textarea-autosize';
import * as z from 'zod';

import { Icons } from '@/components/icons';
import { Button, buttonVariants } from '@/components/ui/button';
import {
    Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { cn, isStringBlank } from '@/lib/utils';
import { contractPatchSchema } from '@/lib/validations/contract';
// import EditorJS from '@editorjs/editorjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { Contract } from '@prisma/client';

interface EditorProps {
  contract: Pick<Contract, 'id' | 'title' | 'digest' | 'input1' | 'input2' | 'input3'>
}

type FormData = z.infer<typeof contractPatchSchema>

export function Editor({ contract }: EditorProps) {
  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(contractPatchSchema),
  })
  const router = useRouter()
  const [isSaving, setIsSaving] = React.useState<boolean>(false)

  // 1. Define your form.
  const form = useForm<z.infer<typeof contractPatchSchema>>({
    resolver: zodResolver(contractPatchSchema),
    // defaultValues werden eigentlich bei creation contract erstellt
    defaultValues: {
      title: contract.title || '',
      input1: contract.input1,
      input2: contract.input2,
      input3: contract.input3,
      // input3: contract.input3 || '',
      // ... any other fields you want to set default values for
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof contractPatchSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    console.log("lkjaskldjakls")

    setIsSaving(true)

    const response = await fetch(`/api/contracts/${contract.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: values.title,
        input1: values.input1,
        input2: values.input2,
        input3: values.input3,
      }),
    })

    setIsSaving(false)

    if (!response?.ok) {
      return toast({
        title: 'Something went wrong.',
        description: 'Your post was not saved. Please try again.',
        variant: 'destructive',
      })
    }

    router.refresh()

    return toast({
      description: 'Your post has been saved.',
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-10">
              <Link
                href="/dashboard/contracts"
                onClick={() => {
                  router.refresh()
                  router.push('/dashboard/contracts')
                }}
                className={cn(buttonVariants({ variant: 'ghost' }))}
              >
                <>
                  <Icons.chevronLeft className="mr-2 h-4 w-4" />
                  Back
                </>
              </Link>
            </div>
            <button type="submit" className={cn(buttonVariants())}>
              {isSaving && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
              <span>Save</span>{' '}
            </button>
          </div>

          <div className="prose prose-stone mx-auto w-full dark:prose-invert">
            {!isStringBlank(contract.digest) ? (
              <p>
                <strong>Digest:</strong> {contract.digest}
              </p>
            ) : (
              <p>
                <strong>Digest:</strong> Not available
              </p>
            )}
          </div>

          <div className="prose prose-stone mx-auto w-full dark:prose-invert">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    {/* Set the default value to the current title, if it exists{} */}
                    <Input placeholder="Title" {...field} />
                  </FormControl>
                  <FormDescription>This is the title of your contract.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="input1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Input 1</FormLabel>
                  <FormControl>
                    {/* Set the default value to the current title, if it exists{} */}
                    <Input placeholder="Input1" {...field} />
                  </FormControl>
                  <FormDescription>This is the first input of your contract.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="input2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Input 2</FormLabel>
                  <FormControl>
                    {/* Set the default value to the current title, if it exists{} */}
                    <Input placeholder="Input2" {...field} />
                  </FormControl>
                  <FormDescription>This is the second input of your contract.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="input3"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Input 3</FormLabel>
                  <FormControl>
                    {/* Set the default value to the current title, if it exists{} */}
                    <Input placeholder="Input3" {...field} />
                  </FormControl>
                  <FormDescription>This is the third input of your contract.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </form>
    </Form>
  )
}
