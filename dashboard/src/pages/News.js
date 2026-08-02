import React, { useState } from "react";
import "./News.css";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

import NewsHeader from "../components/news/NewsHeader";
import FeaturedNews from "../components/news/FeaturedNews";
import NewsCategories from "../components/news/NewsCategories";
import TrendingNews from "../components/news/TrendingNews";
import LatestNews from "../components/news/LatestNews";

const News = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const [activeCategory, setActiveCategory] = useState("All News");

  return (
    <div className="dashboard">
      <Navbar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="dashboard-content">
        <div className="news-page">

          <NewsHeader
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />

          <FeaturedNews />

          <NewsCategories
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />

          <TrendingNews
            searchTerm={searchTerm}
            activeCategory={activeCategory}
          />

          <LatestNews
            searchTerm={searchTerm}
            activeCategory={activeCategory}
          />

        </div>
      </div>
    </div>
  );
};

export default News;