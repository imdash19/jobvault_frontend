import { useDashboard } from '../hooks/useDashboard';
import { useApplications } from '../hooks/useApplications';
import Card from '../components/common/Card';
import MonthlyChart from '../components/charts/MonthlyChart';
import PlatformChart from '../components/charts/PlatformChart';
import StatusChart from '../components/charts/StatusChart';
import { DashboardSkeleton } from '../components/common/Skeleton';
import { STATUS_OPTIONS, PLATFORM_OPTIONS } from '../utils/constants';

const StatRow = ({ label, value, max, color }) => {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-gray-700 dark:text-gray-300">{label}</span>
        <span className="font-bold text-gray-900 dark:text-white">{value} <span className="text-gray-400 font-normal text-xs">({pct}%)</span></span>
      </div>
      <div className="h-2.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
};

const StatisticsPage = () => {
  const { stats, monthly, platform, status, loading } = useDashboard();
  const { applications } = useApplications();

  if (loading) return <DashboardSkeleton />;

  const total = applications.length;

  const statusCounts = STATUS_OPTIONS.map((s) => ({
    ...s,
    count: applications.filter((a) => a.status === s.value).length,
  }));

  const platformCounts = PLATFORM_OPTIONS.map((p) => ({
    ...p,
    count: applications.filter((a) => a.applied_platform === p.value).length,
  })).filter((p) => p.count > 0);

  const colorMap = {
    'Applied': 'bg-blue-500',
    'Assessment': 'bg-yellow-500',
    'Interview Scheduled': 'bg-purple-500',
    'HR Round': 'bg-indigo-500',
    'Offer Received': 'bg-green-500',
    'Rejected': 'bg-red-500',
    'Joined': 'bg-gray-400',
  };

  const topPlatformColor = [
    'bg-indigo-500', 'bg-purple-500', 'bg-cyan-500', 'bg-green-500',
    'bg-yellow-500', 'bg-red-500', 'bg-pink-500',
  ];

  const successRate = total > 0
    ? Math.round(((stats?.total_offers ?? applications.filter(a => a.status === 'Offer Received').length) / total) * 100)
    : 0;

  const interviewRate = total > 0
    ? Math.round(((stats?.total_interviews ?? applications.filter(a => ['Interview Scheduled', 'HR Round'].includes(a.status)).length) / total) * 100)
    : 0;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">Statistics</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Deep dive into your job search analytics</p>
      </div>

      {/* Summary KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Applied', value: total, icon: '📋', gradient: 'from-indigo-500 to-indigo-700' },
          { label: 'Interview Rate', value: `${interviewRate}%`, icon: '🎯', gradient: 'from-purple-500 to-purple-700' },
          { label: 'Offer Rate', value: `${successRate}%`, icon: '🏆', gradient: 'from-green-500 to-emerald-700' },
          { label: 'Rejections', value: stats?.total_rejections ?? applications.filter(a => a.status === 'Rejected').length, icon: '❌', gradient: 'from-red-500 to-red-700' },
        ].map((kpi) => (
          <Card key={kpi.label} className="relative overflow-hidden group hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
            <div className={`absolute inset-0 bg-gradient-to-br ${kpi.gradient} opacity-5 group-hover:opacity-10 transition-opacity`} />
            <div className="relative z-10">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${kpi.gradient} flex items-center justify-center mb-3 shadow-md`}>
                <span className="text-lg">{kpi.icon}</span>
              </div>
              <p className="text-2xl font-extrabold text-gray-900 dark:text-white">{kpi.value}</p>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-0.5">{kpi.label}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-1">Monthly Trend</h2>
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-5">Applications submitted per month</p>
          <MonthlyChart data={monthly} />
        </Card>
        <Card>
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-1">Platform Distribution</h2>
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-5">Where you're applying most</p>
          <PlatformChart data={platform} />
        </Card>
      </div>

      <Card>
        <h2 className="text-base font-bold text-gray-900 dark:text-white mb-1">Status Breakdown</h2>
        <p className="text-xs text-gray-400 dark:text-gray-500 mb-5">Your application funnel</p>
        <StatusChart data={status} />
      </Card>

      {/* Bar breakdowns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-5">By Status</h2>
          <div className="space-y-4">
            {statusCounts.filter(s => s.count > 0).map((s) => (
              <StatRow key={s.value} label={s.label} value={s.count} max={total} color={colorMap[s.value] || 'bg-indigo-500'} />
            ))}
            {statusCounts.every(s => s.count === 0) && (
              <p className="text-sm text-gray-400 dark:text-gray-500 text-center py-4">No data yet</p>
            )}
          </div>
        </Card>

        <Card>
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-5">By Platform</h2>
          <div className="space-y-4">
            {platformCounts.map((p, i) => (
              <StatRow key={p.value} label={p.label} value={p.count} max={total} color={topPlatformColor[i % topPlatformColor.length]} />
            ))}
            {platformCounts.length === 0 && (
              <p className="text-sm text-gray-400 dark:text-gray-500 text-center py-4">No data yet</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default StatisticsPage;
