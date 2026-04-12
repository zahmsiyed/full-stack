import type { HTMLAttributes } from "react";
import { cn } from "./ui/utils";

export function SurfaceCard({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("bg-card rounded-2xl border border-border", className)}
      {...props}
    />
  );
}
