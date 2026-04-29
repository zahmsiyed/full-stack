import { supabase } from "./supabase";

export interface Routine {
  id: number;
  name: string;
  exercises: number;
  duration: string;
  lastPerformed: string;
  createdAt: string;
  updatedAt: string;
}

export interface RoutineInput {
  name: string;
  exercises: number;
  duration: string;
  lastPerformed: string;
}

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

export async function fetchRoutines() {
  const { data, error } = await supabase
    .from("routines")
    .select("*")
    .order("id", { ascending: false });

  if (error) throw error;
  return (data ?? []).map(mapRoutine);
}

export async function fetchRoutine(id: number) {
  const { data, error } = await supabase
    .from("routines")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return mapRoutine(data);
}

export async function createRoutine(input: RoutineInput) {
  const { data, error } = await supabase
    .from("routines")
    .insert({
      name: input.name,
      exercises: input.exercises,
      duration: input.duration,
      last_performed: input.lastPerformed,
    })
    .select("*")
    .single();

  if (error) throw error;
  return mapRoutine(data);
}
