import { Skeleton } from './Skeleton';

export function HomeSkeleton() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="space-y-4 mb-12">
        <Skeleton className="h-16 w-3/4" />
        <Skeleton className="h-6 w-2/3" />
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <Skeleton className="h-32 w-full" />
    </div>
  );
}
