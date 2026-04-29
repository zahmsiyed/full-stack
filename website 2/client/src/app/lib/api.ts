import axios from "axios";

interface ApiErrorResponse {
  error?: string;
  message?: string;
}

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Keep API error handling in one place so page components stay easy to read.
export function getErrorMessage(
  error: unknown,
  fallback = "Something went wrong."
) {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    return (
      error.response?.data?.error ||
      error.response?.data?.message ||
      error.message ||
      fallback
    );
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
}
