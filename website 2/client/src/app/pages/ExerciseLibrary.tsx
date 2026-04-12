import { useState, useMemo } from "react";
import { Search, Star, Plus } from "lucide-react";
import { motion } from "motion/react";
import { PageHeader } from "../components/PageHeader";
import { PageShell } from "../components/PageShell";
import { SurfaceCard } from "../components/SurfaceCard";

const categories = ["All", "Chest", "Back", "Legs", "Shoulders", "Arms", "Core"];

const exercises = [
  { id: 1, name: "Barbell Bench Press", category: "Chest", favorite: true },
  { id: 2, name: "Barbell Squat", category: "Legs", favorite: true },
  { id: 3, name: "Deadlift", category: "Back", favorite: true },
  { id: 4, name: "Overhead Press", category: "Shoulders", favorite: false },
  { id: 5, name: "Barbell Row", category: "Back", favorite: false },
  { id: 6, name: "Incline Dumbbell Press", category: "Chest", favorite: false },
  { id: 7, name: "Romanian Deadlift", category: "Legs", favorite: false },
  { id: 8, name: "Lat Pulldown", category: "Back", favorite: false },
  { id: 9, name: "Dumbbell Shoulder Press", category: "Shoulders", favorite: false },
  { id: 10, name: "Barbell Curl", category: "Arms", favorite: false },
  { id: 11, name: "Tricep Pushdown", category: "Arms", favorite: false },
  { id: 12, name: "Cable Flyes", category: "Chest", favorite: false },
  { id: 13, name: "Leg Press", category: "Legs", favorite: false },
  { id: 14, name: "Plank", category: "Core", favorite: false },
];

interface ExerciseListCardProps {
  category: string;
  favorite: boolean;
  name: string;
}

function ExerciseListCard({ category, favorite, name }: ExerciseListCardProps) {
  return (
    <SurfaceCard className="p-4 hover:border-primary/50 transition-all group cursor-pointer">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="mb-1">{name}</h3>
          <p className="text-sm text-muted-foreground">{category}</p>
        </div>
        <Star
          className={
            favorite
              ? "w-5 h-5 text-primary fill-primary"
              : "w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
          }
        />
      </div>
    </SurfaceCard>
  );
}

export function ExerciseLibrary() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const { favoriteExercises, otherExercises } = useMemo(() => {
    const filtered = exercises.filter((exercise) => {
      const matchesCategory =
        selectedCategory === "All" || exercise.category === selectedCategory;
      const matchesSearch = exercise.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    return {
      favoriteExercises: filtered.filter((ex) => ex.favorite),
      otherExercises: filtered.filter((ex) => !ex.favorite),
    };
  }, [selectedCategory, searchQuery]);

  return (
    <PageShell>
      <PageHeader
        title="Exercise Library"
        description="Browse and search exercises"
        action={
          <button className="bg-primary text-primary-foreground rounded-xl px-4 py-2.5 flex items-center gap-2 hover:bg-primary/90 transition-colors">
            <Plus className="w-5 h-5" />
            <span className="hidden sm:inline">Add Custom</span>
          </button>
        }
      />

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search exercises..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-card rounded-2xl pl-12 pr-4 py-3 border border-border focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-xl whitespace-nowrap transition-colors ${
              selectedCategory === category
                ? "bg-primary text-primary-foreground"
                : "bg-card text-foreground hover:bg-accent border border-border"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {favoriteExercises.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-primary fill-primary" />
            Favorites
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {favoriteExercises.map((exercise) => (
              <motion.div
                key={exercise.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <ExerciseListCard
                  category={exercise.category}
                  favorite
                  name={exercise.name}
                />
              </motion.div>
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="text-xl mb-4">
          {selectedCategory === "All" ? "All Exercises" : selectedCategory}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {otherExercises.map((exercise, index) => (
            <motion.div
              key={exercise.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <ExerciseListCard
                category={exercise.category}
                favorite={false}
                name={exercise.name}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
