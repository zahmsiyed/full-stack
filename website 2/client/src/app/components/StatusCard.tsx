import { AlertCircle, LoaderCircle } from "lucide-react";
import { SurfaceCard } from "./SurfaceCard";

interface StatusCardProps {
  tone: "loading" | "error";
  message: string;
}

export function StatusCard({ tone, message }: StatusCardProps) {
  const isError = tone === "error";
  const Icon = isError ? AlertCircle : LoaderCircle;

  return (
    <SurfaceCard className={isError ? "p-5 border-destructive/30" : "p-5"}>
      <div
        className={`flex items-center gap-3 ${
          isError ? "text-destructive" : "text-muted-foreground"
        }`}
      >
        <Icon className={`w-5 h-5 ${isError ? "" : "animate-spin text-primary"}`} />
        <p className="text-sm">{message}</p>
      </div>
    </SurfaceCard>
  );
}
