import type { LucideIcon } from "lucide-react";

export const FADE_IN_ANIMATION = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

export const CHART_COLORS = {
  background: "oklch(0.18 0 0)",
  border: "oklch(0.22 0 0)",
  text: "oklch(0.985 0 0)",
  grid: "oklch(0.22 0 0)",
  axis: "oklch(0.6 0 0)",
  primary: "oklch(0.65 0.25 265)",
};

export interface StatCardData {
  label: string;
  value: string;
  unit?: string;
  icon: LucideIcon;
  change?: string;
}
