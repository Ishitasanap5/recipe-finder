import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import FavoritesPage from "./components/FavoritesPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-orange-50/20 font-sans">
        {/* Navigation */}
        <nav className="bg-white border-b border-orange-200 py-4 shadow-md">
          <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl">🍳</span>
              <span className="font-black text-xl text-orange-600 tracking-tight">
                ChefQuest
              </span>
            </Link>
            <div className="flex gap-4 items-center">
              <Link
                to="/favorites"
                className="text-orange-600 font-semibold hover:text-orange-800 transition-colors"
              >
                Favorites
              </Link>
            </div>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>

        {/* Footer */}
        <footer className="bg-white border-t border-orange-200 py-6 mt-12 text-center text-slate-400 text-sm">
          © 2026 ChefQuest • Built with React & Tailwind
        </footer>
      </div>
    </Router>
  );
}

export default App;
