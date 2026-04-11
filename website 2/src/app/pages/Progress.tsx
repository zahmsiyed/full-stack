import { motion } from "motion/react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, Award, Calendar, Dumbbell } from "lucide-react";
import { StatCard } from "../components/StatCard";
import { FADE_IN_ANIMATION, CHART_COLORS } from "../lib/constants";

const volumeData = [
  { date: "Mar 1", volume: 8200 },
  { date: "Mar 8", volume: 9100 },
  { date: "Mar 15", volume: 8800 },
  { date: "Mar 22", volume: 10200 },
  { date: "Mar 29", volume: 11400 },
  { date: "Apr 5", volume: 12100 },
];

const weeklyWorkoutsData = [
  { week: "Week 1", workouts: 3 },
  { week: "Week 2", workouts: 4 },
  { week: "Week 3", workouts: 3 },
  { week: "Week 4", workouts: 5 },
  { week: "Week 5", workouts: 4 },
  { week: "Week 6", workouts: 4 },
];

const personalRecords = [
  { exercise: "Barbell Bench Press", weight: "100 kg", date: "Apr 5, 2026" },
  { exercise: "Barbell Squat", weight: "140 kg", date: "Apr 3, 2026" },
  { exercise: "Deadlift", weight: "160 kg", date: "Mar 28, 2026" },
];

const stats = [
  { label: "Total Workouts", value: "24", icon: Dumbbell },
  { label: "Total Volume", value: "58,900", unit: "kg", icon: TrendingUp },
  { label: "Training Days", value: "24", icon: Calendar },
  { label: "Personal Records", value: "3", icon: Award },
];

export function Progress() {
  return (
    <div className="min-h-full p-6 lg:p-8 max-w-7xl mx-auto">
      <motion.div {...FADE_IN_ANIMATION}>
        <div className="mb-8">
          <h1 className="text-3xl mb-2">Progress</h1>
          <p className="text-muted-foreground">Track your performance</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} {...stat} delay={index * 0.1} />
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Volume Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-card rounded-2xl p-6 border border-border"
          >
            <h2 className="text-xl mb-6">Volume Over Time</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={volumeData} id="volume-chart">
                <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} />
                <XAxis
                  dataKey="date"
                  stroke={CHART_COLORS.axis}
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke={CHART_COLORS.axis}
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: CHART_COLORS.background,
                    border: `1px solid ${CHART_COLORS.border}`,
                    borderRadius: "12px",
                    color: CHART_COLORS.text,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="volume"
                  stroke={CHART_COLORS.primary}
                  strokeWidth={3}
                  dot={{ fill: CHART_COLORS.primary, r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Workouts per Week */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="bg-card rounded-2xl p-6 border border-border"
          >
            <h2 className="text-xl mb-6">Workouts per Week</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={weeklyWorkoutsData} id="workouts-chart">
                <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} />
                <XAxis
                  dataKey="week"
                  stroke={CHART_COLORS.axis}
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke={CHART_COLORS.axis}
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: CHART_COLORS.background,
                    border: `1px solid ${CHART_COLORS.border}`,
                    borderRadius: "12px",
                    color: CHART_COLORS.text,
                  }}
                />
                <Bar
                  dataKey="workouts"
                  fill={CHART_COLORS.primary}
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Personal Records */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <h2 className="text-xl mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" />
            Personal Records
          </h2>
          <div className="space-y-3">
            {personalRecords.map((record, index) => (
              <motion.div
                key={record.exercise}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                className="bg-card rounded-2xl p-5 border border-border"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="mb-1">{record.exercise}</h3>
                    <p className="text-sm text-muted-foreground">{record.date}</p>
                  </div>
                  <div className="text-2xl text-primary">{record.weight}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
