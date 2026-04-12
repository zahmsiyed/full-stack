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
