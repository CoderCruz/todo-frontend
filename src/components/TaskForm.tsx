'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { TaskColor } from '@/types';

type UIColor =
  | 'red' | 'orange' | 'yellow' | 'green' | 'blue'
  | 'indigo' | 'violet' | 'pink' | 'brown';

const DOT_BG: Record<UIColor, string> = {
  red: 'bg-red-500',
  orange: 'bg-orange-500',
  yellow: 'bg-yellow-400',
  green: 'bg-green-500',
  blue: 'bg-blue-500',
  indigo: 'bg-indigo-500',
  violet: 'bg-violet-500',
  pink: 'bg-pink-500',
  brown: 'bg-amber-700',
};

const ENABLED: Record<UIColor, boolean> = {
  red: true,
  blue: true,
  green: true,
  orange: true,
  yellow: true,
  indigo: true,
  violet: true,
  pink: true,
  brown: true,
};

const PALETTE: UIColor[] = [
  'red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet', 'pink', 'brown',
];

export default function TaskForm({
  initial,
  submitLabel = 'Add Task',
  onSubmit,
  iconSrc = '/plus.svg'
}: {
  initial?: { title?: string; color?: TaskColor };
  submitLabel?: string;
  onSubmit: (data: { title: string; color: TaskColor }) => Promise<void> | void;
  iconSrc?: string;
}) {
  const [title, setTitle] = useState(initial?.title ?? '');
  const [color, setColor] = useState<TaskColor>(initial?.color ?? 'blue');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr('');
    const safeTitle = title.trim();
    if (!safeTitle) {
      setErr('Title is required.');
      return;
    }
    try {
      setLoading(true);
      await onSubmit({ title: safeTitle, color });
    } catch (e: unknown) {
      setErr(e?.message ?? 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-4 max-w-2xl space-y-6">
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-neutral-300 hover:text-neutral-100"
          aria-label="Back to tasks"
        >
          <span className="text-xl leading-none font-bold" aria-hidden>←</span>
          <span className="sr-only">Back</span>
        </Link>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-sky-400">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ex. Brush you teeth"
          className="w-full rounded-md border border-neutral-700 bg-neutral-800 px-3 py-2 text-neutral-100 placeholder:text-neutral-500 outline-none focus:ring-2 focus:ring-sky-500"
        />
      </div>

      <div className="space-y-2">
        <div className="text-sm font-semibold text-sky-400">Color</div>
        <div className="flex flex-wrap gap-3">
          {PALETTE.map((c) => {
            const isEnabled = ENABLED[c];
            const isSelected = color === c;
            return (
              <label key={c} className="relative">
                <input
                  type="radio"
                  name="color"
                  value={c}
                  disabled={!isEnabled}
                  checked={isSelected}
                  onChange={() => {
                    if (isEnabled) setColor(c as TaskColor);
                  }}
                  className="peer sr-only"
                />
                <span
                  className={[
                    'block h-8 w-8 rounded-full ring-2 transition',
                    DOT_BG[c],
                    isSelected ? 'ring-sky-400' : 'ring-transparent',
                    isEnabled ? 'cursor-pointer' : 'cursor-not-allowed opacity-40',
                    'peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-sky-400',
                  ].join(' ')}
                  aria-hidden
                  title={isEnabled ? c : `${c} (not available)`}
                />
              </label>
            );
          })}
        </div>
      </div>

      {err && <p className="text-sm text-red-400">{err}</p>}

      <button
        disabled={loading || !title.trim()}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-sky-600 px-4 py-3 text-base font-semibold text-white ring-1 ring-sky-400/50 hover:bg-sky-500 disabled:opacity-60"
      >
        {submitLabel}
        <img src={iconSrc} alt="" className="h-4 w-4 opacity-90" />
      </button>
    </form>
  );
}

