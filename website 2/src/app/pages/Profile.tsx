import { User, Settings, LogOut, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { FADE_IN_ANIMATION } from "../lib/constants";

const userStats = [
  { label: "Total Workouts", value: "24" },
  { label: "Total Volume", value: "58,900 kg" },
  { label: "Member Since", value: "Jan 2026" },
  { label: "Current Streak", value: "7 days" },
];

const settingsOptions = [
  { label: "Units", value: "Metric (kg)", icon: Settings },
  { label: "Default Rest Timer", value: "90 seconds", icon: Settings },
  { label: "Theme", value: "Dark", icon: Settings },
];

export function Profile() {
  return (
    <div className="min-h-full p-6 lg:p-8 max-w-4xl mx-auto">
      <motion.div {...FADE_IN_ANIMATION}>
        <div className="mb-8">
          <h1 className="text-3xl mb-2">Profile</h1>
          <p className="text-muted-foreground">Your account and settings</p>
        </div>

        {/* User Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-card rounded-2xl p-6 border border-border mb-6"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center">
              <User className="w-10 h-10 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl mb-1">Athlete</h2>
              <p className="text-muted-foreground">athlete@fittrack.app</p>
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
        </motion.div>

        {/* Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-card rounded-2xl border border-border mb-6 overflow-hidden"
        >
          <div className="p-6 border-b border-border">
            <h2 className="text-xl">Settings</h2>
          </div>
          <div>
            {settingsOptions.map((option, index) => (
              <button
                key={option.label}
                className="w-full p-5 flex items-center justify-between hover:bg-accent transition-colors border-b border-border last:border-b-0"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <option.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <div className="mb-0.5">{option.label}</div>
                    <div className="text-sm text-muted-foreground">
                      {option.value}
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            ))}
          </div>
        </motion.div>

        {/* Logout */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="w-full bg-destructive/10 text-destructive rounded-2xl p-5 flex items-center justify-center gap-3 hover:bg-destructive/20 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Log Out</span>
        </motion.button>
      </motion.div>
    </div>
  );
}
