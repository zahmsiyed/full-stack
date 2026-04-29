import { motion } from "motion/react";
import { PageHeader } from "../components/PageHeader";
import { PageShell } from "../components/PageShell";
import { SurfaceCard } from "../components/SurfaceCard";
import { getWorkoutHistoryStats } from "../lib/workoutHistory";

const workoutStats = getWorkoutHistoryStats();
const userStats = [
  { label: "Total Workouts", value: String(workoutStats.totalWorkouts) },
  { label: "Total Volume", value: `${workoutStats.totalVolume.toLocaleString()} kg` },
  { label: "Member Since", value: workoutStats.memberSince },
  { label: "Current Streak", value: `${workoutStats.currentStreak} workouts` },
];

const settingsOptions = [
  { label: "Units", value: "Metric (kg)" },
  { label: "Default Rest Timer", value: "90 seconds" },
  { label: "Theme", value: "Dark" },
];

export function Profile() {
  return (
    <PageShell size="narrow">
      <PageHeader title="Profile" description="Your account and settings" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <SurfaceCard className="p-6 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center">
              <span className="text-2xl text-primary">Z</span>
            </div>
            <div>
              <h2 className="text-2xl mb-1">Zahm S</h2>
              <p className="text-muted-foreground">zahmsiyed@fullstack.com</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {userStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                className="bg-background rounded-xl p-4"
              >
                <div className="text-2xl mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </SurfaceCard>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <SurfaceCard className="mb-6 overflow-hidden">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl">Settings</h2>
          </div>
          <div>
            {settingsOptions.map((option) => (
              <button
                key={option.label}
                className="w-full p-5 flex items-center justify-between hover:bg-accent transition-colors border-b border-border last:border-b-0"
              >
                <div className="text-left">
                  <div className="mb-0.5">{option.label}</div>
                  <div className="text-sm text-muted-foreground">
                    {option.value}
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">Edit</span>
              </button>
            ))}
          </div>
        </SurfaceCard>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="w-full bg-destructive/10 text-destructive rounded-2xl p-5 flex items-center justify-center gap-3 hover:bg-destructive/20 transition-colors"
      >
        <span>Log Out</span>
      </motion.button>
    </PageShell>
  );
}
