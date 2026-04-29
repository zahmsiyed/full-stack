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

function parseId(idParam: string) {
  const id = Number(idParam);
  return Number.isInteger(id) && id > 0 ? id : null;
}

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
  const id = parseId(req.params.id);

  if (id === null) {
    return res.status(400).json({ error: "Routine id must be a positive number." });
  }

  const routine = getRoutineById(id);

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
  const id = parseId(req.params.id);

  if (id === null) {
    return res.status(400).json({ error: "Routine id must be a positive number." });
  }

  const { data, error } = parseRoutineInput(req.body);

  if (!data) {
    return res.status(400).json({ error });
  }

  const routine = updateRoutine(id, data);

  if (!routine) {
    return res.status(404).json({ error: "Routine not found." });
  }

  return res.json({ data: routine });
});

router.delete("/:id", (req, res) => {
  const id = parseId(req.params.id);

  if (id === null) {
    return res.status(400).json({ error: "Routine id must be a positive number." });
  }

  const removed = deleteRoutine(id);

  if (!removed) {
    return res.status(404).json({ error: "Routine not found." });
  }

  return res.json({ data: { id } });
});

export { router as routinesRouter };
