import { db } from "../db.js";
import type { Routine, RoutineInput } from "../types.js";

interface RoutineRow {
  id: number;
  name: string;
  exercises: number;
  duration: string;
  last_performed: string;
  created_at: string;
  updated_at: string;
}

function mapRoutine(row: RoutineRow): Routine {
  return {
    id: row.id,
    name: row.name,
    exercises: row.exercises,
    duration: row.duration,
    lastPerformed: row.last_performed,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function listRoutines(): Routine[] {
  const rows = db
    .prepare("SELECT * FROM routines ORDER BY id DESC")
    .all() as RoutineRow[];

  return rows.map(mapRoutine);
}

export function getRoutineById(id: number): Routine | null {
  const row = db
    .prepare("SELECT * FROM routines WHERE id = ?")
    .get(id) as RoutineRow | undefined;

  return row ? mapRoutine(row) : null;
}

export function createRoutine(input: RoutineInput): Routine {
  const now = new Date().toISOString();
  const result = db
    .prepare(`
      INSERT INTO routines (name, exercises, duration, last_performed, created_at, updated_at)
      VALUES (@name, @exercises, @duration, @lastPerformed, @createdAt, @updatedAt)
    `)
    .run({
      name: input.name,
      exercises: input.exercises,
      duration: input.duration,
      lastPerformed: input.lastPerformed,
      createdAt: now,
      updatedAt: now,
    });

  return getRoutineById(Number(result.lastInsertRowid)) as Routine;
}

export function updateRoutine(id: number, input: RoutineInput): Routine | null {
  const now = new Date().toISOString();
  const result = db
    .prepare(`
      UPDATE routines
      SET name = @name,
          exercises = @exercises,
          duration = @duration,
          last_performed = @lastPerformed,
          updated_at = @updatedAt
      WHERE id = @id
    `)
    .run({
      id,
      name: input.name,
      exercises: input.exercises,
      duration: input.duration,
      lastPerformed: input.lastPerformed,
      updatedAt: now,
    });

  if (result.changes === 0) {
    return null;
  }

  return getRoutineById(id);
}

export function deleteRoutine(id: number): boolean {
  const result = db.prepare("DELETE FROM routines WHERE id = ?").run(id);
  return result.changes > 0;
}
