import { Skeleton } from './Skeleton';

export function ProfileSkeleton() {
  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="space-y-2">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-4 w-64" />
      </div>

      {/* Profile Card */}
      <div className="border rounded-lg p-8 space-y-6">
        {/* Avatar and Basic Info */}
        <div className="flex items-start gap-6">
          <Skeleton className="h-32 w-32 rounded-full" />
          <div className="flex-1 space-y-4">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-64" />
            <Skeleton className="h-4 w-56" />
          </div>
        </div>

        {/* Divider */}
        <div className="border-t" />

        {/* Form Fields */}
        <div className="grid grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full rounded" />
            </div>
          ))}
        </div>

        {/* Full Width Fields */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-20 w-full rounded" />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-6 border-t">
          <Skeleton className="h-10 w-32 rounded" />
          <Skeleton className="h-10 w-32 rounded" />
        </div>
      </div>
    </div>
  );
}
