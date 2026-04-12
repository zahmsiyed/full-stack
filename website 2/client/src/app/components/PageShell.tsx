import type { PropsWithChildren } from "react";
import { motion } from "motion/react";
import { cn } from "./ui/utils";
import { FADE_IN_ANIMATION } from "../lib/constants";

interface PageShellProps extends PropsWithChildren {
  className?: string;
  contentClassName?: string;
  size?: "default" | "narrow";
}

export function PageShell({
  children,
  className,
  contentClassName,
  size = "default",
}: PageShellProps) {
  return (
    <div
      className={cn(
        "min-h-full p-6 lg:p-8 mx-auto",
        size === "narrow" ? "max-w-4xl" : "max-w-7xl",
        className
      )}
    >
      <motion.div {...FADE_IN_ANIMATION} className={contentClassName}>
        {children}
      </motion.div>
    </div>
  );
}
