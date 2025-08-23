export type Task = {
  id: number;
  title: string;
  color: 'red' | 'blue' | 'green' | 'orange' | 'yellow' | 'indigo' | 'violet' | 'pink' | 'brown';
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

