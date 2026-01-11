import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import RecipeCard from "./RecipeCard";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRecipes = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );
      const data = await res.json();
      setRecipes(data.meals || []);
    } catch (err) {
      setError("Failed to fetch recipes. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  // Load favorites from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(saved);
    fetchRecipes("pasta");
  }, []);

  const toggleFavorite = (meal) => {
    let updated = [...favorites];
    const exists = favorites.find((f) => f.idMeal === meal.idMeal);
    if (exists) updated = updated.filter((f) => f.idMeal !== meal.idMeal);
    else updated.push(meal);

    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      {/* Hero */}
      <section className="text-center mb-12 bg-gray-800 rounded-3xl py-12 px-6 shadow-lg">
        <h1 className="text-5xl md:text-6xl font-black text-indigo-400 mb-4 animate-pulse">
          Discover Delicious Recipes
        </h1>
        <p className="text-gray-300 text-lg md:text-xl mb-6">
          Explore meals from around the world, save your favorites, and get inspired!
        </p>
        <div className="max-w-md mx-auto">
          <SearchBar onSearch={fetchRecipes} />
        </div>
      </section>

      {/* Favorites */}
      {favorites.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-indigo-400 mb-4">★ Your Favorites</h2>
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

      {/* Error */}
      {error && (
        <div className="text-center text-red-500 mb-8 font-medium">{error}</div>
      )}

      {/* Search Results */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-80 bg-gray-700/60 animate-pulse rounded-3xl"
            />
          ))}
        </div>
      ) : (
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
            <div className="col-span-full text-center py-20 text-gray-400">
              No recipes found. Try searching for something else!
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
