// src/components/LiquidityChart.js

import React, { useMemo, useState} from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const LiquidityChart = ({ poolData }) => {
  // Generate chart data outside of conditional rendering
  const chartData = useMemo(() => {
    if (!poolData) return [];
    
    // Simulate historical liquidity data for demonstration purposes
    return Array.from({ length: 10 }, (_, index) => ({
      timestamp: `Day ${index + 1}`,
      liquidity: parseFloat(poolData.totalValueLockedUSD) * (1 + Math.random() * 0.1 * (index % 2 === 0 ? 1 : -1)),
    }));
  }, [poolData]);

  if (!poolData) return <p>Data is unavailable</p>;

  return (
    <div className="w-full h-64 mt-4">
      <h3 className="text-lg font-bold mb-2">
        Liquidity History for {poolData.token0.symbol}/{poolData.token1.symbol} is not Available
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis 
            dataKey="liquidity"
            tickFormatter={(value) => `$${value.toLocaleString()}`} 
          />
          <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
          <Line
            type="monotone"
            dataKey="liquidity"
            stroke="#8884d8"
            strokeWidth={2}
            dot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LiquidityChart;
