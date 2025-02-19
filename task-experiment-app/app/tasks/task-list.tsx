"use client";

import { useEffect, useState } from "react";
import { taskApi } from "@/lib/api";
import { Database } from "@/lib/database.types";
import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { TaskCard } from "@/app/tasks/task-card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Task = Database["public"]["Tables"]["tasks"]["Row"] & {
  assignee: { id: string; name: string };
  reviewer: { id: string; name: string } | null;
};

const STATUSES = [
  "To Do",
  "In Progress",
  "Review",
  "Rejected",
  "Closed",
] as const;

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [view, setView] = useState<"grid" | "kanban">("grid");

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  useEffect(() => {
    const loadTasks = async () => {
      const data = await taskApi.getTasks();
      setTasks(data as Task[]);
    };
    loadTasks();
  }, []);

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || task.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const kanbanTasks = STATUSES.reduce(
    (acc, status) => ({
      ...acc,
      [status]: tasks.filter(
        (task) =>
          task.status === status &&
          task.title.toLowerCase().includes(search.toLowerCase())
      ),
    }),
    {} as Record<(typeof STATUSES)[number], Task[]>
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as (typeof STATUSES)[number];

    try {
      await taskApi.updateTask(taskId, { status: newStatus });
      setTasks(
        tasks.map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task
        )
      );
    } catch (error) {
      console.error("Failed to update task status:", error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4 items-center">
        <Input
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <Tabs
          value={view}
          onValueChange={(v) => setView(v as "grid" | "kanban")}
        >
          <TabsList>
            <TabsTrigger value="grid">Grid</TabsTrigger>
            <TabsTrigger value="kanban">Kanban</TabsTrigger>
          </TabsList>
        </Tabs>
        {view === "grid" && (
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              {STATUSES.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {view === "grid" ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      ) : (
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-5 gap-4">
            {STATUSES.map((status) => (
              <div key={status} className="space-y-4" id={status}>
                <div className="font-semibold text-sm p-3 bg-muted rounded-lg">
                  {status}
                  <span className="ml-2 text-muted-foreground">
                    {kanbanTasks[status].length}
                  </span>
                </div>
                <SortableContext
                  items={kanbanTasks[status].map((t) => t.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-2">
                    {kanbanTasks[status].map((task) => (
                      <TaskCard key={task.id} task={task} />
                    ))}
                  </div>
                </SortableContext>
              </div>
            ))}
          </div>
        </DndContext>
      )}
    </div>
  );
}
