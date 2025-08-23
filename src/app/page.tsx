'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import TaskItem from '@/components/TaskItem';
import { deleteTask, getTasks, updateTask } from '@/lib/api';
import type { Task } from '@/types';

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const [err, setErr] = useState<string>('');

  async function load() {
    try {
      setErr('');
      const data = await getTasks();
      setTasks(data);
    } catch (e: any) {
      setErr(e?.message ?? 'Failed to load tasks');
    }
  }

  useEffect(() => {
    load();
  }, []);

  const completed = useMemo(() => tasks?.filter((t) => t.completed).length ?? 0, [tasks]);
  const total = tasks?.length ?? 0;

  async function handleToggle(task: Task) {
    if (!tasks) return;
    const prev = tasks;
    const optimistic = prev.map((t) =>
      t.id === task.id ? { ...t, completed: !t.completed, updatedAt: new Date().toISOString() } : t
    );
    setTasks(optimistic);
    try {
      await updateTask(task.id, { completed: !task.completed });
    } catch {
      setTasks(prev);
      setErr('Failed to toggle task');
    }
  }

  async function handleDelete(id: number) {
    if (!tasks) return;
    const prev = tasks;
    setTasks(prev.filter((t) => t.id !== id));
    try {
      await deleteTask(id);
    } catch {
      setTasks(prev);
      setErr('Failed to delete task');
    }
  }

  return (
    <div className="space-y-6">
      <div className="mx-auto mt-2 max-w-xl">
        <Link
          href="/tasks/new"
          className="flex relative z-400000 -mt-15 w-full items-center justify-center gap-2 rounded-xl bg-sky-600 px-4 py-3 text-base font-semibold text-white shadow-lg ring-1 ring-sky-400/50 hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-300"
        >
          Create Task
          <img src="/plus.svg" alt="plus sign" className="h-4 w-4 opacity-90" />
        </Link>
      </div>

      <section aria-label="Task summary">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sky-400">Tasks</span>
            <span className="rounded-full bg-neutral-700 px-2 py-0.5 text-xs text-neutral-100/90">
              {total}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-semibold text-violet-400">Completed</span>
            <span className="rounded-full bg-neutral-700 px-2 py-0.5 text-xs text-neutral-100/90">
              {completed} <span className="mx-0.5">de</span> {total}
            </span>
          </div>
        </div>

        <div className="mt-2 h-px w-full bg-neutral-800" />
      </section>      {err && <p className="text-sm text-red-400">{err}</p>}

      {!tasks ? (
        <p className="text-neutral-400">Loading…</p>
      ) : tasks.length === 0 ? (
        <div className="flex flex-col items-center gap-2 px-6 py-16 text-center">
          <img src="/clipboard.svg" alt="" className="mb-2 h-10 w-10 opacity-60" />
          <p className="text-neutral-300">You don't have any tasks registered yet.</p>
          <p className="text-sm text-neutral-400">
            Create tasks and organize your to-do items.
          </p>
        </div>
      ) : (
        <ul className="space-y-2">
          {tasks.map((t) => (
            <TaskItem key={t.id} task={t} onToggle={handleToggle} onDelete={handleDelete} />
          ))}
        </ul>
      )}
    </div>
  );
}

