import { Skeleton } from './Skeleton';

export function ListPageSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-10 w-32 rounded" />
      </div>

      {/* Filters/Search */}
      <div className="flex gap-4">
        <Skeleton className="h-10 w-64 rounded" />
        <Skeleton className="h-10 w-32 rounded" />
      </div>

      {/* Table Header */}
      <div className="border rounded-lg overflow-hidden">
        <div className="grid grid-cols-5 gap-4 p-4 border-b bg-muted">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>

        {/* Table Rows */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="grid grid-cols-5 gap-4 p-4 border-b last:border-b-0">
            {Array.from({ length: 5 }).map((_, j) => (
              <Skeleton key={j} className="h-4 w-full" />
            ))}
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex gap-2 justify-center">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-8 rounded" />
        ))}
      </div>
    </div>
  );
}
