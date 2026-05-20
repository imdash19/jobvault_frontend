const SkeletonBox = ({ className = '' }) => (
  <div className={`skeleton rounded-xl bg-gray-200 dark:bg-gray-700 ${className}`} />
);

export const CardSkeleton = () => (
  <div className="bg-white dark:bg-gray-800/60 border border-gray-200/60 dark:border-gray-700/60 rounded-2xl p-6 space-y-3">
    <SkeletonBox className="h-4 w-1/3" />
    <SkeletonBox className="h-8 w-1/2" />
    <SkeletonBox className="h-3 w-2/3" />
  </div>
);

export const TableRowSkeleton = ({ cols = 6 }) => (
  <tr>
    {Array.from({ length: cols }).map((_, i) => (
      <td key={i} className="px-4 py-3">
        <SkeletonBox className="h-4 w-full" />
      </td>
    ))}
  </tr>
);

export const DashboardSkeleton = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => <CardSkeleton key={i} />)}
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {[...Array(2)].map((_, i) => (
        <div key={i} className="bg-white dark:bg-gray-800/60 border border-gray-200/60 dark:border-gray-700/60 rounded-2xl p-6">
          <SkeletonBox className="h-5 w-1/3 mb-6" />
          <SkeletonBox className="h-48 w-full" />
        </div>
      ))}
    </div>
  </div>
);

export default SkeletonBox;
