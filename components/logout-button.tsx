import * as React from 'react';

import { signOut } from '@/auth';
import { Button, ButtonProps, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface LogoutButtonProps extends ButtonProps {}

export default function LogoutButton({ className, variant, ...props }: LogoutButtonProps) {
  return (
    <form
      action={async () => {
        'use server'
        await signOut()
      }}
    >
      <Button type="submit">
        Logout
      </Button>
    </form>
    // <button
    //   onClick={async () => {
    //     'use server'
    //     await signOut()
    //   }}
    //   className={cn(buttonVariants({ variant }), className)}
    //   {...props}
    // >
    //   Logout
    // </button>
  )
}
