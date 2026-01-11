import React, { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(saved);
  }, []);

  const toggleFavorite = (meal) => {
    const updated = favorites.filter((f) => f.idMeal !== meal.idMeal);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <h1 className="text-4xl font-black text-indigo-400 mb-6 text-center">
        ★ Your Favorites
      </h1>

      {favorites.length === 0 ? (
        <p className="text-center text-gray-400 text-lg">
          You haven't added any favorites yet.
        </p>
      ) : (
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
      )}
    </div>
  );
};

export default FavoritesPage;
