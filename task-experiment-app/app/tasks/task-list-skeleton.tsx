import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function TaskListSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <Card key={i} className="p-4">
          <div className="space-y-3">
            <div className="flex justify-between items-start">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-5 w-[100px]" />
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[150px]" />
          </div>
        </Card>
      ))}
    </div>
  );
}
