import { SurfaceCard } from "./SurfaceCard";

interface StatusCardProps {
  tone: "loading" | "error";
  message: string;
}

export function StatusCard({ tone, message }: StatusCardProps) {
  const isError = tone === "error";

  return (
    <SurfaceCard className={isError ? "p-5 border-destructive/30" : "p-5"}>
      <div
        className={`flex items-center gap-3 ${
          isError ? "text-destructive" : "text-muted-foreground"
        }`}
      >
        <span className="text-sm font-medium">
          {isError ? "Error" : "Loading"}
        </span>
        <p className="text-sm">{message}</p>
      </div>
    </SurfaceCard>
  );
}
