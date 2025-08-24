'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import TaskForm from '@/components/TaskForm';
import { getTask, updateTask } from '@/lib/api';
import type { Task } from '@/types';

export default function EditTaskPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [task, setTask] = useState<Task | null>(null);
  const [err, setErr] = useState('');

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const t = await getTask(Number(id));
        if (alive) setTask(t);
      } catch (e: unknown) {
        setErr(e?.message ?? 'Failed to load task');
      }
    })();
    return () => { alive = false; };
  }, [id]);

  if (err) return <p className="text-red-400">{err}</p>;
  if (!task) return <p className="text-neutral-400">Loading…</p>;

  return (
    <div className="space-y-4">
      <TaskForm
        initial={{ title: task.title, color: task.color }}
        submitLabel="Save"
        iconSrc="/check.svg"
        onSubmit={async (data) => {
          await updateTask(task.id, { title: data.title, color: data.color });
          router.push('/');
        }}
      />
    </div>
  );
}
