import { supabase } from "./supabase";
import { Database } from "./database.types";

type Task = Database["public"]["Tables"]["tasks"]["Row"];
type User = Database["public"]["Tables"]["users"]["Row"];

// Task APIs
export const taskApi = {
  // Fetch all tasks
  async getTasks() {
    const { data, error } = await supabase
      .from("tasks")
      .select(
        `
        *,
        assignee:users!tasks_assignee_id_fkey(id, name),
        reviewer:users!tasks_reviewer_id_fkey(id, name)
      `
      )
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  // Create a new task
  async createTask(task: Database["public"]["Tables"]["tasks"]["Insert"]) {
    const { data, error } = await supabase
      .from("tasks")
      .insert(task)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update a task
  async updateTask(
    id: string,
    updates: Database["public"]["Tables"]["tasks"]["Update"]
  ) {
    const { data, error } = await supabase
      .from("tasks")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Delete a task
  async deleteTask(id: string) {
    const { error } = await supabase.from("tasks").delete().eq("id", id);

    if (error) throw error;
  },
};

// User APIs
export const userApi = {
  // Fetch all users
  async getUsers() {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .order("name");

    if (error) throw error;
    return data;
  },

  // Get user by ID
  async getUserById(id: string) {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  },

  // Create a new user
  async createUser(user: Database["public"]["Tables"]["users"]["Insert"]) {
    const { data, error } = await supabase
      .from("users")
      .insert(user)
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};
