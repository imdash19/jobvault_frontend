import { forwardRef } from 'react';

const Input = forwardRef(({
  label,
  error,
  helperText,
  icon,
  iconRight,
  className = '',
  required,
  ...props
}, ref) => {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none">
            {icon}
          </span>
        )}
        <input
          ref={ref}
          className={`
            w-full px-4 py-2.5 text-sm rounded-xl border transition-all duration-200
            bg-white dark:bg-gray-800/80
            text-gray-900 dark:text-gray-100
            placeholder-gray-400 dark:placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
            ${error
              ? 'border-red-400 dark:border-red-500 focus:ring-red-500 focus:border-red-500'
              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }
            ${icon ? 'pl-10' : ''}
            ${iconRight ? 'pr-10' : ''}
          `}
          {...props}
        />
        {iconRight && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
            {iconRight}
          </span>
        )}
      </div>
      {error && <p className="text-xs text-red-500 dark:text-red-400 flex items-center gap-1">
        <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" />
        </svg>
        {error}
      </p>}
      {helperText && !error && <p className="text-xs text-gray-500 dark:text-gray-400">{helperText}</p>}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
