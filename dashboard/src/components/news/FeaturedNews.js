import React, { useEffect, useState } from "react";
import "./FeaturedNews.css";

import { FaArrowRight } from "react-icons/fa";

import api from "../../services/Api";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1600";

const FeaturedNews = () => {

  const [article, setArticle] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    loadFeaturedNews();

  }, []);

  const loadFeaturedNews = async () => {

    try {

      const result = await api.getNews();

      if (result.ok && result.data.success && result.data.news.length > 0) {

        setArticle(result.data.news[0]);

      }

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (

      <div className="featured-news">

        <div className="featured-overlay">

          <h2>

            Loading featured story...

          </h2>

        </div>

      </div>

    );

  }

  if (!article) {

    return (

      <div className="featured-news">

        <div className="featured-overlay">

          <h2>

            No featured story available

          </h2>

          <p>

            Please check back later for the latest financial news.

          </p>

        </div>

      </div>

    );

  }

  return (

    <div
      className="featured-news"
      style={{
        backgroundImage: `linear-gradient(
          rgba(12,18,31,.65),
          rgba(12,18,31,.65)
        ), url(${article.image || FALLBACK_IMAGE})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >

      <div className="featured-overlay">

        <span className="featured-badge">

          {article.category || "Featured Story"}

        </span>

        <h2>

          {article.headline}

        </h2>

        <p>

          {article.summary}

        </p>

        <button
          className="featured-btn"
          onClick={() =>
            window.open(
              article.url,
              "_blank"
            )
          }
        >

          Read Full Story

          <FaArrowRight />

        </button>

      </div>

    </div>

  );

};

export default FeaturedNews;