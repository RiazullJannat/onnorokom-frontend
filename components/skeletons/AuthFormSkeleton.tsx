import { Skeleton } from './Skeleton';

export default function AuthFormSkeleton() {
  return (
    <div className="w-full max-w-md space-y-6">
      {/* Header */}
      <div className="space-y-2 text-center">
        <Skeleton className="h-8 w-48 mx-auto" />
        <Skeleton className="h-4 w-64 mx-auto" />
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full rounded" />
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <Skeleton className="h-10 w-full rounded" />

      {/* Footer Link */}
      <div className="text-center">
        <Skeleton className="h-4 w-40 mx-auto" />
      </div>
    </div>
  );
}
