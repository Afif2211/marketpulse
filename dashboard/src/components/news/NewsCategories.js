import React from "react";
import "./NewsCategories.css";

const categories = [
  "All News",
  "Markets",
  "Stocks",
  "Crypto",
  "Economy",
  "Technology",
  "Business",
];

const NewsCategories = ({ activeCategory, setActiveCategory }) => {
  return (
    <div className="news-categories">

      {categories.map((category, index) => (

        <button
          key={index}
          className={`category-btn ${
            activeCategory === category ? "active" : ""
          }`}
          onClick={() => setActiveCategory(category)}
        >
          {category}
        </button>

      ))}

    </div>
  );
};

export default NewsCategories;