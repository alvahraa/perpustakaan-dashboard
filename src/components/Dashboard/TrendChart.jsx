import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
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
 * TrendChart Component - Pencil Line Animation
 * 
 * Features:
 * - Smooth pencil-like drawing animation
 * - Custom animated dot that follows the line
 * - Hand-drawn aesthetic feel
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

// Custom Tooltip - matching PeakHoursHeatmap style
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

// Custom animated dot component - pencil tip effect
const AnimatedDot = ({ cx, cy, index, totalPoints, animationProgress }) => {
  const progress = animationProgress || 1;
  const dotProgress = index / (totalPoints - 1);

  // Show dot only when animation reaches this point
  const isVisible = progress >= dotProgress;
  const isActive = progress >= dotProgress && progress < dotProgress + 0.15;

  if (!isVisible || cx === undefined || cy === undefined) return null;

  return (
    <motion.g>
      {/* Pencil tip glow effect when actively drawing */}
      {isActive && (
        <motion.circle
          cx={cx}
          cy={cy}
          r={12}
          fill="rgba(0, 0, 0, 0.1)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.5, 1], opacity: [0, 0.3, 0] }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      )}
      {/* Main dot */}
      <motion.circle
        cx={cx}
        cy={cy}
        r={4}
        fill="#000000"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          delay: dotProgress * 2, // Sync with line animation (2s duration)
          duration: 0.3,
          type: "spring",
          stiffness: 300,
          damping: 20
        }}
      />
    </motion.g>
  );
};

// Custom Line with pencil stroke effect
const CustomizedLine = (props) => {
  const { points, stroke, strokeWidth } = props;

  if (!points || points.length < 2) return null;

  // Create path string
  const pathData = points.reduce((path, point, index) => {
    if (index === 0) {
      return `M ${point.x} ${point.y}`;
    }
    // Use bezier curves for smoother pencil-like strokes
    const prev = points[index - 1];
    const cpX = (prev.x + point.x) / 2;
    return `${path} Q ${prev.x + (point.x - prev.x) * 0.5} ${prev.y} ${cpX} ${(prev.y + point.y) / 2} T ${point.x} ${point.y}`;
  }, '');

  return (
    <motion.path
      d={pathData}
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{
        pathLength: {
          duration: 2,
          ease: [0.43, 0.13, 0.23, 0.96] // Custom easing for pencil feel
        },
        opacity: { duration: 0.2 }
      }}
      style={{
        filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))'
      }}
    />
  );
};

function TrendChart({ data, loading = false, title = "Trend Kunjungan 7 Hari Terakhir" }) {
  const [animationKey, setAnimationKey] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
            <defs>
              {/* Pencil texture filter */}
              <filter id="pencilTexture" x="-20%" y="-20%" width="140%" height="140%">
                <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="1" xChannelSelector="R" yChannelSelector="G" />
              </filter>
            </defs>
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
              dot={(dotProps) => (
                <AnimatedDot
                  {...dotProps}
                  totalPoints={chartData.length}
                />
              )}
              activeDot={{ fill: '#000', stroke: '#fff', strokeWidth: 2, r: 6 }}
              isAnimationActive={true}
              animationDuration={2000}
              animationEasing="ease-out"
              animationBegin={0}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Pencil indicator */}
      <motion.div
        className="flex items-center gap-2 mt-2 text-xs text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
      >
        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
        </svg>
        <span>Animasi pensil</span>
      </motion.div>

      {/* Footer - matching PeakHoursHeatmap pattern */}
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

