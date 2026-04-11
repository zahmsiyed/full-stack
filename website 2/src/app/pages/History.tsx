import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { FADE_IN_ANIMATION } from "../lib/constants";

const workoutHistory = [
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

export function History() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="min-h-full p-6 lg:p-8 max-w-4xl mx-auto">
      <motion.div {...FADE_IN_ANIMATION}>
        <div className="mb-8">
          <h1 className="text-3xl mb-2">Workout History</h1>
          <p className="text-muted-foreground">Your training log</p>
        </div>

        <div className="space-y-3">
          {workoutHistory.map((workout, index) => (
            <motion.div
              key={workout.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-card rounded-2xl border border-border overflow-hidden"
            >
              <button
                onClick={() => toggleExpand(workout.id)}
                className="w-full p-5 text-left hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg mb-1">{workout.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {workout.date} · {workout.time}
                    </p>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedId === workout.id ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  </motion.div>
                </div>

                <div className="flex items-center gap-4 text-sm">
                  <span className="text-muted-foreground">{workout.duration}</span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">{workout.volume}</span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">
                    {workout.exercises.length} exercises
                  </span>
                </div>
              </button>

              <AnimatePresence>
                {expandedId === workout.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-border"
                  >
                    <div className="p-5 space-y-4">
                      {workout.exercises.map((exercise, idx) => (
                        <div key={idx} className="pb-4 last:pb-0">
                          <h4 className="mb-2">{exercise.name}</h4>
                          <div className="flex gap-4 text-sm text-muted-foreground">
                            <span>{exercise.sets}</span>
                            <span>•</span>
                            <span>{exercise.reps}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
