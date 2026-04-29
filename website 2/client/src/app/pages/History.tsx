import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { PageHeader } from "../components/PageHeader";
import { PageShell } from "../components/PageShell";
import { SurfaceCard } from "../components/SurfaceCard";
import { workoutHistory } from "../lib/workoutHistory";

export function History() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <PageShell size="narrow">
      <PageHeader title="Workout History" description="Your training log" />

      <div className="space-y-3">
        {workoutHistory.map((workout, index) => (
          <motion.div
            key={workout.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <SurfaceCard className="overflow-hidden">
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
                  <span className="text-sm text-muted-foreground">
                    {expandedId === workout.id ? "Hide" : "Show"}
                  </span>
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
            </SurfaceCard>
          </motion.div>
        ))}
      </div>
    </PageShell>
  );
}
