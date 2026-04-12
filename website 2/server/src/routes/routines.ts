import { Router } from "express";
import {
  createRoutine,
  deleteRoutine,
  getRoutineById,
  listRoutines,
  updateRoutine,
} from "../repositories/routines.js";
import type { RoutineInput } from "../types.js";

const router = Router();

function parseRoutineInput(body: unknown): { data?: RoutineInput; error?: string } {
  const input = body as Partial<RoutineInput>;

  if (!input || typeof input.name !== "string" || input.name.trim().length === 0) {
    return { error: "Routine name is required." };
  }

  if (typeof input.exercises !== "number" || Number.isNaN(input.exercises) || input.exercises < 1) {
    return { error: "Exercises must be a number greater than 0." };
  }

  if (typeof input.duration !== "string" || input.duration.trim().length === 0) {
    return { error: "Duration is required." };
  }

  if (typeof input.lastPerformed !== "string" || input.lastPerformed.trim().length === 0) {
    return { error: "Last performed is required." };
  }

  return {
    data: {
      name: input.name.trim(),
      exercises: input.exercises,
      duration: input.duration.trim(),
      lastPerformed: input.lastPerformed.trim(),
    },
  };
}

router.get("/", (_req, res) => {
  res.json({ data: listRoutines() });
});

router.get("/:id", (req, res) => {
  const routine = getRoutineById(Number(req.params.id));

  if (!routine) {
    return res.status(404).json({ error: "Routine not found." });
  }

  return res.json({ data: routine });
});

router.post("/", (req, res) => {
  const { data, error } = parseRoutineInput(req.body);

  if (!data) {
    return res.status(400).json({ error });
  }

  const routine = createRoutine(data);
  return res.status(201).json({ data: routine });
});

router.put("/:id", (req, res) => {
  const { data, error } = parseRoutineInput(req.body);

  if (!data) {
    return res.status(400).json({ error });
  }

  const routine = updateRoutine(Number(req.params.id), data);

  if (!routine) {
    return res.status(404).json({ error: "Routine not found." });
  }

  return res.json({ data: routine });
});

router.delete("/:id", (req, res) => {
  const removed = deleteRoutine(Number(req.params.id));

  if (!removed) {
    return res.status(404).json({ error: "Routine not found." });
  }

  return res.json({ data: { id: Number(req.params.id) } });
});

export { router as routinesRouter };
