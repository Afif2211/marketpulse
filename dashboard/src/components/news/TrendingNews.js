import React, { useEffect, useMemo, useState } from "react";
import "./TrendingNews.css";

import api from "../../services/Api";

const TrendingNews = ({ searchTerm = "", activeCategory = "All News" }) => {

  const [news, setNews] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    loadTrendingNews();

  }, []);

  const loadTrendingNews = async () => {

    try {

      const result = await api.getNews();

      if (result.ok && result.data.success) {

        const uniqueNews = result.data.news.filter(
          (article, index, self) =>
            index ===
            self.findIndex(
              (item) =>
                item.headline === article.headline
            )
        );

        setNews(uniqueNews.slice(0, 10));

      }

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  const filteredNews = useMemo(() => {

    return news.filter((article) => {

      const matchesSearch =
        !searchTerm.trim() ||
        article.headline
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesCategory =
        activeCategory === "All News" ||
        (article.category || "")
          .toLowerCase()
          .includes(activeCategory.toLowerCase());

      return matchesSearch && matchesCategory;

    });

  }, [news, searchTerm, activeCategory]);

  const formatTime = (timestamp) => {

    const diff =
      Date.now() - timestamp * 1000;

    const minutes = Math.floor(diff / 60000);

    if (minutes < 60) {

      return `${minutes} min ago`;

    }

    const hours = Math.floor(minutes / 60);

    if (hours < 24) {

      return `${hours} hour${hours > 1 ? "s" : ""} ago`;

    }

    const days = Math.floor(hours / 24);

    return `${days} day${days > 1 ? "s" : ""} ago`;

  };

  const formatCategory = (category) => {

    if (!category || category === "general") {

      return "Top News";

    }

    return category
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) =>
        char.toUpperCase()
      );

  };
    return (

    <div className="trending-news-card">

      <div className="trending-news-header">

        <h2>

          🔥 Trending News

        </h2>

        <p>

          Latest financial headlines

        </p>

      </div>

      {loading ? (

        <div className="text-center py-5">

          Loading news...

        </div>

      ) : filteredNews.length === 0 ? (

        <div
          className="text-center py-5"
          style={{ padding: "40px 20px" }}
        >

          <h5>

            {news.length === 0
              ? "No news available"
              : "No matching news found"}

          </h5>

          <p className="text-muted">

            {news.length === 0
              ? "Please check back later for the latest market updates."
              : "Try a different search term."}

          </p>

        </div>

      ) : (

        <div className="trending-news-list">

          {filteredNews.map((article, index) => (

            <div
              key={index}
              className="trending-news-item"
              onClick={() =>
                window.open(
                  article.url,
                  "_blank"
                )
              }
              style={{
                cursor: "pointer",
              }}
            >

              <div className="trending-news-number">

                {index + 1}

              </div>

              <div className="trending-news-content">

                <h5>

                  {article.headline}

                </h5>

                <div className="trending-news-meta">

                  <span className="trend-news-category">

                    {formatCategory(
                      article.category
                    )}

                  </span>

                  <span className="trend-news-time">

                    {formatTime(
                      article.datetime
                    )}

                  </span>

                  <span className="trend-news-source">

                    {article.source}

                  </span>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  );

};

export default TrendingNews;