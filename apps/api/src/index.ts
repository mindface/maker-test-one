import Koa from 'koa';
import Router from '@koa/router';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import { Task, TaskSchema } from '@maker-test-one/schema/src/models';

const app = new Koa();
const router = new Router();

// CORSの設定
app.use(
  cors({
    origin: 'http://localhost:3000', // Next.jsの開発サーバーのオリジン
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type'],
    credentials: true,
  })
);

// エラーハンドリングミドルウェア
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err: any) {
    console.error('Error:', err);
    ctx.status = err.status || 500;
    ctx.body = {
      error: err.message || 'Internal server error',
    };
  }
});

// メモリ内のデータストア（実際のアプリケーションではデータベースを使用）
let tasks: Task[] = [
  {
    id: 1,
    title: 'TypeScriptの基礎を学ぶ',
    description: 'TypeScriptの基本的な型システムとインターフェースについて学びます',
    levelRequired: 'beginner',
    coverage: ['型の基本', 'インターフェース', 'ジェネリクス'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// タスク一覧の取得
router.get('/tasks', (ctx: Router.RouterContext) => {
  ctx.body = tasks;
});

// タスクの詳細取得
router.get('/tasks/:id', (ctx: Router.RouterContext) => {
  const task = tasks.find((t) => t.id === Number(ctx.params.id));
  if (!task) {
    ctx.status = 404;
    ctx.body = { error: 'Task not found' };
    return;
  }
  ctx.body = task;
});

// タスクの作成
router.post('/tasks', async (ctx: Router.RouterContext) => {
  try {
    const data = await TaskSchema.parseAsync(ctx.request.body);
    const newTask: Task = {
      ...data,
      id: tasks.length + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    tasks.push(newTask);
    ctx.status = 201;
    ctx.body = newTask;
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error: 'Invalid task data' };
  }
});

// タスクの更新
router.put('/tasks/:id', async (ctx: Router.RouterContext) => {
  const taskIndex = tasks.findIndex((t) => t.id === Number(ctx.params.id));
  if (taskIndex === -1) {
    ctx.status = 404;
    ctx.body = { error: 'Task not found' };
    return;
  }

  try {
    const data = await TaskSchema.parseAsync(ctx.request.body);
    const updatedTask: Task = {
      ...data,
      id: Number(ctx.params.id),
      updatedAt: new Date().toISOString(),
    };
    tasks[taskIndex] = updatedTask;
    ctx.body = updatedTask;
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error: 'Invalid task data' };
  }
});

// タスクの削除
router.delete('/tasks/:id', (ctx: Router.RouterContext) => {
  const taskIndex = tasks.findIndex((t) => t.id === Number(ctx.params.id));
  if (taskIndex === -1) {
    ctx.status = 404;
    ctx.body = { error: 'Task not found' };
    return;
  }

  tasks.splice(taskIndex, 1);
  ctx.status = 204;
});

// ミドルウェアの設定
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

// サーバーの起動
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 