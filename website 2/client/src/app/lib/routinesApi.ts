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

async function readData<T>(request: Promise<{ data: ApiResponse<T> }>) {
  const response = await request;
  return response.data.data;
}

export async function fetchRoutines() {
  return readData(api.get<ApiResponse<Routine[]>>("/routines"));
}

export async function createRoutine(input: RoutineInput) {
  return readData(api.post<ApiResponse<Routine>>("/routines", input));
}
