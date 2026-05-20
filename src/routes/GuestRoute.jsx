import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PageLoader } from '../components/common/Spinner';

const GuestRoute = ({ children }) => {
  const { user, loading, initialized } = useAuth();

  if (!initialized || loading) return <PageLoader />;
  if (user) return <Navigate to="/dashboard" replace />;

  return children;
};

export default GuestRoute;
