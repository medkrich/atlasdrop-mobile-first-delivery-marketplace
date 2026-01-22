import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { EARNINGS_HISTORY } from '@/lib/mock-data';
export function AnalyticsCharts() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={EARNINGS_HISTORY}
        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#FF6B35" stopOpacity={0.15}/>
            <stop offset="95%" stopColor="#FF6B35" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
        <XAxis 
          dataKey="day" 
          axisLine={false} 
          tickLine={false} 
          tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
          dy={10}
        />
        <YAxis 
          axisLine={false} 
          tickLine={false} 
          tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
        />
        <Tooltip 
          contentStyle={{ 
            borderRadius: '16px', 
            border: 'none', 
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            fontSize: '12px',
            fontWeight: 'bold'
          }}
          cursor={{ stroke: '#FF6B35', strokeWidth: 2 }}
        />
        <Area 
          type="monotone" 
          dataKey="volume" 
          stroke="#FF6B35" 
          strokeWidth={4}
          fillOpacity={1} 
          fill="url(#colorVolume)" 
          animationDuration={1500}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}