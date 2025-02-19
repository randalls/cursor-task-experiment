# Tasking App PRD

## Overview

You are building a tasking app. The app will allow users to create, edit, and delete tasks. Users will also be able to assign tasks to other users and optionally assign a reviewer to a task. When the original task is completed, the reviewer, if added, will approve the task and it will be closed.

You will be using **Next.js, shadcn, Tailwind, Lucid, and Supabase**.

## User Requirements

### User Roles

There are three types of users:

1. **Task Creators** - Users who create tasks.
2. **Task Assignees** - Users who are assigned to a task.
3. **Task Reviewers** - Users who review tasks.

### Task Creator

#### User Stories

1. As a Task Creator, I want to create a task so that I can assign it to a Task Assignee.
2. As a Task Creator, I want to edit a task so that I can update the task details.
3. As a Task Creator, I want to delete a task so that I can remove it from the system.

#### Use Cases

1. Task Creator creates a task.
2. Task Creator assigns a Task Assignee to the task.
3. Task Creator assigns a Task Reviewer to the task.

### Task Assignee

#### User Stories

1. As a Task Assignee, I want to view the task details so that I can understand the task.
2. As a Task Assignee, I want to complete the task so that I can close it.

#### Use Cases

1. Task Assignee views the task details.
2. Task Assignee updates the task status to **In Progress**.
3. Task Assignee completes the task.

### Task Reviewer

#### User Stories

1. As a Task Reviewer, I want to view the task details so that I can understand the task.
2. As a Task Reviewer, I want to approve the task so that it can be closed.
3. As a Task Reviewer, I want to reject the task so that it can be sent back to the Task Assignee.

#### Use Cases

1. Task Reviewer views the task details.
2. Task Reviewer approves the task.
3. Task Reviewer rejects the task.

## Technical Requirements

### Architecture

1. The app will be built with **Next.js, shadcn, Tailwind, Lucid, and Supabase**.
2. The app will be deployed on **Vercel**.
3. The app will be **responsive and mobile-friendly**.

### APIs

1. The app will use the **Supabase API** to store and retrieve tasks.
2. The app will use the **Supabase API** to store and retrieve users.
3. The app will use the **Supabase API** to store and retrieve task assignments.
4. The app will use the **Supabase API** to store and retrieve task reviews.

### Data Models

#### Task Model

```json
{
  "id": "uuid",
  "title": "string",
  "description": "string",
  "assignee_id": "uuid",
  "reviewer_id": "uuid | null",
  "status": "To Do | In Progress | Review | Rejected | Closed",
  "created_at": "timestamp"
}
```

#### User Model

```json
{
  "id": "uuid",
  "name": "string",
  "email": "string",
  "role": "Task Creator | Task Assignee | Task Reviewer",
  "created_at": "timestamp"
}
```

### Security

1. The app will use the **Supabase security model** to secure task data.
2. The app will use the **Supabase security model** to secure user data.
3. The app will use the **Supabase security model** to secure task assignments.
4. The app will use the **Supabase security model** to secure task reviews.

## Design Requirements

### UI/UX Guidelines

1. The app will use **shadcn** components.
2. The app will use **Tailwind CSS** for styling.
3. The app will use **Lucid** for UI enhancements.
4. The app will support **light and dark mode**.

### Wireframesç

#### Task List Page

- Displays tasks that the user is assigned to or has created.
- Shows task **title, description, assignee, and status**.
- Includes a **search bar** for finding tasks.
- Includes a **filter** for sorting by status.
- Supports **kanban board view** with drag-and-drop for task statuses.

#### Task Details Modal

- Displays task **title, description, assignee, and status**.
- Includes:
  - **Edit button** (visible to task creator)
  - **Delete button** (visible to task creator)
  - **Approve button** (visible to task reviewer)
  - **Reject button** (visible to task reviewer)
  - **Close button** (visible to task assignee)

#### Task Creation Modal

- Form to **create a new task**.
- Dropdowns to **select assignee and reviewer**.

## File Structure

```plaintext
task-experiment-app/
├── README.md
├── app
│   ├── layout.tsx
│   ├── page.tsx
│   ├── tasks
│   │   ├── page.tsx
│   │   ├── task-list.tsx
│   │   ├── task-modal.tsx
├── components
│   ├── ui.tsx
│   ├── button.tsx
│   ├── modal.tsx
├── hooks
│   ├── use-ui.tsx
├── lib
│   ├── api.ts
│   ├── utils.ts
├── public
│   ├── icons/
├── styles
│   ├── globals.css
├── tailwind.config.ts
├── tsconfig.json
└── next.config.ts
```

## Development Guidelines

- **Minimize File Count**: Components should be consolidated where possible (e.g., `ui.tsx` combines reusable UI elements).
- **Use Modals for Forms**: New task creation, task editing, and task details should be in modals rather than separate pages.
- **Centralized API Calls**: Use `lib/api.ts` for all Supabase API interactions.
- **Single Page for Tasks**: The `/tasks` route should handle both list and kanban views dynamically.

## Example API Calls

### Fetch Tasks

```tsx
import { supabase } from "@/lib/utils";

export async function fetchTasks() {
  const { data, error } = await supabase.from("tasks").select("*");
  return { data, error };
}
```

### Create Task

```tsx
export async function createTask(task) {
  const { data, error } = await supabase.from("tasks").insert([task]);
  return { data, error };
}
```
