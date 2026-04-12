import { motion } from "motion/react";
import type { StatCardData } from "../lib/constants";
import { SurfaceCard } from "./SurfaceCard";

interface StatCardProps extends StatCardData {
  delay?: number;
}

export function StatCard({ label, value, unit, icon: Icon, change, delay = 0 }: StatCardProps) {
  return (
    <SurfaceCard className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay }}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
            <Icon className="w-5 h-5 text-primary" />
          </div>
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
