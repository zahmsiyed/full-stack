export interface WorkoutHistoryExercise {
  name: string;
  sets: string;
  reps: string;
}

export interface WorkoutHistoryItem {
  id: number;
  name: string;
  date: string;
  time: string;
  duration: string;
  volume: string;
  exercises: WorkoutHistoryExercise[];
}

export const workoutHistory: WorkoutHistoryItem[] = [
  {
    id: 1,
    name: "Push Day A",
    date: "April 9, 2026",
    time: "14:30",
    duration: "58 min",
    volume: "3,240 kg",
    exercises: [
      { name: "Barbell Bench Press", sets: "3 sets", reps: "8, 8, 6 reps" },
      { name: "Incline Dumbbell Press", sets: "3 sets", reps: "12, 10, 8 reps" },
      { name: "Cable Flyes", sets: "2 sets", reps: "15, 12 reps" },
    ],
  },
  {
    id: 2,
    name: "Pull Day B",
    date: "April 7, 2026",
    time: "10:15",
    duration: "52 min",
    volume: "2,890 kg",
    exercises: [
      { name: "Deadlift", sets: "4 sets", reps: "5, 5, 5, 5 reps" },
      { name: "Lat Pulldown", sets: "3 sets", reps: "12, 10, 10 reps" },
      { name: "Barbell Row", sets: "3 sets", reps: "10, 8, 8 reps" },
    ],
  },
  {
    id: 3,
    name: "Leg Day",
    date: "April 5, 2026",
    time: "16:00",
    duration: "65 min",
    volume: "4,120 kg",
    exercises: [
      { name: "Barbell Squat", sets: "4 sets", reps: "8, 8, 6, 6 reps" },
      { name: "Romanian Deadlift", sets: "3 sets", reps: "10, 10, 8 reps" },
      { name: "Leg Press", sets: "3 sets", reps: "15, 12, 12 reps" },
    ],
  },
  {
    id: 4,
    name: "Upper Power",
    date: "April 3, 2026",
    time: "11:30",
    duration: "62 min",
    volume: "3,560 kg",
    exercises: [
      { name: "Overhead Press", sets: "4 sets", reps: "8, 6, 6, 5 reps" },
      { name: "Barbell Bench Press", sets: "3 sets", reps: "6, 6, 5 reps" },
      { name: "Barbell Row", sets: "3 sets", reps: "8, 8, 6 reps" },
    ],
  },
];

function parseVolume(volume: string) {
  return Number(volume.replace(/[^\d]/g, ""));
}

function getWorkoutDate(workout: WorkoutHistoryItem) {
  return new Date(`${workout.date} ${workout.time}`);
}

function formatMonthYear(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(date);
}

function countCurrentWorkoutStreak(history: WorkoutHistoryItem[]) {
  const sortedDates = history
    .map(getWorkoutDate)
    .sort((a, b) => b.getTime() - a.getTime());

  if (sortedDates.length === 0) {
    return 0;
  }

  let streak = 1;
  const twoDaysInMs = 2 * 24 * 60 * 60 * 1000;

  for (let index = 1; index < sortedDates.length; index += 1) {
    const gap = sortedDates[index - 1].getTime() - sortedDates[index].getTime();

    if (gap > twoDaysInMs) {
      break;
    }

    streak += 1;
  }

  return streak;
}

export function getWorkoutHistoryStats(history = workoutHistory) {
  const totalVolume = history.reduce(
    (sum, workout) => sum + parseVolume(workout.volume),
    0
  );

  const sortedDates = history
    .map(getWorkoutDate)
    .sort((a, b) => a.getTime() - b.getTime());
  const firstWorkoutDate = sortedDates[0];
  const currentStreak = countCurrentWorkoutStreak(history);

  return {
    totalWorkouts: history.length,
    totalVolume,
    memberSince: firstWorkoutDate ? formatMonthYear(firstWorkoutDate) : "No workouts",
    currentStreak,
  };
}
