import { api } from "./api";

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

interface ApiResponse<T> {
  data: T;
}

export async function fetchRoutines() {
  const response = await api.get<ApiResponse<Routine[]>>("/routines");
  return response.data.data;
}

export async function createRoutine(input: RoutineInput) {
  const response = await api.post<ApiResponse<Routine>>("/routines", input);
  return response.data.data;
}
