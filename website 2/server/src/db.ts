import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";

const dataDir = path.join(process.cwd(), "data");

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, "fittrack.sqlite");

export const db = new Database(dbPath);

db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS routines (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    exercises INTEGER NOT NULL,
    duration TEXT NOT NULL,
    last_performed TEXT NOT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  )
`);

const existingCount = db
  .prepare("SELECT COUNT(*) as count FROM routines")
  .get() as { count: number };

if (existingCount.count === 0) {
  const seed = db.prepare(`
    INSERT INTO routines (name, exercises, duration, last_performed, created_at, updated_at)
    VALUES (@name, @exercises, @duration, @lastPerformed, @createdAt, @updatedAt)
  `);

  const now = new Date().toISOString();
  const seedRoutines = [
    { name: "Push Day A", exercises: 6, duration: "60 min", lastPerformed: "2 days ago" },
    { name: "Pull Day B", exercises: 5, duration: "55 min", lastPerformed: "4 days ago" },
    { name: "Leg Day", exercises: 7, duration: "70 min", lastPerformed: "5 days ago" },
  ];

  for (const routine of seedRoutines) {
    seed.run({
      name: routine.name,
      exercises: routine.exercises,
      duration: routine.duration,
      lastPerformed: routine.lastPerformed,
      createdAt: now,
      updatedAt: now,
    });
  }
}
