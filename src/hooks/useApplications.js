import { useState, useEffect } from 'react';
import { applicationService } from '../services/applicationService';
import { useToast } from '../context/ToastContext';
import { getErrorMessage } from '../utils/helpers';

export const useApplications = (params = {}) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const { toast } = useToast();

  const fetch = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await applicationService.getAll(params);
      if (Array.isArray(data)) {
        setApplications(data);
        setTotal(data.length);
      } else if (data.results) {
        setApplications(data.results);
        setTotal(data.count || data.results.length);
      } else {
        setApplications([]);
        setTotal(0);
      }
    } catch (err) {
      const msg = getErrorMessage(err);
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(params)]);

  return { applications, loading, error, total, refetch: fetch };
};
