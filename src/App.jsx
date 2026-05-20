import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import ToastContainer from './components/common/ToastContainer';
import ProtectedRoute from './routes/ProtectedRoute';
import GuestRoute from './routes/GuestRoute';

// Auth pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

// App pages
import DashboardPage from './pages/dashboard/DashboardPage';
import ApplicationsPage from './pages/applications/ApplicationsPage';
import AddApplicationPage from './pages/applications/AddApplicationPage';
import EditApplicationPage from './pages/applications/EditApplicationPage';
import ApplicationDetailsPage from './pages/applications/ApplicationDetailsPage';
import StatisticsPage from './pages/StatisticsPage';
import SettingsPage from './pages/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <HashRouter>
            <ToastContainer />
            <Routes>
              {/* Root redirect */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />

              {/* Guest-only routes */}
              <Route
                path="/login"
                element={<GuestRoute><LoginPage /></GuestRoute>}
              />
              <Route
                path="/register"
                element={<GuestRoute><RegisterPage /></GuestRoute>}
              />

              {/* Protected routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/applications" element={<ApplicationsPage />} />
                <Route path="/applications/new" element={<AddApplicationPage />} />
                <Route path="/applications/:id" element={<ApplicationDetailsPage />} />
                <Route path="/applications/:id/edit" element={<EditApplicationPage />} />
                <Route path="/statistics" element={<StatisticsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Route>

              {/* 404 */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </HashRouter>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
