import { motion } from "motion/react";
import type { StatCardData } from "../lib/constants";
import { SurfaceCard } from "./SurfaceCard";

interface StatCardProps extends StatCardData {
  delay?: number;
}

export function StatCard({ label, value, unit, change, delay = 0 }: StatCardProps) {
  return (
    <SurfaceCard className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay }}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="h-2 w-10 rounded-full bg-primary/40" />
          {change && <span className="text-sm text-primary">{change}</span>}
        </div>
        <div className="text-2xl mb-1">
          {value}
          {unit && <span className="text-sm text-muted-foreground ml-1">{unit}</span>}
        </div>
        <div className="text-sm text-muted-foreground">{label}</div>
      </motion.div>
    </SurfaceCard>
  );
}
