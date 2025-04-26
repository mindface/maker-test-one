import { z } from 'zod';

export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  knowledgeLevel: z.enum(['beginner', 'intermediate', 'expert']),
});

export const TaskSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  levelRequired: z.enum(['beginner', 'intermediate', 'expert']),
  coverage: z.array(z.string()),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const TaskProgressSchema = z.object({
  id: z.number(),
  taskId: z.number(),
  userId: z.number(),
  startedAt: z.string(),
  completedAt: z.string().optional(),
});

export const BookSchema = z.object({
  id: z.number(),
  title: z.string(),
  author: z.string(),
  notes: z.string().optional(),
});

export const TaskKnowledgeSchema = z.object({
  id: z.number(),
  userId: z.number(),
  taskId: z.number(),
  frameworkNotes: z.string(),
});

export type User = z.infer<typeof UserSchema>;
export type Task = z.infer<typeof TaskSchema>;
export type TaskProgress = z.infer<typeof TaskProgressSchema>;
export type Book = z.infer<typeof BookSchema>;
export type TaskKnowledge = z.infer<typeof TaskKnowledgeSchema>; 