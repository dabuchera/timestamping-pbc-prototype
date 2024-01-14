'use client'

import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
    Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { authenticate } from '@/lib/actions';
import { zodResolver } from '@hookform/resolvers/zod';

const FormSchema = z.object({
  name: z.string().min(3, {
    message: 'Password must be at least 2 characters.',
  }),
  password: z.string().min(2, {
    message: 'Password must be at least 2 characters.',
  }),
})

export function LoginForm() {
  // const form = useForm<z.infer<typeof FormSchema>>({
  const form = useForm({
    // resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      password: '',
    },
  })

  const [errorMessage, dispatch] = useFormState(authenticate, undefined)

  function onSubmit(data: z.infer<typeof FormSchema>) {
    return toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    // <form action={dispatch} className="space-y-3">
    //   <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
    //     <h1 className="mb-3 text-2xl">
    //       Please log in to continue.
    //     </h1>
    //     <div className="w-full">
    //       <div>

    //         <div className="relative">
    //           <input
    //             className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
    //             id="name"
    //             type="name"
    //             name="name"
    //             placeholder="Enter your name address"
    //             required
    //           />
    //         </div>
    //       </div>
    //       <div className="mt-4">
    //         <label
    //           className="mb-3 mt-5 block text-xs font-medium text-gray-900"
    //           htmlFor="password"
    //         >
    //           Password
    //         </label>
    //         <div className="relative">
    //           <input
    //             className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
    //             id="password"
    //             type="password"
    //             name="password"
    //             placeholder="Enter password"
    //             required
    //             minLength={6}
    //           />
    //         </div>
    //       </div>
    //     </div>
    //     <Button type="submit">Login</Button>
    //     <div
    //       className="flex h-8 items-end space-x-1"
    //       aria-live="polite"
    //       aria-atomic="true"
    //     >
    //       {errorMessage && (
    //         <>

    //           <p className="text-sm text-red-500">{errorMessage}</p>
    //         </>
    //       )}
    //     </div>
    //   </div>
    // </form>

    <Form {...form}>
      <form action={dispatch} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="name" {...field} />
              </FormControl>
              <FormDescription>This is your name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="password" {...field} />
              </FormControl>
              <FormDescription>This is your password.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Login</Button>
      </form>
      <div className="flex h-8 items-end space-x-1" aria-live="polite" aria-atomic="true">
        {errorMessage && (
          <>
            {/* <ExclamationCircleIcon className="h-5 w-5 text-red-500" /> */}
            <p className="text-sm text-red-500">{errorMessage}</p>
          </>
        )}
      </div>
    </Form>
  )
}
