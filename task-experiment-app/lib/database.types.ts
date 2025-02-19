export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      tasks: {
        Row: {
          id: string;
          title: string;
          description: string;
          assignee_id: string;
          reviewer_id: string | null;
          status: "To Do" | "In Progress" | "Review" | "Rejected" | "Closed";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          assignee_id: string;
          reviewer_id?: string | null;
          status?: "To Do" | "In Progress" | "Review" | "Rejected" | "Closed";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          assignee_id?: string;
          reviewer_id?: string | null;
          status?: "To Do" | "In Progress" | "Review" | "Rejected" | "Closed";
          created_at?: string;
          updated_at?: string;
        };
      };
      users: {
        Row: {
          id: string;
          name: string;
          email: string;
          role: "Task Creator" | "Task Assignee" | "Task Reviewer";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          role: "Task Creator" | "Task Assignee" | "Task Reviewer";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          role?: "Task Creator" | "Task Assignee" | "Task Reviewer";
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}
