"use client";

import { useEffect, useState } from "react";
import { taskApi } from "@/lib/api";
import { Database } from "@/lib/database.types";
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
import { TaskCard } from "./task-card";

type Task = Database["public"]["Tables"]["tasks"]["Row"] & {
  assignee: { id: string; name: string };
  reviewer: { id: string; name: string } | null;
};

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

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

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Input
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="To Do">To Do</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Review">Review</SelectItem>
            <SelectItem value="Rejected">Rejected</SelectItem>
            <SelectItem value="Closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
