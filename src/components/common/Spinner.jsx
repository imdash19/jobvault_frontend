const Spinner = ({ size = 'md', className = '' }) => {
  const sizes = { sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12', xl: 'w-16 h-16' };
  return (
    <svg
      className={`animate-spin text-indigo-600 dark:text-indigo-400 ${sizes[size] || sizes.md} ${className}`}
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
    </svg>
  );
};

export const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-950">
    <div className="flex flex-col items-center gap-4">
      <Spinner size="xl" />
      <p className="text-sm text-gray-500 dark:text-gray-400 font-medium animate-pulse">Loading…</p>
    </div>
  </div>
);

export const SectionLoader = () => (
  <div className="flex items-center justify-center py-20">
    <Spinner size="lg" />
  </div>
);

export default Spinner;
