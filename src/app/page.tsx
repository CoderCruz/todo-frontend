'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import TaskItem from '@/components/TaskItem';
import { deleteTask, getTasks, updateTask } from '@/lib/api';
import type { Task } from '@/lib/types';

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function load() {
    try {
      setErr(null);
      const data = await getTasks();
      setTasks(data);
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Failed to load tasks';
      setErr(msg);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const completed = tasks?.filter((t) => t.completed).length ?? 0;
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

  async function handleDelete(id: Task['id']) {
    if (!tasks) return;
    const prev = tasks;
    setTasks(prev.filter((t) => t.id !== id));
    try {
      await deleteTask(id as any);
    } catch {
      setTasks(prev);
      setErr('Failed to delete task');
    }
  }

  return (
    <main className="space-y-6">
      <div className="mx-auto mt-2 max-w-xl">
        <Link
          href="/tasks/new"
          className="relative z-400 -mt-15 flex w-full items-center justify-center gap-2 rounded-xl bg-sky-600 px-4 py-3 text-base font-semibold text-white shadow-lg ring-1 ring-sky-400/50 hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-300"
        >
          Create Task
          <Image src="/plus.svg" alt="" width={16} height={16} className="opacity-90" />
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
              {completed} <span className="mx-0.5">of</span> {total}
            </span>
          </div>
        </div>

        <div className="mt-2 h-px w-full bg-neutral-800" />
      </section>

      {err && <p className="text-sm text-red-400">{err}</p>}

      {!tasks ? (
        <p className="text-neutral-400">Loading…</p>
      ) : tasks.length === 0 ? (
        <div className="flex flex-col items-center gap-2 px-6 py-16 text-center">
          <Image src="/clipboard.svg" alt="" width={40} height={40} className="mb-2 opacity-60" />
          <p className="text-neutral-300">You don&apos;t have any tasks registered yet.</p>
          <p className="text-sm text-neutral-400">Create tasks and organize your to-do items.</p>
        </div>
      ) : (
        <ul className="space-y-2">
          {tasks.map((t) => (
            <TaskItem key={t.id} task={t} onToggle={handleToggle} onDelete={handleDelete} />
          ))}
        </ul>
      )}
    </main>
  );
}

