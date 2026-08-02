import React, { useEffect, useState } from "react";
import "./News.css";
import api from "../../services/Api";

import {
  FaArrowRight,
  FaBolt,
} from "react-icons/fa6";

const News = () => {

  const [news, setNews] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchNews();

  }, []);

  const fetchNews = async () => {

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

        setNews(uniqueNews.slice(0, 3));

      }

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  const formatTime = (timestamp) => {

    const diff =
      Date.now() - timestamp * 1000;

    const minutes = Math.floor(
      diff / 60000
    );

    if (minutes < 60)
      return `${minutes} mins ago`;

    const hours = Math.floor(
      minutes / 60
    );

    if (hours < 24)
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;

    const days = Math.floor(
      hours / 24
    );

    return `${days} day${days > 1 ? "s" : ""} ago`;

  };

    return (
    <div className="news-card">

      <div className="news-header">

        <div>

          <h2>📰 Market News</h2>

          <p>Latest financial headlines</p>

        </div>

        <button className="news-btn">

          <FaBolt />

          Live

        </button>

      </div>

      {loading ? (

        <div className="text-center py-5">

          Loading latest news...

        </div>

      ) : news.length === 0 ? (

        <div
          className="text-center py-5"
          style={{ padding: "40px 20px" }}
        >

          <h5 className="mb-2">

            No news available

          </h5>

          <p className="text-muted">

            Please check again later.

          </p>

        </div>

      ) : (

        news.map((item, index) => (

          <div
            className="news-item"
            key={index}
          >

            <div className="news-top">

              <span className="news-source">

                {item.source}

              </span>

              <span className="news-category">

                {item.category}

              </span>

            </div>

            <h4>

              {item.headline}

            </h4>

            <div className="news-footer">

              <span>

                {formatTime(item.datetime)}

              </span>

              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
              >

                Read More

                <FaArrowRight />

              </a>

            </div>

          </div>

        ))

      )}

    </div>
  );
};

export default News;