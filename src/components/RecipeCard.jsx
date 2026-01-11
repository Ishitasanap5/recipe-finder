import React, { useState } from "react";

const RecipeCard = ({ meal, onFavorite, isFavorite: initialFavorite }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [isFavorite, setIsFavorite] = useState(initialFavorite || false);

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ing && ing.trim() !== "") ingredients.push(`${ing} - ${measure}`);
  }

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    if (onFavorite) onFavorite(meal);
  };

  return (
    <>
      <div className="bg-gray-800 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-transform transform hover:-translate-y-1 group border border-gray-700">
        <div className="relative overflow-hidden">
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-4 right-4 bg-gradient to-r from-amber-400 to-amber-500 px-3 py-1 rounded-full text-xs font-bold text-white shadow-md">
            {meal.strCategory}
          </div>
        </div>

        <div className="p-5 flex flex-col gap-3">
          <h3 className="text-lg font-extrabold text-white truncate">{meal.strMeal}</h3>
          <p className="text-gray-300 text-sm italic">{meal.strArea} Cuisine</p>

          <div className="flex gap-2">
            {meal.strYoutube && (
              <a
                href={meal.strYoutube}
                target="_blank"
                rel="noreferrer"
                className="flex-1 text-center bg-gradient to-r from-indigo-500 to-indigo-600 text-white py-2 rounded-xl text-sm font-semibold hover:from-indigo-600 hover:to-indigo-700 transition-all shadow-md"
              >
                YouTube
              </a>
            )}

            <button
              onClick={() => setShowDetails(true)}
              className="flex-1 bg-gradient to-r from-gray-700 to-gray-600 text-white py-2 rounded-xl text-sm font-medium hover:from-gray-600 hover:to-gray-500 transition-all shadow"
            >
              Details
            </button>
          </div>

          {/* Favorite */}
          <button
            onClick={handleFavorite}
            className={`mt-2 self-start px-4 py-1 rounded-full font-semibold transition-all shadow-md ${
              isFavorite
                ? "bg-amber-400 text-white hover:bg-amber-500"
                : "bg-gray-900 text-amber-400 border border-amber-400 hover:bg-gray-700"
            }`}
          >
            {isFavorite ? "★ Favorited" : "☆ Add to Favorites"}
          </button>
        </div>
      </div>

      {/* Modal */}
      {showDetails && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setShowDetails(false)}
          />
          <div className="relative bg-gray-800 rounded-3xl p-6 max-w-xl w-full shadow-2xl overflow-y-auto max-h-[90vh] transform transition-all duration-300 scale-95">
            <button
              onClick={() => setShowDetails(false)}
              className="absolute top-4 right-4 text-red-500 font-bold text-2xl hover:text-red-700 transition-all"
            >
              ×
            </button>

            <h2 className="text-3xl font-bold mb-4 text-center text-indigo-400">{meal.strMeal}</h2>
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="w-full h-64 object-cover rounded-2xl mb-4 shadow-lg"
            />

            <h3 className="font-semibold text-amber-400 mb-2">Ingredients:</h3>
            <ul className="list-disc list-inside mb-4 text-gray-300">
              {ingredients.map((ing, i) => (
                <li key={i}>{ing}</li>
              ))}
            </ul>

            <h3 className="font-semibold text-amber-400 mb-2">Instructions:</h3>
            <p className="text-gray-300 whitespace-pre-line">{meal.strInstructions}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default RecipeCard;
