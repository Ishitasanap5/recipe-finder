import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import RecipeCard from './RecipeCard';

const ChefQuest = () => {
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch recipes from API
  const fetchRecipes = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );
      const data = await response.json();
      setRecipes(data.meals || []);
    } catch (err) {
      setError('Failed to fetch recipes. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  // Load favorites from localStorage on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(saved);
    fetchRecipes('pasta'); // initial search
  }, []);

  // Toggle favorite
  const toggleFavorite = (meal) => {
    let updated = [...favorites];
    const exists = favorites.find((f) => f.idMeal === meal.idMeal);

    if (exists) {
      updated = updated.filter((f) => f.idMeal !== meal.idMeal);
    } else {
      updated.push(meal);
    }

    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-orange-50/40 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="text-5xl font-black text-orange-600 mb-2 tracking-tight">
            ChefQuest
          </h1>
          <p className="text-slate-500 font-medium">
            Find recipes from around the world
          </p>
        </header>

        {/* Search */}
        <SearchBar onSearch={fetchRecipes} />

        {/* Error */}
        {error && (
          <div className="text-center text-red-500 mb-8 font-medium">{error}</div>
        )}

        {/* Favorites Section */}
        {favorites.length > 0 && (
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-orange-600 mb-4">★ Your Favorites</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {favorites.map((meal) => (
                <RecipeCard
                  key={meal.idMeal}
                  meal={meal}
                  onFavorite={toggleFavorite}
                  isFavorite={true}
                />
              ))}
            </div>
          </section>
        )}

        {/* Loading */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-80 bg-slate-200/60 animate-pulse rounded-2xl"
              />
            ))}
          </div>
        ) : (
          // Search Results
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {recipes.length > 0 ? (
              recipes.map((meal) => (
                <RecipeCard
                  key={meal.idMeal}
                  meal={meal}
                  onFavorite={toggleFavorite}
                  isFavorite={favorites.some((f) => f.idMeal === meal.idMeal)}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <p className="text-slate-400 text-lg">
                  No recipes found for that search.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChefQuest;
