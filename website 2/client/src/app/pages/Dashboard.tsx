import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Play, Plus, Quote } from "lucide-react";
import { motion } from "motion/react";
import { PageHeader } from "../components/PageHeader";
import { PageShell } from "../components/PageShell";
import { StatusCard } from "../components/StatusCard";
import { SurfaceCard } from "../components/SurfaceCard";
import { getErrorMessage } from "../lib/api";

const recentWorkouts = [
  {
    id: 1,
    name: "Push Day A",
    date: "2026-04-09",
    duration: "58 min",
    exercises: 6,
    volume: "3,240 kg",
  },
  {
    id: 2,
    name: "Pull Day B",
    date: "2026-04-07",
    duration: "52 min",
    exercises: 5,
    volume: "2,890 kg",
  },
  {
    id: 3,
    name: "Leg Day",
    date: "2026-04-05",
    duration: "65 min",
    exercises: 7,
    volume: "4,120 kg",
  },
];

interface QuoteResponse {
  id: number;
  quote: string;
  author: string;
}

export function Dashboard() {
  const [quote, setQuote] = useState<QuoteResponse | null>(null);
  const [quoteLoading, setQuoteLoading] = useState(true);
  const [quoteError, setQuoteError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    // Keep one simple HTTPS example on the dashboard for the class rubric.
    async function loadQuote() {
      try {
        setQuoteLoading(true);
        setQuoteError(null);
        const response = await axios.get<QuoteResponse>(
          "https://dummyjson.com/quotes/random"
        );

        if (isMounted) {
          setQuote(response.data);
        }
      } catch (error) {
        if (isMounted) {
          setQuoteError(
            getErrorMessage(error, "Unable to load the demo HTTPS quote.")
          );
        }
      } finally {
        if (isMounted) {
          setQuoteLoading(false);
        }
      }
    }

    void loadQuote();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <PageShell>
      <PageHeader title="Dashboard" description="Track your fitness journey" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Link
          to="/workout/new"
          className="group bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl p-6 flex items-center justify-between transition-all"
        >
          <div>
            <h3 className="text-xl mb-1">Start Workout</h3>
            <p className="text-primary-foreground/80 text-sm">Begin empty workout</p>
          </div>
          <div className="w-12 h-12 bg-primary-foreground/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <Play className="w-6 h-6" />
          </div>
        </Link>

        <Link
          to="/routines"
          className="group bg-card hover:bg-accent border border-border rounded-2xl p-6 flex items-center justify-between transition-all"
        >
          <div>
            <h3 className="text-xl mb-1">Build Workout Template</h3>
            <p className="text-muted-foreground text-sm">Create routine</p>
          </div>
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <Plus className="w-6 h-6 text-primary" />
          </div>
        </Link>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl">Past Workouts</h2>
          <Link to="/history" className="text-sm text-primary hover:underline">
            View all
          </Link>
        </div>

        <div className="space-y-3">
          {recentWorkouts.map((workout, index) => (
            <motion.div
              key={workout.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <SurfaceCard className="p-5 hover:border-primary/50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg mb-1">{workout.name}</h3>
                    <p className="text-sm text-muted-foreground">{workout.date}</p>
                  </div>
                  <span className="text-sm text-muted-foreground">{workout.duration}</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{workout.exercises} exercises</span>
                  <span>•</span>
                  <span>{workout.volume} total</span>
                </div>
              </SurfaceCard>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <div className="flex items-center gap-2 mb-4">
          <Quote className="w-5 h-5 text-primary" />
          <h2 className="text-xl">HTTPS API Demo</h2>
        </div>

        {quoteLoading && (
          <StatusCard tone="loading" message="Loading quote..." />
        )}

        {quoteError && <StatusCard tone="error" message={quoteError} />}

        {!quoteLoading && !quoteError && quote && (
          <SurfaceCard className="p-5">
            <p className="mb-2">{quote.quote}</p>
            <p className="text-sm text-muted-foreground">{quote.author}</p>
          </SurfaceCard>
        )}
      </div>
    </PageShell>
  );
}
