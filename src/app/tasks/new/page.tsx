'use client';

import { useRouter } from 'next/navigation';
import TaskForm from '@/components/TaskForm';
import { createTask } from '@/lib/api';

export default function NewTaskPage() {
  const router = useRouter();

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Create Task</h1>
      <TaskForm
        submitLabel="Add Task"
        onSubmit={async (data) => {
          await createTask(data);
          router.push('/');
        }}
      />
    </div>
  );
}
