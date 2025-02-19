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
  useDroppable,
  DragOverlay,
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

function KanbanColumn({ status, tasks }: { status: string; tasks: Task[] }) {
  const { setNodeRef } = useDroppable({
    id: status,
  });

  return (
    <div
      ref={setNodeRef}
      className="space-y-4 min-h-[500px] bg-muted/5 rounded-lg p-4"
      id={status}
    >
      <div className="font-semibold text-sm p-3 bg-muted rounded-lg sticky top-0">
        {status}
        <span className="ml-2 text-muted-foreground">{tasks.length}</span>
      </div>
      <SortableContext
        items={tasks.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-2">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [view, setView] = useState<"grid" | "kanban">("grid");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 5,
      },
    })
  );

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

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
    setIsDragging(true);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    setActiveId(null);
    setIsDragging(false);

    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const taskId = active.id as string;
    const newStatus = over.id as (typeof STATUSES)[number];
    const task = tasks.find((t) => t.id === taskId);

    if (!task || task.status === newStatus) return;

    // Optimistically update UI
    setTasks(
      tasks.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );

    // Debounce the API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 100)); // Small delay
      await taskApi.updateTask(taskId, { status: newStatus });
    } catch (error) {
      // Revert on failure
      setTasks(
        tasks.map((t) => (t.id === taskId ? { ...t, status: task.status } : t))
      );
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
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="grid grid-cols-5 gap-4 h-[calc(100vh-200px)] overflow-x-auto">
            {STATUSES.map((status) => (
              <KanbanColumn
                key={status}
                status={status}
                tasks={kanbanTasks[status]}
              />
            ))}
          </div>
          <DragOverlay>
            {activeId ? (
              <div className="opacity-80">
                <TaskCard
                  task={tasks.find((t) => t.id === activeId)!}
                  isDragging={true}
                />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      )}
    </div>
  );
}
