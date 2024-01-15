import { HomeIcon } from 'lucide-react';
import * as React from 'react';

import {
    NavigationMenu, NavigationMenuLink, NavigationMenuList
} from '@/components/ui/navigation-menu';

import LogoutButton from './logout-button';

export function Header() {
  return (
    <div className="flex">
      <div className="flex-1 py-5 px-5">
        <div className="flex justify-between">
          <HomeIcon href="/" size={24} />
          <LogoutButton />
        </div>
        {/* <NavigationMenu className="py-5 px-5"> */}
        {/* <NavigationMenuList> */}
        {/* <NavigationMenuLink asChild> */}
        {/* <a href="/">
                <HomeIcon href="/" size={24} />
              </a> */}
        {/* </NavigationMenuLink> */}
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
        {/* </NavigationMenuList> */}
        {/* </NavigationMenu> */}
      </div>
    </div>
  )
}
