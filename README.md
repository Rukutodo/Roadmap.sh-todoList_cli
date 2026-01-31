# CLI Task Tracker

This project is an implementation of the [Task Tracker](https://roadmap.sh/projects/task-tracker) project from [roadmap.sh](https://roadmap.sh).

A simple command-line interface application to manage your tasks efficiently.

## Prerequisites

- Node.js installed on your machine.

## Setup

1.  Clone the repository or download the source code.
2.  Ensure a `todo.json` file exists in the same directory with the following initial structure (if not already present):
    ```json
    {
      "todos": []
    }
    ```

## Usage

Run the application using Node.js:

```bash
node index.js <command> [arguments]
```

### Available Commands

#### 1. List Tasks
View all tasks in a table format.

```bash
node index.js list
```

#### 2. Add a Task
Add a new task with a description.
*Note: Surround multi-word descriptions with quotes.*

```bash
node index.js add "Task description"
```

#### 3. Update Task Status
Update the status of an existing task by its ID.

```bash
node index.js update <id> <new_status>
```

Example:
```bash
node index.js update 1 "done"
```

#### 4. Delete a Task
Remove a task by its ID.

```bash
node index.js delete <id>
```

#### 5. Find Tasks
Search for tasks based on specific fields (like `status`).

```bash
node index.js find "<field>=<value>"
```

Example:
```bash
node index.js find "status=in progress"
```

## Data Storage

Tasks are persisted in a `todo.json` file in the current working directory.
