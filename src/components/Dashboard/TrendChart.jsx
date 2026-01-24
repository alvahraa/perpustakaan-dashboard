import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';

/**
 * TrendChart Component - Smooth Line Animation
 * 
 * Features:
 * - Clean drawing animation using Recharts built-in
 * - Smooth dot appearance
 * - Professional look
 */

// Container animation
const containerVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 20,
      delay: 0.1,
    }
  }
};

// Custom Tooltip
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black text-white px-3 py-2 rounded-lg shadow-lg">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-lg font-bold">{payload[0].value} pengunjung</p>
      </div>
    );
  }
  return null;
};

function TrendChart({ data, loading = false, title = "Trend Kunjungan 7 Hari Terakhir" }) {
  const [animationKey, setAnimationKey] = useState(0);
  const chartData = data?.slice(-7) || [];
  const avgVisits = chartData.reduce((sum, d) => sum + d.visits, 0) / (chartData.length || 1);

  // Replay animation when data changes
  useEffect(() => {
    setAnimationKey(prev => prev + 1);
  }, [data]);

  if (loading) {
    return (
      <div className="card">
        <h3 className="card-header">{title}</h3>
        <div className="h-64 bg-gray-100 dark:bg-dark-800 rounded animate-pulse"></div>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="card hover:shadow-lg transition-shadow duration-300"
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="card-header mb-0">{title}</h3>
        {/* Replay button */}
        <motion.button
          onClick={() => setAnimationKey(prev => prev + 1)}
          className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          title="Replay animation"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M1 4v6h6M23 20v-6h-6" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.button>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            key={animationKey}
            data={chartData}
            margin={{ top: 20, right: 10, left: 0, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e0e0e0"
              className="dark:stroke-dark-border"
              vertical={false}
            />
            <XAxis
              dataKey="dateFormatted"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#666' }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#666' }}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: '#f5f5f5', strokeWidth: 2 }}
            />
            <ReferenceLine
              y={avgVisits}
              stroke="#999"
              strokeDasharray="5 5"
              label={{ value: 'Rata-rata', position: 'right', fontSize: 10, fill: '#999' }}
            />
            <Line
              type="monotone"
              dataKey="visits"
              stroke="#000000"
              strokeWidth={2.5}
              dot={{ fill: '#000', strokeWidth: 0, r: 4 }}
              activeDot={{ fill: '#000', stroke: '#fff', strokeWidth: 2, r: 6 }}
              isAnimationActive={true}
              animationDuration={1500}
              animationEasing="ease-out"
              animationBegin={0}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-border dark:border-dark-border flex items-center justify-between text-sm">
        <div>
          <span className="text-text-secondary dark:text-dark-text-tertiary">Total: </span>
          <span className="font-semibold dark:text-dark-text-primary">
            {chartData.reduce((sum, d) => sum + d.visits, 0).toLocaleString('id-ID')} pengunjung
          </span>
        </div>
        <div>
          <span className="text-text-secondary dark:text-dark-text-tertiary">Rata-rata: </span>
          <span className="font-semibold dark:text-dark-text-primary">
            {Math.round(avgVisits).toLocaleString('id-ID')}/hari
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default TrendChart;
