import React from "react";
import "./NewsHeader.css";

import { FaSearch } from "react-icons/fa";

const NewsHeader = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="news-header">

      <div className="news-header-left">

        <h1>Market News</h1>

        <p>
          Stay informed with the latest financial, business and cryptocurrency news.
        </p>

      </div>

      <div className="news-search">

        <FaSearch className="news-search-icon" />

        <input
          type="text"
          placeholder="Search news..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

      </div>

    </div>
  );
};

export default NewsHeader;