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
import { cn } from '@/lib/utils';
import { contractPatchSchema } from '@/lib/validations/contract';
// import EditorJS from '@editorjs/editorjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { Contract } from '@prisma/client';

interface EditorProps {
  contract: Pick<Contract, 'id' | 'title' | 'content' | 'timestamped'>
}

type FormData = z.infer<typeof contractPatchSchema>

export function Editor({ contract }: EditorProps) {
  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(contractPatchSchema),
  })
  const router = useRouter()
  const [isSaving, setIsSaving] = React.useState<boolean>(false)

  console.log(contract)

  // 1. Define your form.
  const form = useForm<z.infer<typeof contractPatchSchema>>({
    resolver: zodResolver(contractPatchSchema),
    defaultValues: {
      title: contract.title || '',
      content: contract.content || '',
      // ... any other fields you want to set default values for
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof contractPatchSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    console.log(values)

    const response = await fetch(`/api/contracts/${contract.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: values.title,
        content: values.content,
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid w-full gap-10">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center space-x-10">
              <Link href="/dashboard/contracts" className={cn(buttonVariants({ variant: 'ghost' }))}>
                <>
                  <Icons.chevronLeft className="mr-2 h-4 w-4" />
                  Back
                </>
              </Link>
              <p className={`text-sm ${contract.timestamped ? 'text-muted-foreground' : 'text-red-500'}`}>
                {contract.timestamped ? 'Timestamped' : 'Not Timestamped'}
              </p>{' '}
            </div>
            {contract.timestamped ? (
              <></>
            ) : (
              <button type="submit" className={cn(buttonVariants())}>
                {isSaving && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                <span>Save</span>{' '}
              </button>
            )}
          </div>
          <div className="prose prose-stone mx-auto w-[800px] dark:prose-invert">
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
          </div>
        </div>
      </form>
    </Form>

    // <form onSubmit={handleSubmit(onSubmit)}>
    //   <div className="grid w-full gap-10">
    //     <div className="flex w-full items-center justify-between">
    //       <div className="flex items-center space-x-10">
    //         <Link href="/dashboard/contracts" className={cn(buttonVariants({ variant: 'ghost' }))}>
    //           <>
    //             <Icons.chevronLeft className="mr-2 h-4 w-4" />
    //             Back
    //           </>
    //         </Link>
    //         <p className="text-sm text-muted-foreground">{contract.timestamped ? 'timestamped' : 'Draft'}</p>
    //       </div>
    //       <button type="submit" className={cn(buttonVariants())}>
    //         {isSaving && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
    //         <span>Save</span>
    //       </button>
    //     </div>
    //     <div className="prose prose-stone mx-auto w-[800px] dark:prose-invert">
    //       <Input
    //         autoFocus
    //         id="title"
    //         defaultValue={contract.title}
    //         placeholder="Post title"
    //         className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
    //         {...register('title')}
    //       />
    //       <div id="editor" className="min-h-[500px]" />
    //       <p className="text-sm text-gray-500">
    //         Use <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">Tab</kbd> to open the command menu.
    //       </p>
    //     </div>
    //   </div>
    // </form>
  )

  /* return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid w-full gap-10">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center space-x-10">
            <Link
              href="/dashboard"
              className={cn(buttonVariants({ variant: "ghost" }))}
            >
              <>
                <Icons.chevronLeft className="mr-2 h-4 w-4" />
                Back
              </>
            </Link>
            <p className="text-sm text-muted-foreground">
              {contract.timestamped ? "timestamped" : "Draft"}
            </p>
          </div>
          <button type="submit" className={cn(buttonVariants())}>
            {isSaving && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            <span>Save</span>
          </button>
        </div>
        <div className="prose prose-stone mx-auto w-[800px] dark:prose-invert">
          <TextareaAutosize
            autoFocus
            id="title"
            defaultValue={contract.title}
            placeholder="Post title"
            className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
            {...register("title")}
          />
          <div id="editor" className="min-h-[500px]" />
          <p className="text-sm text-gray-500">
            Use{" "}
            <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">
              Tab
            </kbd>{" "}
            to open the command menu.
          </p>
        </div>
      </div>
    </form>
  ) */
}
