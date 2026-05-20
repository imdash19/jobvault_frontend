import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';
import { authService } from '../services/authService';
import { getErrorMessage } from '../utils/helpers';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

const SettingsPage = () => {
  const { user, updateUser } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const { toast } = useToast();
  const [profileLoading, setProfileLoading] = useState(false);
  const [pwLoading, setPwLoading] = useState(false);

  const { register: regProfile, handleSubmit: handleProfile, formState: { errors: profileErrors } } = useForm({
    defaultValues: {
      first_name: user?.first_name || '',
      last_name: user?.last_name || '',
      email: user?.email || '',
    },
  });

  const { register: regPw, handleSubmit: handlePw, reset: resetPw, watch, formState: { errors: pwErrors } } = useForm();
  const newPassword = watch('new_password');

  const onProfileSubmit = async (data) => {
    setProfileLoading(true);
    try {
      const updated = await authService.updateProfile(data);
      updateUser({ ...user, ...updated });
      toast.success('Profile updated successfully!');
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setProfileLoading(false);
    }
  };

  const onPasswordSubmit = async (data) => {
    setPwLoading(true);
    try {
      await authService.changePassword({
        old_password: data.old_password,
        new_password: data.new_password,
      });
      toast.success('Password changed successfully!');
      resetPw();
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setPwLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your account preferences</p>
      </div>

      {/* Profile */}
      <Card>
        <div className="flex items-center gap-4 mb-6 pb-5 border-b border-gray-100 dark:border-gray-700/60">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-xl font-extrabold text-white shadow-lg">
            {(user?.first_name?.[0] || user?.username?.[0] || 'U').toUpperCase()}
          </div>
          <div>
            <p className="text-base font-bold text-gray-900 dark:text-white">
              {user?.first_name ? `${user.first_name} ${user.last_name}` : user?.username}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
          </div>
        </div>

        <h2 className="text-base font-bold text-gray-900 dark:text-white mb-5">Profile Information</h2>
        <form onSubmit={handleProfile(onProfileSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="First Name"
              placeholder="John"
              error={profileErrors.first_name?.message}
              {...regProfile('first_name', { required: 'Required' })}
            />
            <Input
              label="Last Name"
              placeholder="Doe"
              error={profileErrors.last_name?.message}
              {...regProfile('last_name', { required: 'Required' })}
            />
          </div>
          <Input
            label="Email"
            type="email"
            placeholder="john@example.com"
            error={profileErrors.email?.message}
            {...regProfile('email', {
              required: 'Required',
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' },
            })}
          />
          <div className="pt-2">
            <Button type="submit" loading={profileLoading} size="md">Save Profile</Button>
          </div>
        </form>
      </Card>

      {/* Appearance */}
      <Card>
        <h2 className="text-base font-bold text-gray-900 dark:text-white mb-5">Appearance</h2>
        <div className="flex items-center justify-between py-2">
          <div>
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">Dark Mode</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Toggle dark theme across the app</p>
          </div>
          <button
            onClick={toggleDarkMode}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 ${
              darkMode ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'
            }`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform duration-300 ${darkMode ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>
      </Card>

      {/* Change Password */}
      <Card>
        <h2 className="text-base font-bold text-gray-900 dark:text-white mb-5">Change Password</h2>
        <form onSubmit={handlePw(onPasswordSubmit)} className="space-y-4">
          <Input
            label="Current Password"
            type="password"
            placeholder="Enter current password"
            error={pwErrors.old_password?.message}
            {...regPw('old_password', { required: 'Current password is required' })}
          />
          <Input
            label="New Password"
            type="password"
            placeholder="Min. 8 characters"
            error={pwErrors.new_password?.message}
            {...regPw('new_password', {
              required: 'New password is required',
              minLength: { value: 8, message: 'Minimum 8 characters' },
            })}
          />
          <Input
            label="Confirm New Password"
            type="password"
            placeholder="Repeat new password"
            error={pwErrors.confirm_password?.message}
            {...regPw('confirm_password', {
              required: 'Required',
              validate: (v) => v === newPassword || 'Passwords do not match',
            })}
          />
          <div className="pt-2">
            <Button type="submit" loading={pwLoading} variant="outline" size="md">Change Password</Button>
          </div>
        </form>
      </Card>

      {/* Account info */}
      <Card>
        <h2 className="text-base font-bold text-gray-900 dark:text-white mb-4">Account</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700/60">
            <span className="text-sm text-gray-600 dark:text-gray-400">Username</span>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">{user?.username}</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Account Status</span>
            <span className="text-xs font-semibold px-2.5 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full">Active</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SettingsPage;
