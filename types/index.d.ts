import { Icons } from '@/components/icons';
import { User } from '@prisma/client';

import type { Icon } from 'lucide-react'

export type NavItem = {
  title: string
  href: string
  disabled?: boolean
}

export type MainNavItem = NavItem

export type SidebarNavItem = {
  title: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
} & (
  | {
      href: string
      items?: never
    }
  | {
      href?: string
      items: NavLink[]
    }
)

export type DashboardConfig = {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export type ContractObject = {
  id: string
  title: string
  setPoint: number
  deviation: number
  penalty: number
  checkInterval: string
}

// Dcrtime types
export type InputData = {
  id: string
  payload: string
  digest: string
}

/*  
    0	Invalid
    1	The HASH has been sent to the dcrtime server to be anchored
    2	Hash was already in the server 
*/
export type Digest = {
  digest: string
  result: number
  servertimestamp?: number
  chaininformation?: ChainInformation
}

export type DcrtimeResponse = {
  digests: Digest[]
  id: string
  // servertimestamp: number
}

type MerklePath = {
  NumLeaves: number
  Hashes: number[][] // Assuming Hashes is an array of arrays of numbers
  Flags: string
}

type ChainInformation = {
  chaintimestamp: number
  merklepath: MerklePath
  merkleroot: string
  transaction: string
}

// Types for https://recharts.org/en-US/
export type ChartProps = {
	width?: number | string
	height?: number | string
	data: DataType[]
	colors?: string[]
	dataKeys: string[]
	children?: React.ReactNode
}

export type AreaChartProps = ChartProps & {
	stack?: boolean
}

export type LineChartProps = ChartProps & {}
export type PieChartProps = Omit<ChartProps, 'data'> & {
	data: Record<string, string | number>[][]
	label?: boolean
	nameKeys: string[]
}

export type BarChartProps = ChartProps & {
	stack?: boolean
}
export type DefaultDataType = {
	xAxis?: string
	yAxis?: string
}

export type DataType = DefaultDataType & Record<string, string | number>


