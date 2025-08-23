'use client';

import { COLOR_BG } from '@/lib/colors';
import type { Task } from '@/types';
import Link from 'next/link';

export default function TaskItem({
  task,
  onToggle,
  onDelete,
}: {
  task: Task;
  onToggle: (task: Task) => void;
  onDelete: (id: number) => void;
}) {
  const dotClass = COLOR_BG[task.color];

  return (
    <li className="flex items-center justify-between rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 shadow-sm">
      <div className="flex items-center gap-3">
        <span className={`h-3 w-3 rounded-full ${dotClass}`} aria-hidden />
        <button
          onClick={() => onToggle(task)}
          className="flex items-center gap-2"
          title="Toggle complete"
        >
          <img src="/check.svg" alt="" className="h-5 w-5 opacity-80" />
          <span className={task.completed ? 'line-through text-neutral-500' : 'text-neutral-100'}>
            {task.title}
          </span>
        </button>
      </div>
      <div className="flex items-center gap-3">
        <Link
          href={`/tasks/${task.id}/edit`}
          className="rounded-md border border-neutral-700 px-2 py-1 text-sm text-neutral-200 hover:bg-neutral-800"
        >
          Edit
        </Link>
        <button
          onClick={() => onDelete(task.id)}
          className="rounded-md border border-neutral-700 px-2 py-1 text-sm text-red-400 hover:bg-red-950/40"
        >
          Delete
        </button>
      </div>
    </li>
  );
}

