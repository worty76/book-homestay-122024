import { Skeleton } from "@/components/ui/skeleton";

export default function RoomDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="h-10 w-3/4 mb-2">
          <Skeleton className="h-full w-full" />
        </div>
        <div className="h-5 w-1/2">
          <Skeleton className="h-full w-full" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="h-[400px] w-full mb-8">
            <Skeleton className="h-full w-full" />
          </div>
          <div className="h-[200px] w-full mb-8">
            <Skeleton className="h-full w-full" />
          </div>
          <div className="h-[300px] w-full mb-8">
            <Skeleton className="h-full w-full" />
          </div>
          <div className="h-[250px] w-full">
            <Skeleton className="h-full w-full" />
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="h-[500px] w-full sticky top-8">
            <Skeleton className="h-full w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
