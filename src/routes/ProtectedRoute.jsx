import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PageLoader } from '../components/common/Spinner';
import AppLayout from '../components/layout/AppLayout';

const ProtectedRoute = () => {
  const { user, loading, initialized } = useAuth();

  if (!initialized || loading) return <PageLoader />;
  if (!user) return <Navigate to="/login" replace />;

  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
};

export default ProtectedRoute;
