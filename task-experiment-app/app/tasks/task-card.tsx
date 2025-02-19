"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Database } from "@/lib/database.types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Task = Database["public"]["Tables"]["tasks"]["Row"] & {
  assignee: { id: string; name: string };
  reviewer: { id: string; name: string } | null;
};

const statusColors = {
  "To Do": "bg-slate-500",
  "In Progress": "bg-blue-500",
  Review: "bg-yellow-500",
  Rejected: "bg-red-500",
  Closed: "bg-green-500",
} as const;

export function TaskCard({ task }: { task: Task }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className="p-4 hover:shadow-lg transition-shadow cursor-move"
      {...attributes}
      {...listeners}
    >
      <div className="space-y-2">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold">{task.title}</h3>
          <Badge className={statusColors[task.status]}>{task.status}</Badge>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400">
          {task.description}
        </p>

        <div className="pt-4 flex flex-col gap-2 text-sm">
          <div className="flex items-center gap-2">
            <span className="font-medium">Assignee:</span>
            <span>{task.assignee.name}</span>
          </div>

          {task.reviewer && (
            <div className="flex items-center gap-2">
              <span className="font-medium">Reviewer:</span>
              <span>{task.reviewer.name}</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
