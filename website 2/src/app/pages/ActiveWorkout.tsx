import { useState, useEffect } from "react";
import { ChevronLeft, Plus, Check, X } from "lucide-react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";

interface Set {
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
  const [exercises, setExercises] = useState(initialExercises);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDuration((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const toggleSetComplete = (exerciseId: number, setId: number) => {
    setExercises((prev) =>
      prev.map((ex) =>
        ex.id === exerciseId
          ? {
              ...ex,
              sets: ex.sets.map((set) =>
                set.id === setId ? { ...set, completed: !set.completed } : set
              ),
            }
          : ex
      )
    );
  };

  const addSet = (exerciseId: number) => {
    setExercises((prev) =>
      prev.map((ex) =>
        ex.id === exerciseId
          ? {
              ...ex,
              sets: [
                ...ex.sets,
                {
                  id: ex.sets.length + 1,
                  weight: ex.sets[ex.sets.length - 1]?.weight || "",
                  reps: ex.sets[ex.sets.length - 1]?.reps || "",
                  completed: false,
                },
              ],
            }
          : ex
      )
    );
  };

  const updateSet = (
    exerciseId: number,
    setId: number,
    field: "weight" | "reps",
    value: string
  ) => {
    setExercises((prev) =>
      prev.map((ex) =>
        ex.id === exerciseId
          ? {
              ...ex,
              sets: ex.sets.map((set) =>
                set.id === setId ? { ...set, [field]: value } : set
              ),
            }
          : ex
      )
    );
  };

  return (
    <div className="min-h-full bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-card/95 backdrop-blur-lg border-b border-border z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-accent transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-xl">Push Day A</h1>
                <p className="text-sm text-muted-foreground">{formatTime(duration)}</p>
              </div>
            </div>
            <button className="text-sm text-muted-foreground hover:text-foreground">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Exercises */}
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {exercises.map((exercise, exerciseIndex) => (
          <motion.div
            key={exercise.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: exerciseIndex * 0.1 }}
            className="bg-card rounded-2xl p-6 border border-border"
          >
            <div className="mb-4">
              <h3 className="text-lg mb-1">{exercise.name}</h3>
              <p className="text-sm text-muted-foreground">
                Previous: {exercise.previousBest}
              </p>
            </div>

            {/* Sets Table */}
            <div className="space-y-2 mb-4">
              <div className="grid grid-cols-[40px_1fr_1fr_40px] gap-3 text-sm text-muted-foreground px-2">
                <span>Set</span>
                <span>Weight (kg)</span>
                <span>Reps</span>
                <span></span>
              </div>

              <AnimatePresence>
                {exercise.sets.map((set) => (
                  <motion.div
                    key={set.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="grid grid-cols-[40px_1fr_1fr_40px] gap-3 items-center"
                  >
                    <span className="text-sm text-muted-foreground pl-2">
                      {set.id}
                    </span>
                    <input
                      type="number"
                      value={set.weight}
                      onChange={(e) =>
                        updateSet(exercise.id, set.id, "weight", e.target.value)
                      }
                      className="bg-input rounded-lg px-3 py-2 text-center focus:outline-none focus:ring-2 focus:ring-primary"
                      disabled={set.completed}
                    />
                    <input
                      type="number"
                      value={set.reps}
                      onChange={(e) =>
                        updateSet(exercise.id, set.id, "reps", e.target.value)
                      }
                      className="bg-input rounded-lg px-3 py-2 text-center focus:outline-none focus:ring-2 focus:ring-primary"
                      disabled={set.completed}
                    />
                    <button
                      onClick={() => toggleSetComplete(exercise.id, set.id)}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                        set.completed
                          ? "bg-primary text-primary-foreground"
                          : "bg-input hover:bg-accent"
                      }`}
                    >
                      <motion.div
                        initial={false}
                        animate={{ scale: set.completed ? 1 : 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      >
                        <Check className="w-4 h-4" />
                      </motion.div>
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <button
              onClick={() => addSet(exercise.id)}
              className="w-full bg-input hover:bg-accent rounded-lg px-4 py-2.5 flex items-center justify-center gap-2 transition-colors text-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add Set</span>
            </button>
          </motion.div>
        ))}

        <button className="w-full bg-input hover:bg-accent rounded-2xl px-6 py-4 flex items-center justify-center gap-2 transition-colors border border-dashed border-border">
          <Plus className="w-5 h-5" />
          <span>Add Exercise</span>
        </button>
      </div>

      {/* Sticky Finish Button */}
      <div className="sticky bottom-0 bg-gradient-to-t from-background via-background to-transparent p-6 lg:pb-6 pb-24">
        <div className="max-w-4xl mx-auto">
          <button className="w-full bg-primary text-primary-foreground rounded-2xl px-6 py-4 hover:bg-primary/90 transition-colors shadow-lg">
            Finish Workout
          </button>
        </div>
      </div>
    </div>
  );
}
