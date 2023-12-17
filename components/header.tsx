'use client'

import { BedIcon, HomeIcon } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';

// import { Icons } from "@/components/icons"
import {
    NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList,
    navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

export function Header() {
  return (
    <div className="flex mb-10">
      <div className="flex-1">
        <NavigationMenu className="py-5 px-5">
          <NavigationMenuList>
            <NavigationMenuLink asChild>
              <a href="/">
                <HomeIcon size={24} />
              </a>
            </NavigationMenuLink>
            <NavigationMenuItem className="pl-5">
              <Link href="/contracts" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>Contracts</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/dashboard" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>Dashboard</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/docs" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>Documentation</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/testing" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>Test</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  )
}
