import React, { useEffect, useMemo, useState } from "react";
import "./LatestNews.css";
import { FaArrowRight } from "react-icons/fa";
import api from "../../services/Api";

const LatestNews = ({ searchTerm = "", activeCategory = "All News" }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const result = await api.getNews();

      if (result.ok && result.data.success) {
        const uniqueNews = result.data.news.filter((article, index, self) => {
          return index === self.findIndex((item) => item.headline === article.headline);
        });

        setNews(uniqueNews.slice(0, 12));
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
        article.headline.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        activeCategory === "All News" ||
        (article.category || "").toLowerCase().includes(activeCategory.toLowerCase());

      return matchesSearch && matchesCategory;

    });

  }, [news, searchTerm, activeCategory]);

  return (
    <div className="latest-news">
      <div className="latest-news-header">
        <h2>Latest News</h2>
        <p>Fresh stories from global financial markets.</p>
      </div>

{loading && (
        <div className="latest-news-empty">
          <h5>Loading news...</h5>
        </div>
      )}

      {!loading && filteredNews.length === 0 && (
        <div className="latest-news-empty">
          <h5>No matching news found</h5>
          <p>Try a different search term.</p>
        </div>
      )}

      {!loading && filteredNews.length > 0 && (
        <div className="latest-news-grid">
          {filteredNews.map((article, index) => {
            const imageSrc = article.image
              ? article.image
              : "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800";

            const dateLabel = new Date(article.datetime * 1000).toLocaleDateString();

            return (
              <div className="news-card" key={index}>
                <img src={imageSrc} alt={article.headline} />

                <div className="news-card-body">
                  <span className="news-tag">{article.category}</span>

                  <h3>{article.headline}</h3>

                  <p>{article.summary}</p>

                  <small style={{ color: "#999", display: "block", marginBottom: "12px" }}>
                    {article.source} • {dateLabel}
                  </small>

                  <a href={article.url} target="_blank" rel="noreferrer" className="read-btn">
                    Read More <FaArrowRight />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LatestNews;