'use client';

import { useRouter } from 'next/navigation';
import type { Task } from '@/types';

export default function TaskItem({
  task,
  onToggle,
  onDelete,
}: {
  task: Task;
  onToggle: (task: Task) => void;
  onDelete: (id: number) => void;
}) {
  const router = useRouter();

  const goEdit = () => router.push(`/tasks/${task.id}/edit`);

  const handleRowClick = (e: React.MouseEvent<HTMLLIElement>) => {
    if ((e.target as HTMLElement).closest('[data-stop-nav]')) return;
    goEdit();
  };

  const handleRowKey = (e: React.KeyboardEvent<HTMLLIElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      goEdit();
    }
  };

  return (
    <li
      onClick={handleRowClick}
      onKeyDown={handleRowKey}
      tabIndex={0}
      role="button"
      aria-label={`Edit task: ${task.title}`}
      className="group cursor-pointer rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-3 shadow-sm transition hover:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-sky-400/40"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <button
            data-stop-nav
            onClick={(e) => {
              e.stopPropagation();
              onToggle(task);
            }}
            title={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
            aria-pressed={task.completed}
            className="grid h-5 w-5 place-items-center rounded-full ring-2 ring-sky-400 transition focus:outline-none focus:ring-2 focus:ring-sky-300"
          >
            {task.completed ? (
              <span className="grid h-3.5 w-3.5 place-items-center rounded-full bg-violet-500" />
            ) : (
              <span className="h-3.5 w-3.5 rounded-full bg-neutral-900" />
            )}
          </button>

          <p
            className={
              task.completed
                ? 'truncate text-neutral-500 line-through'
                : 'truncate text-neutral-200'
            }
            title={task.title}
          >
            {task.title}
          </p>
        </div>

        <button
          data-stop-nav
          onClick={(e) => {
            e.stopPropagation();
            onDelete(task.id);
          }}
          className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-neutral-700 text-neutral-400 transition hover:bg-neutral-800 hover:text-neutral-200"
          aria-label="Delete task"
          title="Delete task"
        >
          <img src="/trash.svg" alt="" className="h-4 w-4" />
        </button>
      </div>
    </li>
  );
}

