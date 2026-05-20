export const STATUS_OPTIONS = [
  { value: 'Applied', label: 'Applied', color: 'blue' },
  { value: 'Assessment', label: 'Assessment', color: 'yellow' },
  { value: 'Interview Scheduled', label: 'Interview Scheduled', color: 'purple' },
  { value: 'HR Round', label: 'HR Round', color: 'indigo' },
  { value: 'Offer Received', label: 'Offer Received', color: 'green' },
  { value: 'Rejected', label: 'Rejected', color: 'red' },
  { value: 'Joined', label: 'Joined', color: 'gray' },
];

export const PLATFORM_OPTIONS = [
  { value: 'LinkedIn', label: 'LinkedIn' },
  { value: 'Naukri', label: 'Naukri' },
  { value: 'Indeed', label: 'Indeed' },
  { value: 'Wellfound', label: 'Wellfound' },
  { value: 'Internshala', label: 'Internshala' },
  { value: 'Foundit', label: 'Foundit' },
  { value: 'Company Website', label: 'Company Website' },
  { value: 'Referral', label: 'Referral' },
  { value: 'Naresh IT Placement Cell', label: 'Naresh IT Placement Cell' },
  { value: 'Other', label: 'Other' },
];

export const STATUS_COLORS = {
  'Applied': { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-300', dot: 'bg-blue-500' },
  'Assessment': { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-700 dark:text-yellow-300', dot: 'bg-yellow-500' },
  'Interview Scheduled': { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-700 dark:text-purple-300', dot: 'bg-purple-500' },
  'HR Round': { bg: 'bg-indigo-100 dark:bg-indigo-900/30', text: 'text-indigo-700 dark:text-indigo-300', dot: 'bg-indigo-500' },
  'Offer Received': { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-300', dot: 'bg-green-500' },
  'Rejected': { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-300', dot: 'bg-red-500' },
  'Joined': { bg: 'bg-gray-100 dark:bg-gray-700/50', text: 'text-gray-600 dark:text-gray-400', dot: 'bg-gray-400' },
};

export const CHART_COLORS = ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#ec4899'];

export const TODAY = new Date().toISOString().split('T')[0];
