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
const MAX_NAME_LENGTH = 120;
const MAX_DURATION_LENGTH = 40;
const MAX_LAST_PERFORMED_LENGTH = 80;

function parseId(idParam: string) {
  const id = Number(idParam);
  return Number.isInteger(id) && id > 0 ? id : null;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseRequiredString(
  input: Record<string, unknown>,
  field: string,
  label: string,
  maxLength: number
) {
  const value = input[field];

  if (typeof value !== "string" || value.trim().length === 0) {
    return { error: `${label} is required.` };
  }

  const trimmed = value.trim();

  if (trimmed.length > maxLength) {
    return { error: `${label} must be ${maxLength} characters or fewer.` };
  }

  return { value: trimmed };
}

function parseRoutineInput(body: unknown): { data?: RoutineInput; error?: string } {
  if (!isRecord(body)) {
    return { error: "Routine payload must be an object." };
  }

  const name = parseRequiredString(body, "name", "Routine name", MAX_NAME_LENGTH);
  if (name.error || !name.value) {
    return { error: name.error };
  }

  const exercises = body.exercises;

  if (
    typeof exercises !== "number" ||
    !Number.isFinite(exercises) ||
    !Number.isInteger(exercises) ||
    exercises < 1
  ) {
    return { error: "Exercises must be a positive integer." };
  }

  const duration = parseRequiredString(body, "duration", "Duration", MAX_DURATION_LENGTH);
  if (duration.error || !duration.value) {
    return { error: duration.error };
  }

  const lastPerformed = parseRequiredString(
    body,
    "lastPerformed",
    "Last performed",
    MAX_LAST_PERFORMED_LENGTH
  );
  if (lastPerformed.error || !lastPerformed.value) {
    return { error: lastPerformed.error };
  }

  return {
    data: {
      name: name.value,
      exercises,
      duration: duration.value,
      lastPerformed: lastPerformed.value,
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
