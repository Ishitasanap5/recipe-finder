import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) onSearch(text);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-6 flex gap-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Search recipes"
        className="flex-1 p-3 rounded-xl border-2 border-gray-700 focus:border-indigo-500 outline-none transition-all shadow-sm bg-gray-900 text-white"
      />
      <button
        type="submit"
        className="bg-indigo-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-600 transition-all active:scale-95 shadow-md shadow-indigo-800/50"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
