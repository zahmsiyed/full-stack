import cors from "cors";
import express from "express";
import type { NextFunction, Request, Response } from "express";
import { config } from "./config.js";
import { routinesRouter } from "./routes/routines.js";

const app = express();

app.use(
  cors({
    origin: config.corsOrigins,
  })
);
app.use(express.json({ limit: "100kb" }));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/routines", routinesRouter);

app.use((_req, res) => {
  res.status(404).json({ error: "Route not found." });
});

app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error." });
});

export { app };
