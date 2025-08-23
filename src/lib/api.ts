import type { Task, TaskColor } from '@/types';

const API = process.env.NEXT_PUBLIC_API_URL!;
if (!API) {
  throw new Error('NEXT_PUBLIC_API_URL is not set');
}

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const txt = await res.text().catch(() => '');
    throw new Error(`${res.status} ${res.statusText}${txt ? ` - ${txt}` : ''}`);
  }
  return (await res.json()) as T;
}

export async function getTasks(): Promise<Task[]> {
  const res = await fetch(`${API}/tasks`, { cache: 'no-store' });
  return handle<Task[]>(res);
}

export async function getTask(id: number): Promise<Task> {
  const res = await fetch(`${API}/tasks/${id}`, { cache: 'no-store' });
  return handle<Task>(res);
}

export async function createTask(input: { title: string; color: TaskColor }): Promise<Task> {
  const res = await fetch(`${API}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...input, completed: false }),
  });
  return handle<Task>(res);
}

export async function updateTask(
  id: number,
  input: Partial<Pick<Task, 'title' | 'color' | 'completed'>>
): Promise<Task> {
  const res = await fetch(`${API}/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  return handle<Task>(res);
}

export async function deleteTask(id: number): Promise<{ success: true }> {
  const res = await fetch(`${API}/tasks/${id}`, { method: 'DELETE' });
  await handle<{}>(res);
  return { success: true };
}

