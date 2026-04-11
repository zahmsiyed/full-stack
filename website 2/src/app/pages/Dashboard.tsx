import { Link } from "react-router";
import { Play, Plus } from "lucide-react";
import { motion } from "motion/react";
import { FADE_IN_ANIMATION } from "../lib/constants";

const recentWorkouts = [
  {
    id: 1,
    name: "Push Day A",
    date: "2026-04-09",
    duration: "58 min",
    exercises: 6,
    volume: "3,240 kg",
  },
  {
    id: 2,
    name: "Pull Day B",
    date: "2026-04-07",
    duration: "52 min",
    exercises: 5,
    volume: "2,890 kg",
  },
  {
    id: 3,
    name: "Leg Day",
    date: "2026-04-05",
    duration: "65 min",
    exercises: 7,
    volume: "4,120 kg",
  },
];

export function Dashboard() {
  return (
    <div className="min-h-full p-6 lg:p-8 max-w-7xl mx-auto">
      <motion.div {...FADE_IN_ANIMATION}>
        <div className="mb-8">
          <h1 className="text-3xl mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Track your fitness journey</p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Link
            to="/workout/new"
            className="group bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl p-6 flex items-center justify-between transition-all"
          >
            <div>
              <h3 className="text-xl mb-1">Start Workout</h3>
              <p className="text-primary-foreground/80 text-sm">Begin empty workout</p>
            </div>
            <div className="w-12 h-12 bg-primary-foreground/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Play className="w-6 h-6" />
            </div>
          </Link>

          <Link
            to="/routines"
            className="group bg-card hover:bg-accent border border-border rounded-2xl p-6 flex items-center justify-between transition-all"
          >
            <div>
              <h3 className="text-xl mb-1">Build Workout Template</h3>
              <p className="text-muted-foreground text-sm">Create routine</p>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Plus className="w-6 h-6 text-primary" />
            </div>
          </Link>
        </div>

        {/* Recent Workouts */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl">Past Workouts</h2>
            <Link to="/history" className="text-sm text-primary hover:underline">
              View all
            </Link>
          </div>

          <div className="space-y-3">
            {recentWorkouts.map((workout, index) => (
              <motion.div
                key={workout.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-card rounded-2xl p-5 border border-border hover:border-primary/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg mb-1">{workout.name}</h3>
                    <p className="text-sm text-muted-foreground">{workout.date}</p>
                  </div>
                  <span className="text-sm text-muted-foreground">{workout.duration}</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{workout.exercises} exercises</span>
                  <span>•</span>
                  <span>{workout.volume} total</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
