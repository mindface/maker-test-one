import { http, HttpResponse } from 'msw';
import { Task } from '@maker-test-one/schema/src/models';

const tasks: Task[] = [
  {
    id: 1,
    title: 'TypeScriptの基礎を学ぶ',
    description: 'TypeScriptの基本的な型システムとインターフェースについて学びます',
    levelRequired: 'beginner',
    coverage: ['型の基本', 'インターフェース', 'ジェネリクス'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: 'React Hooksの理解',
    description: 'React Hooksの基本的な使い方とカスタムフックの作成方法を学びます',
    levelRequired: 'intermediate',
    coverage: ['useState', 'useEffect', 'カスタムフック'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const handlers = [
  http.get('/api/tasks', () => {
    return HttpResponse.json(tasks);
  }),

  http.get('/api/tasks/:id', ({ params }) => {
    const task = tasks.find((t) => t.id === Number(params.id));
    if (!task) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json(task);
  }),
]; 