'use client'
import React from 'react';
import { Line, LineChart as LineRechart, ResponsiveContainer } from 'recharts';

import { LineChartProps } from '@/types';

const LineChart = ({
	width = '100%',
	height = 350,
	data,
	colors,
	dataKeys,
	children,
}: LineChartProps) => {
	return (
		<ResponsiveContainer width={width} height={height}>
			<LineRechart data={data}>
				{children}
				{dataKeys.map((dkey, index) => (
					<Line
						key={index}
						type="monotone"
						dataKey={dkey}
						stroke={colors ? colors[index] : 'black'}
						strokeWidth={2}
						fillOpacity={1}
						fill={`url(#color-${index})`}
					/>
				))}
			</LineRechart>
		</ResponsiveContainer>
	)
}

export default LineChart