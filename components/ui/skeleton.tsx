import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-lg bg-zinc-800", className)}
      {...props}
    />
  );
}

function SkeletonCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "bg-zinc-900 rounded-xl border border-zinc-800 p-4",
        className
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-4 rounded-full" />
      </div>
      <Skeleton className="h-8 w-16 mb-2" />
      <Skeleton className="h-3 w-20" />
    </div>
  );
}

function SkeletonChart({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "bg-zinc-900 rounded-xl border border-zinc-800 p-4 h-full",
        className
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-4 rounded-full" />
      </div>
      <div className="flex items-end justify-center gap-2 h-[200px] pt-8">
        {[...Array(7)].map((_, i) => (
          <Skeleton
            key={i}
            className="w-8"
            style={{ height: `${Math.random() * 60 + 40}%` }}
          />
        ))}
      </div>
      <div className="flex justify-center gap-4 mt-4">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-3 w-16" />
      </div>
    </div>
  );
}

function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-4">
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-8 w-48 rounded-lg" />
      </div>
      <div className="space-y-3">
        <div className="flex gap-4 border-b border-zinc-800 pb-2">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/4" />
        </div>
        {[...Array(rows)].map((_, i) => (
          <div key={i} className="flex gap-4 py-2">
            <div className="flex items-center gap-3 w-1/4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div>
                <Skeleton className="h-4 w-20 mb-1" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
            <Skeleton className="h-4 w-1/4 my-auto" />
            <Skeleton className="h-4 w-1/4 my-auto" />
            <Skeleton className="h-4 w-1/4 my-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}

function SkeletonCalendar({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "bg-zinc-900 rounded-xl border border-zinc-800 p-4",
        className
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-4 rounded-full" />
      </div>
      <div className="grid grid-cols-7 gap-2 mb-4">
        {[...Array(7)].map((_, i) => (
          <Skeleton key={i} className="h-4 w-full" />
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {[...Array(35)].map((_, i) => (
          <Skeleton key={i} className="h-8 w-full rounded-md" />
        ))}
      </div>
    </div>
  );
}

function SkeletonAnnouncements({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "bg-zinc-900 rounded-xl border border-zinc-800 p-4",
        className
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-zinc-800/50 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-16" />
            </div>
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-3/4 mt-1" />
          </div>
        ))}
      </div>
    </div>
  );
}

export {
  Skeleton,
  SkeletonCard,
  SkeletonChart,
  SkeletonTable,
  SkeletonCalendar,
  SkeletonAnnouncements,
};
