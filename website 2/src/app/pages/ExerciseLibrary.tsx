import { useState, useMemo } from "react";
import { Search, Star, Plus } from "lucide-react";
import { motion } from "motion/react";
import { FADE_IN_ANIMATION } from "../lib/constants";

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
    <div className="min-h-full p-6 lg:p-8 max-w-7xl mx-auto">
      <motion.div {...FADE_IN_ANIMATION}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl mb-2">Exercise Library</h1>
            <p className="text-muted-foreground">Browse and search exercises</p>
          </div>
          <button className="bg-primary text-primary-foreground rounded-xl px-4 py-2.5 flex items-center gap-2 hover:bg-primary/90 transition-colors">
            <Plus className="w-5 h-5" />
            <span className="hidden sm:inline">Add Custom</span>
          </button>
        </div>

        {/* Search */}
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

        {/* Category Filters */}
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

        {/* Favorites */}
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
                  className="bg-card rounded-2xl p-4 border border-border hover:border-primary/50 transition-all group cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="mb-1">{exercise.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {exercise.category}
                      </p>
                    </div>
                    <Star className="w-5 h-5 text-primary fill-primary" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* All Exercises */}
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
                className="bg-card rounded-2xl p-4 border border-border hover:border-primary/50 transition-all group cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="mb-1">{exercise.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {exercise.category}
                    </p>
                  </div>
                  <Star className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
