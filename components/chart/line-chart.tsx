'use client'
import React from 'react';
import { Line, LineChart as LineRechart, ResponsiveContainer } from 'recharts';

import { LineChartProps } from '@/types';

import { EmptyPlaceholder } from '../empty-placeholder';

const LineChart = ({ width = '100%', height = 350, data, colors, dataKeys, children }: LineChartProps) => {
  return (
    <ResponsiveContainer width={width} height={height}>
      {dataKeys.length === 0 ? (
        <EmptyPlaceholder className='h-[350px]'>
		<EmptyPlaceholder.Icon name="lineChart" />
		<EmptyPlaceholder.Title>No datasets selected</EmptyPlaceholder.Title>
		<EmptyPlaceholder.Description>You don&apos;t have any datasets selected yet.</EmptyPlaceholder.Description>
	  </EmptyPlaceholder>
      ) : (
        <LineRechart data={data}>
          {children}
          {dataKeys.map((dkey, index) => (
            <Line
              key={index}
              // type="monotone"
              type="monotone"
              dataKey={dkey}
              dot={false}
              stroke={colors ? colors[index] : 'black'}
              strokeWidth={2}
              fillOpacity={1}
              fill={`url(#color-${index})`}
            />
          ))}
        </LineRechart>
      )}
    </ResponsiveContainer>
  )
}

export default LineChart
