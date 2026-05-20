import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { CHART_COLORS } from '../../utils/constants';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 shadow-xl text-sm">
        <p className="font-semibold" style={{ color: payload[0].payload.fill }}>
          {payload[0].name}
        </p>
        <p className="text-gray-600 dark:text-gray-400 font-bold">{payload[0].value} applications</p>
      </div>
    );
  }
  return null;
};

const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  if (percent < 0.05) return null;
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight={700}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const PlatformChart = ({ data = [] }) => {
  const normalized = data.map((d) => ({
    name: d.platform || d.name || d.label || '',
    value: d.count || d.value || 0,
  }));

  if (!normalized.length) return (
    <div className="flex items-center justify-center h-48 text-gray-400 dark:text-gray-500 text-sm">No data yet</div>
  );

  return (
    <div className="w-full flex justify-center overflow-hidden">
      <PieChart width={400} height={240}>
        <Pie
          data={normalized}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomLabel}
          outerRadius={95}
          dataKey="value"
          isAnimationActive={false}
        >
          {normalized.map((_, index) => (
            <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend
          formatter={(value) => <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{value}</span>}
        />
      </PieChart>
    </div>
  );
};

export default PlatformChart;
