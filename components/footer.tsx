'use client'

import * as React from 'react';

import { nextAnchoringDate } from '@/helpers/dcrtime';
import { cn } from '@/lib/utils';

import { Icons } from './icons';
import { ModeToggle } from './mode-toggle';
import { buttonVariants } from './ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

const minsToHour = (): number => {
  return 60 - Math.round((new Date().getTime() % 3.6e6) / 6e4)
}

export function Footer({ className }: React.HTMLAttributes<HTMLElement>) {
  const [minsToNextHour, setMinsToNextHour] = React.useState(minsToHour())

  React.useEffect(() => {
    const interval = setInterval(() => {
      setMinsToNextHour(minsToHour())
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  return (
    <footer className={cn(className)}>
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-4 md:px-0">
          <button className={cn(buttonVariants({ variant: 'outlineWithoutHover' }), 'text-sm')}>
            Next Anchoring in {minsToNextHour}
            {"'"}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Icons.info className="ml-2 h-4 w-4" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">
                    Anchoring is done hourly and
                    <br />
                    the next one is in {minsToNextHour} minutes
                    <br />({nextAnchoringDate().toUTCString()}).
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </button>
          <p className="text-center text-sm leading-loose md:text-left">
            Built by{' '}
            <a href={''} target="_blank" rel="noreferrer" className="font-medium underline underline-offset-4">
              dabuchera & hujens
            </a>
            . Hosted on{' '}
            <a href="https://vercel.com" target="_blank" rel="noreferrer" className="font-medium underline underline-offset-4">
              Vercel
            </a>
            . The source code is available on{' '}
            <a href={'https://github.com/dabuchera'} target="_blank" rel="noreferrer" className="font-medium underline underline-offset-4">
              GitHub
            </a>
            .
          </p>
        </div>

        {<ModeToggle />}
      </div>
    </footer>
  )
}
