'use client'

import cuid from 'cuid';
import { useRouter } from 'next/navigation';
import * as React from 'react';

import { Icons } from '@/components/icons';
import { ButtonProps, buttonVariants } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

interface TestingButtonProps extends ButtonProps {
  text: string
  output1: any
  output2: any
  output3: any
}

export function TestingButton({ className, variant, text, output1, output2, output3, ...props }: TestingButtonProps) {
  // Create empty contract
  async function onClick() {
    console.log(output1)
    console.log(output2)
    console.log(output3)
  }

  return (
    <button onClick={onClick} className={cn(buttonVariants({ variant }), className)} {...props}>
      <Icons.testing className="mr-2 h-4 w-4" />
      {text}
    </button>
  )
}
