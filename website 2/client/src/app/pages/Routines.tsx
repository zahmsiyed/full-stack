import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import { LoaderCircle, MoreVertical, Play, Plus } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router";
import { PageHeader } from "../components/PageHeader";
import { PageShell } from "../components/PageShell";
import { StatusCard } from "../components/StatusCard";
import { SurfaceCard } from "../components/SurfaceCard";
import { getErrorMessage } from "../lib/api";
import {
  createRoutine,
  fetchRoutines,
  type Routine,
  type RoutineInput,
} from "../lib/routinesApi";

const initialForm: RoutineInput = {
  name: "",
  exercises: 4,
  duration: "45 min",
  lastPerformed: "Not yet started",
};

export function Routines() {
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [form, setForm] = useState<RoutineInput>(initialForm);

  useEffect(() => {
    let isMounted = true;

    // Load the saved routines once when the page opens.
    async function loadRoutines() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchRoutines();

        if (isMounted) {
          setRoutines(data);
        }
      } catch (error) {
        if (isMounted) {
          setError(
            getErrorMessage(error, "Unable to load routines from the server.")
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    void loadRoutines();

    return () => {
      isMounted = false;
    };
  }, []);

  // Keep form updates simple so each input stays controlled.
  function updateForm<K extends keyof RoutineInput>(field: K, value: RoutineInput[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function parseExercises(value: string) {
    const parsedValue = Number(value);
    return Number.isNaN(parsedValue) || parsedValue < 1 ? 1 : parsedValue;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.name.trim()) {
      setFormError("Routine name is required.");
      return;
    }

    try {
      setIsSubmitting(true);
      setFormError(null);
      setError(null);
      const created = await createRoutine({
        ...form,
        name: form.name.trim(),
      });
      setRoutines((prev) => [created, ...prev]);
      setForm({ ...initialForm });
    } catch (error) {
      setFormError(
        getErrorMessage(error, "Unable to save routine right now.")
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <PageShell>
      <PageHeader
        title="Routines"
        description="Workout templates"
        action={
          <div className="bg-primary text-primary-foreground rounded-xl px-4 py-2.5 flex items-center gap-2">
            <Plus className="w-5 h-5" />
            <span>Create Routine</span>
          </div>
        }
      />

      <SurfaceCard className="p-6 mb-8">
        <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" onSubmit={handleSubmit}>
          <label className="block">
            <span className="text-sm text-muted-foreground mb-2 block">Routine Name</span>
            <input
              value={form.name}
              onChange={(event) => updateForm("name", event.target.value)}
              className="w-full bg-input rounded-xl px-4 py-3 border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Push Day C"
            />
          </label>

          <label className="block">
            <span className="text-sm text-muted-foreground mb-2 block">Exercises</span>
            <input
              type="number"
              min={1}
              value={form.exercises}
              onChange={(event) =>
                updateForm("exercises", parseExercises(event.target.value))
              }
              className="w-full bg-input rounded-xl px-4 py-3 border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </label>

          <label className="block">
            <span className="text-sm text-muted-foreground mb-2 block">Duration</span>
            <input
              value={form.duration}
              onChange={(event) => updateForm("duration", event.target.value)}
              className="w-full bg-input rounded-xl px-4 py-3 border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="60 min"
            />
          </label>

          <label className="block">
            <span className="text-sm text-muted-foreground mb-2 block">Last Performed</span>
            <input
              value={form.lastPerformed}
              onChange={(event) => updateForm("lastPerformed", event.target.value)}
              className="w-full bg-input rounded-xl px-4 py-3 border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Today"
            />
          </label>

          <div className="md:col-span-2 lg:col-span-4 flex items-center justify-between gap-4">
            <div>
              {formError && <p className="text-sm text-destructive">{formError}</p>}
              {!formError && (
                <p className="text-sm text-muted-foreground">
                  Create a routine and store it in the backend.
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary text-primary-foreground rounded-xl px-4 py-2.5 flex items-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-60"
            >
              {isSubmitting ? <LoaderCircle className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
              <span>{isSubmitting ? "Saving..." : "Create Routine"}</span>
            </button>
          </div>
        </form>
      </SurfaceCard>

      {loading && (
        <StatusCard tone="loading" message="Loading routines..." />
      )}

      {error && <StatusCard tone="error" message={error} />}

      {!loading && !error && (
        <>
          {routines.length === 0 && (
            <SurfaceCard className="p-5 mb-4">
              <p className="text-sm text-muted-foreground">
                No routines yet. Create your first one above.
              </p>
            </SurfaceCard>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {routines.map((routine, index) => (
              <motion.div
                key={routine.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <SurfaceCard className="p-6 hover:border-primary/50 transition-all group">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg">{routine.name}</h3>
                    <button className="text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Exercises</span>
                      <span>{routine.exercises}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Duration</span>
                      <span>{routine.duration}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Last performed</span>
                      <span>{routine.lastPerformed}</span>
                    </div>
                  </div>

                  <Link
                    to={`/workout/${routine.id}`}
                    className="w-full bg-primary/10 text-primary rounded-xl px-4 py-2.5 flex items-center justify-center gap-2 hover:bg-primary/20 transition-colors"
                  >
                    <Play className="w-4 h-4" />
                    <span>Start Workout</span>
                  </Link>
                </SurfaceCard>
              </motion.div>
            ))}
          </div>
        </>
      )}
    </PageShell>
  );
}
