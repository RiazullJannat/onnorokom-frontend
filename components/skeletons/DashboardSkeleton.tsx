import { Skeleton } from './Skeleton';

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <Skeleton className="h-10 w-1/3" />
        <Skeleton className="h-4 w-1/2" />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-2 p-4 border rounded-lg">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-8 w-24" />
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="space-y-4">
        <Skeleton className="h-40 w-full" />
      </div>
    </div>
  );
}
