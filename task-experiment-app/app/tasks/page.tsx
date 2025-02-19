import { Suspense } from "react";
import TaskList from "./task-list";
import TaskListSkeleton from "./task-list-skeleton";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CreateTaskButton from "./create-task-button";
import { ThemeToggle } from "@/components/theme-toggle";

export default function TasksPage() {
  return (
    <div className="container mx-auto py-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Tasks</h1>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <CreateTaskButton />
        </div>
      </div>

      <Suspense fallback={<TaskListSkeleton />}>
        <TaskList />
      </Suspense>
    </div>
  );
}
