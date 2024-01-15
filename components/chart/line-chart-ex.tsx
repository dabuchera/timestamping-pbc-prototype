'use client'

import React, { PureComponent, useState } from 'react';
import { CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { db } from '@/lib/db';

import { DropdownMenuCheckboxItem } from '../ui/dropdown-menu';
import { MultiSelect } from '../ui/multi-select';
import {
    Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue
} from '../ui/select';
import LineChart from './line-chart';

type Props = {}
const data = [
  {
    xAxis: 'Mon',
    uk: 4000,
    us: 2400,
  },
  {
    xAxis: 'Tue',
    // uk: 3000,
    us: 1398,
  },
  {
    xAxis: 'Wed',
    uk: 2000,
    us: 9800,
  },
  {
    xAxis: 'Thu',
    uk: 2780,
    us: 3908,
  },
  {
    xAxis: 'Fri',
    uk: 1890,
    us: 4800,
  },
  {
    xAxis: 'Sat',
    uk: 2390,
    us: 3800,
  },
]
// const dataKeys = ['1', '2', '3']
// const dataKeys = ['uk']
const colors = ['#ec6782', '#c39efe']

interface LineChartExProps {
  data: any
  names: string[]
}

export default function LineChartEx({ data, names }: LineChartExProps) {
  const [selected, setSelected] = useState<string[]>([])

  const options = names.map((name) => ({ value: name, label: name }))

  return (
    <>
      <LineChart data={data} colors={colors} dataKeys={selected}>
        <Tooltip labelClassName='text-yellow-500'/>
        <Legend />
        <XAxis dataKey="timestamp" stroke="#3d3b3b" fontSize={12} tickLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value: number) => `${value}°`} />
        <CartesianGrid />
      </LineChart>
      <div className="flex flex-row justify-between">
        <div className="flex items-center">
          <h2>Choose Datasets</h2>
        </div>
        <div className="w-4/5">
          <MultiSelect options={options} selected={selected} onChange={setSelected} />
        </div>
      </div>
    </>
  )
}
