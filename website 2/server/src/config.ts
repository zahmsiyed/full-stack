import path from "node:path";
import { fileURLToPath } from "node:url";

const serverRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function parsePort(value: string | undefined) {
  const port = Number(value ?? 4000);
  return Number.isInteger(port) && port > 0 ? port : 4000;
}

function parseCorsOrigins(value: string | undefined) {
  const origins = value
    ?.split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  return origins?.length
    ? origins
    : ["http://localhost:5173", "http://127.0.0.1:5173"];
}

export const config = {
  port: parsePort(process.env.PORT),
  corsOrigins: parseCorsOrigins(process.env.CORS_ORIGINS),
  databasePath: process.env.DATABASE_PATH
    ? path.resolve(process.env.DATABASE_PATH)
    : path.join(serverRoot, "data", "fittrack.sqlite"),
};
