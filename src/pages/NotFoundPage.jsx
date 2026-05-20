import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950 px-6 text-center">
      <div className="mb-6">
        <p className="text-8xl font-extrabold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">404</p>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mt-2">Page not found</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">Looks like this page doesn't exist in your vault.</p>
      </div>
      <Button onClick={() => navigate('/dashboard')} size="lg">Go to Dashboard</Button>
    </div>
  );
};

export default NotFoundPage;
