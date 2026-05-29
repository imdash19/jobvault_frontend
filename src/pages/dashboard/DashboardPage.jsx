import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useDashboard } from '../../hooks/useDashboard';
import { useApplications } from '../../hooks/useApplications';
import { DashboardSkeleton } from '../../components/common/Skeleton';
import Card from '../../components/common/Card';
import StatusBadge from '../../components/common/StatusBadge';
import Button from '../../components/common/Button';
import MonthlyChart from '../../components/charts/MonthlyChart';
import PlatformChart from '../../components/charts/PlatformChart';
import StatusChart from '../../components/charts/StatusChart';
import { formatDate, getPlatformLabel } from '../../utils/helpers';

const StatCard = ({ label, value, icon, gradient, change }) => (
  <Card className="relative overflow-hidden group hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
    <div className={`absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity ${gradient}`} />
    <div className="relative z-10">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${gradient} shadow-lg`}>
          <span className="text-white text-xl">{icon}</span>
        </div>
        {change !== undefined && (
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${change >= 0 ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'}`}>
            {change >= 0 ? '+' : ''}{change}%
          </span>
        )}
      </div>
      <p className="text-3xl font-extrabold text-gray-900 dark:text-white mb-1">{value ?? '—'}</p>
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
    </div>
  </Card>
);

const DashboardPage = () => {
  const { user } = useAuth();
  const { stats, monthly, platform, status, loading } = useDashboard();
  const { applications } = useApplications();
  const navigate = useNavigate();

  const recentApps = [...applications]
    .sort((a, b) => new Date(b.applied_date || b.created_at) - new Date(a.applied_date || a.created_at))
    .slice(0, 5);

  const statCards = [
    {
      label: 'Total Applications',
      value: stats?.total ?? applications.length,
      icon: '📋',
      gradient: 'bg-gradient-to-br from-indigo-500 to-indigo-700',
    },
    {
      label: 'Interviews',
      value: stats?.interviews ?? applications.filter(a => ['interview', 'technical'].includes(a.status)).length,
      icon: '🎯',
      gradient: 'bg-gradient-to-br from-purple-500 to-purple-700',
    },
    {
      label: 'Offers',
      value: stats?.offers ?? applications.filter(a => a.status === 'offer').length,
      icon: '🏆',
      gradient: 'bg-gradient-to-br from-green-500 to-emerald-700',
    },
    {
      label: 'Rejections',
      value: stats?.rejected ?? applications.filter(a => a.status === 'rejected').length,
      icon: '❌',
      gradient: 'bg-gradient-to-br from-red-500 to-red-700',
    },
  ];

  if (loading) return <DashboardSkeleton />;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">
            Welcome back, {user?.first_name || user?.username}! 👋
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Here's what's happening with your job search today.
          </p>
        </div>
        <Button
          onClick={() => navigate('/applications/new')}
          icon={
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          }
        >
          Add Application
        </Button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-bold text-gray-900 dark:text-white">Applications per Month</h2>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Monthly application trend</p>
            </div>
            <span className="text-2xl">📈</span>
          </div>
          <MonthlyChart data={monthly} />
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-bold text-gray-900 dark:text-white">Platform Distribution</h2>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Where you're applying most</p>
            </div>
            <span className="text-2xl">🌐</span>
          </div>
          <PlatformChart data={platform} />
        </Card>
      </div>

      {/* Status chart + Recent Applications */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-bold text-gray-900 dark:text-white">Status Overview</h2>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Application status breakdown</p>
            </div>
            <span className="text-2xl">📊</span>
          </div>
          <StatusChart data={status} />
        </Card>

        <Card className="lg:col-span-3" padding={false}>
          <div className="px-6 py-5 border-b border-gray-200/60 dark:border-gray-700/60 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-gray-900 dark:text-white">Recent Applications</h2>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Your latest submissions</p>
            </div>
            <button
              onClick={() => navigate('/applications')}
              className="text-indigo-600 dark:text-indigo-400 text-xs font-semibold hover:underline"
            >
              View all →
            </button>
          </div>

          {recentApps.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center px-6">
              <span className="text-5xl mb-3">📭</span>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">No applications yet</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 mb-4">Start tracking your first job application</p>
              <Button size="sm" onClick={() => navigate('/applications/new')}>Add Application</Button>
            </div>
          ) : (
            <div className="divide-y divide-gray-100 dark:divide-gray-800/60">
              {recentApps.map((app) => (
                <div
                  key={app.id}
                  onClick={() => navigate(`/applications/${app.id}`)}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800/40 cursor-pointer transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/40 dark:to-purple-900/40 flex items-center justify-center shrink-0">
                    <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                      {(app.company_name || 'A')[0].toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {app.company_name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{app.job_role}</p>
                  </div>
                  <div className="shrink-0 flex flex-col items-end gap-1.5">
                    <StatusBadge status={app.status} />
                    <p className="text-xs text-gray-400 dark:text-gray-500">{formatDate(app.applied_date)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
