
import { execSync } from "child_process";
import { readFile, writeFile } from "fs/promises";
import assert from "assert";
import path from "path";

const ROOT = path.resolve(".");
const DATA_FILE = path.join(ROOT, "todo.json");

function run(cmd) {
  return execSync(`node index.js ${cmd}`, {
    cwd: ROOT,
    encoding: "utf8",
  });
}

async function readTodos() {
  const data = await readFile(DATA_FILE, "utf8");
  return JSON.parse(data).todos;
}

async function resetTodos() {
  await writeFile(DATA_FILE, JSON.stringify({ todos: [] }, null, 2));
}

/* ---------------- TESTS ---------------- */

(async function runTests() {
  console.log("Running CLI Task Tracker tests...\n");

  // Reset state
  await resetTodos();

  /* ---------- ADD ---------- */
  run(`add Task1`);
  let todos = await readTodos();

  assert.strictEqual(todos.length, 1);
  assert.strictEqual(todos[0].description, "Task1");
  assert.strictEqual(todos[0].status, "in progress");

  /* ---------- ADD SECOND ---------- */
  run(`add Task2`);
  todos = await readTodos();

  assert.strictEqual(todos.length, 2);
  assert.strictEqual(todos[1].id, 2);

  /* ---------- UPDATE ---------- */
  run(`update 1 completed`);
  todos = await readTodos();

  assert.strictEqual(todos[0].status, "completed");

  /* ---------- FIND ---------- */
  const findOut = run(`find status=completed`);
  assert(findOut.includes("completed"));

  /* ---------- DELETE ---------- */
  run(`delete 1`);
  todos = await readTodos();

  assert.strictEqual(todos.length, 1);
  assert.strictEqual(todos[0].id, 2);

  /* ---------- LIST ---------- */
  const listOut = run(`list`);
  assert(listOut.includes("Task2"));

  console.log("All tests passed ✅");
})();

