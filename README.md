# cli-task-tracker

A simple CLI task tracker built with TypeScript and Bun as part of my learning journey, following the roadmap.sh project specifications.
https://roadmap.sh/projects/task-tracker

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

Usage:

This application is console-based only and saves tasks in JSON format in the project root directory.
Type “add” followed by the description in quotes to add a task. Example: add “description”.
A task is always created with the “TODO” status.
To update a task’s status, you can use the command `mark-in-progress` or `mark-done` followed by the task ID.
To display all existing tasks, use the word `list`.
You can also filter the list of existing tasks by adding the statuses “done,” “in-progress,” or ‘todo’ after the word “list.”
You can update a task's description by using the Update command followed by the description in quotation marks.
You can delete a task by using the “delete” command followed by its ID.


