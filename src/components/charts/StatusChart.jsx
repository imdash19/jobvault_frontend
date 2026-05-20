import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import { STATUS_COLORS, CHART_COLORS } from '../../utils/constants';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 shadow-xl text-sm">
        <p className="font-semibold text-gray-700 dark:text-gray-300 capitalize mb-1">{label}</p>
        <p className="font-bold text-indigo-600 dark:text-indigo-400">{payload[0].value} applications</p>
      </div>
    );
  }
  return null;
};

const statusColorMap = {
  'Applied': '#3b82f6',
  'Assessment': '#f59e0b',
  'Interview Scheduled': '#8b5cf6',
  'HR Round': '#6366f1',
  'Offer Received': '#10b981',
  'Rejected': '#ef4444',
  'Joined': '#9ca3af',
};

const StatusChart = ({ data = [] }) => {
  const normalized = data.map((d) => ({
    status: d.status || d.name || d.label || '',
    count: d.count || d.value || 0,
  }));

  if (!normalized.length) return (
    <div className="flex items-center justify-center h-48 text-gray-400 dark:text-gray-500 text-sm">No data yet</div>
  );

  return (
    <div className="w-full flex justify-center overflow-hidden">
      <BarChart width={500} height={240} data={normalized} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:opacity-20" vertical={false} />
        <XAxis
          dataKey="status"
          tick={{ fontSize: 11, fill: '#9ca3af', textTransform: 'capitalize' }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => v.charAt(0).toUpperCase() + v.slice(1)}
        />
        <YAxis
          tick={{ fontSize: 11, fill: '#9ca3af' }}
          axisLine={false}
          tickLine={false}
          allowDecimals={false}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(99,102,241,0.05)', radius: 8 }} />
        <Bar dataKey="count" radius={[8, 8, 0, 0]} maxBarSize={48} isAnimationActive={false}>
          {normalized.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={statusColorMap[entry.status] || CHART_COLORS[index % CHART_COLORS.length]}
            />
          ))}
        </Bar>
      </BarChart>
    </div>
  );
};

export default StatusChart;
