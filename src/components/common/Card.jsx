const Card = ({ children, className = '', hover = false, padding = true, ...props }) => {
  return (
    <div
      className={`
        bg-white dark:bg-gray-800/60 backdrop-blur-sm
        border border-gray-200/60 dark:border-gray-700/60
        rounded-2xl shadow-sm
        ${padding ? 'p-6' : ''}
        ${hover ? 'hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-700/50 transition-all duration-200 cursor-pointer' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
