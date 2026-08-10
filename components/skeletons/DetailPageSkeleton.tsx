import { Skeleton } from './Skeleton';

export function DetailPageSkeleton() {
  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex gap-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <Skeleton className="h-4 w-20" />
            {i < 2 && <Skeleton className="h-4 w-2" />}
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="space-y-4">
        <Skeleton className="h-12 w-2/3" />
        <div className="flex gap-4">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-6 w-32" />
        </div>
      </div>

      {/* Hero Image/Section */}
      <Skeleton className="h-64 w-full rounded-lg" />

      {/* Content Sections */}
      <div className="grid grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="col-span-2 space-y-6">
          {/* Section 1 */}
          <div className="space-y-4">
            <Skeleton className="h-6 w-40" />
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </div>

          {/* Section 2 */}
          <div className="space-y-4">
            <Skeleton className="h-6 w-40" />
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="border rounded-lg p-4 space-y-4">
            <Skeleton className="h-6 w-full" />
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
