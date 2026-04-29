import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { StatusCard } from "../components/StatusCard";
import { SurfaceCard } from "../components/SurfaceCard";
import { getErrorMessage } from "../lib/api";
import { fetchRoutine } from "../lib/routinesApi";

interface WorkoutSet {
  id: number;
  weight: string;
  reps: string;
  completed: boolean;
}

interface Exercise {
  id: number;
  name: string;
  previousBest: string;
  sets: WorkoutSet[];
}

const initialExercises: Exercise[] = [
  {
    id: 1,
    name: "Barbell Bench Press",
    previousBest: "80kg × 8",
    sets: [
      { id: 1, weight: "60", reps: "10", completed: true },
      { id: 2, weight: "70", reps: "8", completed: true },
      { id: 3, weight: "80", reps: "6", completed: false },
    ],
  },
  {
    id: 2,
    name: "Incline Dumbbell Press",
    previousBest: "32kg × 10",
    sets: [
      { id: 1, weight: "28", reps: "12", completed: true },
      { id: 2, weight: "32", reps: "10", completed: false },
      { id: 3, weight: "32", reps: "8", completed: false },
    ],
  },
  {
    id: 3,
    name: "Cable Flyes",
    previousBest: "20kg × 12",
    sets: [
      { id: 1, weight: "15", reps: "15", completed: false },
      { id: 2, weight: "20", reps: "12", completed: false },
    ],
  },
];

export function ActiveWorkout() {
  const { id } = useParams();
  const [exercises, setExercises] = useState(initialExercises);
  const [duration, setDuration] = useState(0);
  const [routineName, setRoutineName] = useState("Empty Workout");
  const [routineLoading, setRoutineLoading] = useState(false);
  const [routineError, setRoutineError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setDuration(0);
    setExercises(initialExercises);

    if (!id || id === "new") {
      setRoutineName("Empty Workout");
      setRoutineError(null);
      setRoutineLoading(false);
      return () => {
        isMounted = false;
      };
    }

    const routineId = Number(id);

    if (!Number.isInteger(routineId) || routineId < 1) {
      setRoutineName("Workout");
      setRoutineError("Workout routine id must be a positive number.");
      setRoutineLoading(false);
      return () => {
        isMounted = false;
      };
    }

    async function loadRoutine() {
      try {
        setRoutineLoading(true);
        setRoutineError(null);
        const routine = await fetchRoutine(routineId);

        if (isMounted) {
          setRoutineName(routine.name);
        }
      } catch (error) {
        if (isMounted) {
          setRoutineError(
            getErrorMessage(error, "Unable to load this workout routine.")
          );
          setRoutineName("Workout");
        }
      } finally {
        if (isMounted) {
          setRoutineLoading(false);
        }
      }
    }

    void loadRoutine();

    return () => {
      isMounted = false;
    };
  }, [id]);

  useEffect(() => {
    // Keep the workout timer running while this page is open.
    const timer = setInterval(() => {
      setDuration((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function formatTime(seconds: number) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }

  function updateExercise(
    exerciseId: number,
    updateExerciseItem: (exercise: Exercise) => Exercise
  ) {
    setExercises((prev) =>
      prev.map((exercise) =>
        exercise.id === exerciseId ? updateExerciseItem(exercise) : exercise
      )
    );
  }

  function toggleSetComplete(exerciseId: number, setId: number) {
    updateExercise(exerciseId, (exercise) => ({
      ...exercise,
      sets: exercise.sets.map((set) =>
        set.id === setId ? { ...set, completed: !set.completed } : set
      ),
    }));
  }

  function addSet(exerciseId: number) {
    updateExercise(exerciseId, (exercise) => {
      const lastSet = exercise.sets[exercise.sets.length - 1];

      return {
        ...exercise,
        sets: [
          ...exercise.sets,
          {
            id: exercise.sets.length + 1,
            weight: lastSet?.weight ?? "",
            reps: lastSet?.reps ?? "",
            completed: false,
          },
        ],
      };
    });
  }

  function updateSet(
    exerciseId: number,
    setId: number,
    field: "weight" | "reps",
    value: string
  ) {
    updateExercise(exerciseId, (exercise) => ({
      ...exercise,
      sets: exercise.sets.map((set) =>
        set.id === setId ? { ...set, [field]: value } : set
      ),
    }));
  }

  return (
    <div className="min-h-full bg-background">
      <div className="sticky top-0 bg-card/95 backdrop-blur-lg border-b border-border z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Back
              </Link>
              <div>
                <h1 className="text-xl">{routineName}</h1>
                <p className="text-sm text-muted-foreground">{formatTime(duration)}</p>
              </div>
            </div>
            <button
              type="button"
              aria-label="Cancel workout"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {routineLoading && (
          <StatusCard tone="loading" message="Loading workout routine..." />
        )}

        {routineError && <StatusCard tone="error" message={routineError} />}

        {!routineLoading && !routineError && (
          <>
            {exercises.map((exercise, exerciseIndex) => (
              <motion.div
                key={exercise.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: exerciseIndex * 0.1 }}
              >
                <SurfaceCard className="p-6">
                  <div className="mb-4">
                    <h3 className="text-lg mb-1">{exercise.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Previous: {exercise.previousBest}
                    </p>
                  </div>

                  {/* Keep the sets table simple so each row is easy to scan. */}
                  <div className="space-y-2 mb-4">
                    <div className="grid grid-cols-[40px_1fr_1fr_72px] gap-3 text-sm text-muted-foreground px-2">
                      <span>Set</span>
                      <span>Weight (kg)</span>
                      <span>Reps</span>
                      <span>Done</span>
                    </div>

                    <AnimatePresence>
                      {exercise.sets.map((set) => (
                        <motion.div
                          key={set.id}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="grid grid-cols-[40px_1fr_1fr_72px] gap-3 items-center"
                        >
                          <span className="text-sm text-muted-foreground pl-2">
                            {set.id}
                          </span>
                          <input
                            type="number"
                            value={set.weight}
                            onChange={(event) =>
                              updateSet(exercise.id, set.id, "weight", event.target.value)
                            }
                            className="bg-input rounded-lg px-3 py-2 text-center focus:outline-none focus:ring-2 focus:ring-primary"
                            disabled={set.completed}
                          />
                          <input
                            type="number"
                            value={set.reps}
                            onChange={(event) =>
                              updateSet(exercise.id, set.id, "reps", event.target.value)
                            }
                            className="bg-input rounded-lg px-3 py-2 text-center focus:outline-none focus:ring-2 focus:ring-primary"
                            disabled={set.completed}
                          />
                          <button
                            type="button"
                            aria-label={
                              set.completed
                                ? `Mark set ${set.id} incomplete`
                                : `Mark set ${set.id} complete`
                            }
                            onClick={() => toggleSetComplete(exercise.id, set.id)}
                            className={`h-9 rounded-lg px-2 flex items-center justify-center transition-all text-xs ${
                              set.completed
                                ? "bg-primary text-primary-foreground"
                                : "bg-input hover:bg-accent"
                            }`}
                          >
                            {set.completed ? "Undo" : "Done"}
                          </button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  <button
                    type="button"
                    onClick={() => addSet(exercise.id)}
                    className="w-full bg-input hover:bg-accent rounded-lg px-4 py-2.5 flex items-center justify-center gap-2 transition-colors text-sm"
                  >
                    <span>Add Set</span>
                  </button>
                </SurfaceCard>
              </motion.div>
            ))}

            <button
              type="button"
              className="w-full bg-input hover:bg-accent rounded-2xl px-6 py-4 flex items-center justify-center gap-2 transition-colors border border-dashed border-border"
            >
              <span>Add Exercise</span>
            </button>
          </>
        )}
      </div>

      <div className="sticky bottom-0 bg-gradient-to-t from-background via-background to-transparent p-6 lg:pb-6 pb-24">
        <div className="max-w-4xl mx-auto">
          <button
            type="button"
            className="w-full bg-primary text-primary-foreground rounded-2xl px-6 py-4 hover:bg-primary/90 transition-colors shadow-lg"
          >
            Finish Workout
          </button>
        </div>
      </div>
    </div>
  );
}
