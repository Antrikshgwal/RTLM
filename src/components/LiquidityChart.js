// src/components/LiquidityChart.js

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const LiquidityChart = ({ poolData }) => {
  if (!poolData) return <p>Data is unavailable</p>;

  // Prepare data for the chart
  const chartData = [{
    timestamp: 'Current',
    liquidity: parseFloat(poolData.totalValueLockedUSD) || 0, 
  }];

  return (
    <div className="w-full h-64 mt-4">
      <h3 className="text-lg font-bold mb-2">
        Liquidity for {poolData.token0.symbol}/{poolData.token1.symbol}
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
