'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Icons } from '@/components/icons';
import {
    filesArrayToObj, handleTimestamp, handleVerify, isDigestAnchored, isDigestFound,
    nextAnchoringDate
} from '@/helpers/dcrtime';
import { cn } from '@/lib/utils';
import { SidebarNavItem } from '@/types';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip';

import { Button, buttonVariants } from './ui/button';

interface DashboardNavProps {
  items: SidebarNavItem[]
}

const minsToHour = (): number => {
  return 60 - Math.round((new Date().getTime() % 3.6e6) / 6e4)
}

export function DashboardNav({ items }: DashboardNavProps) {
  const path = usePathname()

  const [minsToNextHour, setMinsToNextHour] = useState(minsToHour())

  useEffect(() => {
    const interval = setInterval(() => {
      setMinsToNextHour(minsToHour())
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  if (!items?.length) {
    return null
  }

  return (
    <>
      <button className={cn(buttonVariants({ variant: 'outlineWithoutHover' }), 'text-sm mb-4')}>
        Next Anchoring in {minsToNextHour}{"'"}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Icons.info className="ml-2 h-4 w-4" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs pt-10">
                Anchoring is done hourly and
                <br />
                the next one is in {minsToNextHour} minutes
                <br />({nextAnchoringDate().toUTCString()}).
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </button>
      <nav className="grid items-start gap-2">
        {items.map((item, index) => {
          const Icon = Icons[item.icon || 'arrowRight']
          return (
            item.href && (
              <Link key={index} href={item.disabled ? '/' : item.href}>
                <span
                  className={cn(
                    'group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                    path === item.href ? 'bg-accent' : 'transparent',
                    item.disabled && 'cursor-not-allowed opacity-80'
                  )}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  <span>{item.title}</span>
                </span>
              </Link>
            )
          )
        })}
      </nav>
    </>
  )
}
