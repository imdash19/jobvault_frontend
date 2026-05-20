import { useState, useEffect, useCallback } from 'react';
import { dashboardService } from '../services/dashboardService';
import { getErrorMessage } from '../utils/helpers';

export const useDashboard = () => {
  const [stats, setStats] = useState(null);
  const [monthly, setMonthly] = useState([]);
  const [platform, setPlatform] = useState([]);
  const [status, setStatus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [statsData, monthlyData, platformData, statusData] = await Promise.all([
        dashboardService.getStats(),
        dashboardService.getMonthly(),
        dashboardService.getPlatform(),
        dashboardService.getStatus(),
      ]);
      setStats(statsData);
      setMonthly(monthlyData?.monthly_stats || []);
      setPlatform(platformData?.platform_stats || []);
      setStatus(statusData?.status_stats || []);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return { stats, monthly, platform, status, loading, error, refetch: fetchAll };
};
