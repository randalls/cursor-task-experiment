# Tasking App PRD

## Overview

You are building a tasking app. The app will allow users to create, edit, and delete tasks. Users will also be able to assign tasks to other users and optionally assign a reviewer to a task. When the original task is completed, the reviewer, if added, will approve the task and it will be closed.

You will be using Next.js, shadcn, Tailwind, Lucid, and Supabase.

## User Requirements

There are two types of users:

- Task Creators: Users who create tasks.
- Task Assignees: Users who are assigned to a task.
- Task Reviewers: Users who review tasks.

### Task Creator

- User Stories

1. As a Task Creator, I want to create a task so that I can assign it to a Task Assignee.
2. As a Task Creator, I want to edit a task so that I can update the task details.
3. As a Task Creator, I want to delete a task so that I can remove it from the system.

- Use Cases

1. Task Creator creates a task.
2. Task Creator assigns a Task Assignee to the task.
3. Task Creator assigns a Task Reviewer to the task.

### Task Assignee

- User Stories

1. As a Task Assignee, I want to view the task details so that I can understand the task.
2. As a Task Assignee, I want to complete the task so that I can close it.

- Use Cases

1. Task Assignee views the task details.
2. Task Assignee updates the task status to In Progress.
3. Task Assignee completes the task.

### Task Reviewer

- User Stories

1. As a Task Reviewer, I want to view the task details so that I can understand the task.
2. As a Task Reviewer, I want to approve the task so that it can be closed.
3. As a Task Reviewer, I want to reject the task so that it can be sent back to the Task Assignee.

- Use Cases

1. Task Reviewer views the task details.
2. Task Reviewer approves the task.
3. Task Reviewer rejects the task.

## Technical Requirements

- Architecture

1. The app will be built with Next.js, shadcn, Tailwind, Lucid, and Supabase.
2. The app will be deployed on Vercel.
3. The app will be responsive and mobile-friendly.

- APIs

1. The app will use the Supabase API to store and retrieve tasks.
2. The app will use the Supabase API to store and retrieve users.
3. The app will use the Supabase API to store and retrieve task assignments.
4. The app will use the Supabase API to store and retrieve task reviews.

- Data Models

1. The app will use the Supabase data model to store tasks.
2. The app will use the Supabase data model to store users.
3. The app will use the Supabase data model to store task assignments.
4. The app will use the Supabase data model to store task reviews.
5. The app will use the Supabase data model to store task statuses.
6. The task statuses will be:
   - To Do
   - In Progress
   - Review
   - Rejected
   - Closed

- Security

1. The app will use the Supabase security model to secure the task data.
2. The app will use the Supabase security model to secure the user data.
3. The app will use the Supabase security model to secure the task assignment data.
4. The app will use the Supabase security model to secure the task review data.

## Design Requirements

- UI/UX Guidelines

1. The app will use the shadcn library for the UI.
2. The app will use the Tailwind library for the UI.
3. The app will use the Lucid library for the UI.
4. The app will allow users to switch between light and dark mode.

- Wireframes

1. The app will have a task list page.
2. The task list page will list only those tasks that the user is assigned to or has created.
3. The task list page will display the task title, description, assignee, and status.
4. The task list page will have a search bar to search for tasks.
5. The task list page will have a filter to filter tasks by status.
6. The task list page should allow the user to toggle to a kanban board view.
7. The kanban board view will display the task title, description, assignee, and status.
8. The kanban board view should allow the user to drag and drop tasks between statuses.
9. The task details will be displayed in a modal when the user clicks on a task.
10. The task details view will display the task title, description, assignee, and status.
11. The task details view will have a button to edit the task that is only visible to the task creator.
12. The task details view will have a button to delete the task that is only visible to the task creator.
13. The task details view will have a button to approve the task that is only visible to the task reviewer.
14. The task details view will have a button to reject the task that is only visible to the task reviewer.
15. The task details view will have a button to close the task that is only visible to the task assignee.
16. The task list page will have a button to create a new task.
17. The new task page will be in a modal.
18. The new task page will have a form to create a new task.
19. The new task page will have a button to create the task.
20. The new task page will have a dropdown to select the task assignee.
21. The new task page will have a dropdown to select the task reviewer.

## Current File Structure

task-experiment-app/
├── README.md
├── app
│ ├── favicon.ico
│ ├── globals.css
│ ├── layout.tsx
│ └── page.tsx
├── components
│ └── ui
├── components.json
├── env.local
├── eslint.config.mjs
├── hooks
│ ├── use-mobile.tsx
│ └── use-toast.ts
├── instructions
│ └── Instructions.md
├── lib
│ └── utils.ts
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── public
│ ├── file.svg
│ ├── globe.svg
│ ├── next.svg
│ ├── vercel.svg
│ └── window.svg
├── tailwind.config.ts
└── tsconfig.json
