'use client'

import { HomeIcon } from 'lucide-react';
import * as React from 'react';

import {
    NavigationMenu, NavigationMenuLink, NavigationMenuList
} from '@/components/ui/navigation-menu';

export function Header() {
  return (
    <div className="flex">
      <div className="flex-1">
        <NavigationMenu className="py-5 px-5">
          <NavigationMenuList>
            <NavigationMenuLink asChild>
              <a href="/">
                <HomeIcon size={24} />
              </a>
            </NavigationMenuLink>
            {/* <NavigationMenuItem>
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
              <Link href="/various" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>Various</NavigationMenuLink>
              </Link>
            </NavigationMenuItem> */}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  )
}
