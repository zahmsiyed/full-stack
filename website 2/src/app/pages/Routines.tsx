import { Plus, MoreVertical, Play } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router";
import { FADE_IN_ANIMATION } from "../lib/constants";

const routines = [
  {
    id: 1,
    name: "Push Day A",
    exercises: 6,
    duration: "60 min",
    lastPerformed: "2 days ago",
  },
  {
    id: 2,
    name: "Pull Day B",
    exercises: 5,
    duration: "55 min",
    lastPerformed: "4 days ago",
  },
  {
    id: 3,
    name: "Leg Day",
    exercises: 7,
    duration: "70 min",
    lastPerformed: "5 days ago",
  },
  {
    id: 4,
    name: "Upper Power",
    exercises: 8,
    duration: "65 min",
    lastPerformed: "1 week ago",
  },
];

export function Routines() {
  return (
    <div className="min-h-full p-6 lg:p-8 max-w-7xl mx-auto">
      <motion.div {...FADE_IN_ANIMATION}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl mb-2">Routines</h1>
            <p className="text-muted-foreground">Workout templates</p>
          </div>
          <button className="bg-primary text-primary-foreground rounded-xl px-4 py-2.5 flex items-center gap-2 hover:bg-primary/90 transition-colors">
            <Plus className="w-5 h-5" />
            <span>Create Routine</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {routines.map((routine, index) => (
            <motion.div
              key={routine.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-card rounded-2xl p-6 border border-border hover:border-primary/50 transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg">{routine.name}</h3>
                <button className="text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Exercises</span>
                  <span>{routine.exercises}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Duration</span>
                  <span>{routine.duration}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Last performed</span>
                  <span>{routine.lastPerformed}</span>
                </div>
              </div>

              <Link
                to={`/workout/${routine.id}`}
                className="w-full bg-primary/10 text-primary rounded-xl px-4 py-2.5 flex items-center justify-center gap-2 hover:bg-primary/20 transition-colors"
              >
                <Play className="w-4 h-4" />
                <span>Start Workout</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
