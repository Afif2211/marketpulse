import React, { useEffect, useState } from "react";
import "./Watchlist.css";

import { useNavigate } from "react-router-dom";

import {
  FaApple,
  FaBitcoin,
  FaEthereum,
  FaArrowTrendUp,
  FaArrowTrendDown,
} from "react-icons/fa6";

import {
  FaMicrosoft,
} from "react-icons/fa";

import {
  SiNvidia,
  SiTesla,
  SiSolana,
} from "react-icons/si";

import api from "../../services/Api";

const Watchlist = () => {

  const navigate = useNavigate();

  const [watchlist, setWatchlist] = useState([]);

  const [loading, setLoading] = useState(true);

  const iconMap = {
    AAPL: <FaApple />,
    NVDA: <SiNvidia />,
    TSLA: <SiTesla />,
    MSFT: <FaMicrosoft />,
    BTC: <FaBitcoin />,
    ETH: <FaEthereum />,
    SOL: <SiSolana />,
  };

  const colorMap = {
    AAPL: "#2563eb",
    NVDA: "#16a34a",
    TSLA: "#dc2626",
    MSFT: "#0f62fe",
    BTC: "#f59e0b",
    ETH: "#6366f1",
    SOL: "#9333ea",
  };

  const formatCurrency = (value) =>
    Number(value || 0).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const loadWatchlist = async () => {

    try {

      setLoading(true);

      const result = await api.getWatchlist();

      if (result.ok && result.data.success) {

        setWatchlist(result.data.watchlist || []);

      }

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    loadWatchlist();

  }, []);

    return (
    <div className="watchlist-card">

      <div className="watchlist-header">

        <div>

          <h2>⭐ Watchlist</h2>

          <p>Track your favourite assets</p>

        </div>

        {watchlist.length > 0 && (

          <button
            className="add-stock-btn"
            onClick={() => navigate("/watchlist")}
          >
            View Watchlist
          </button>

        )}

      </div>

      {loading ? (

        <div className="text-center py-5">

          Loading watchlist...

        </div>

      ) : watchlist.length === 0 ? (

        <div
          className="text-center py-5"
          style={{ padding: "40px 20px" }}
        >

          <h5 className="mb-2">

            Your watchlist is empty

          </h5>

          <p className="text-muted mb-4">

            Add stocks and cryptocurrencies to your watchlist
            to keep track of them.

          </p>

          <button
            className="add-stock-btn"
            onClick={() => navigate("/watchlist")}
          >

            Go to Watchlist

          </button>

        </div>

      ) : (

        watchlist.slice(0, 3).map((stock) => {

          const currentPrice = Number(
            stock.currentPrice || 0
          );

          const change = Number(
            stock.change || 0
          );

          const positive = change >= 0;

          return (

            <div
              key={stock._id}
              className="watch-stock"
            >

              <div className="watch-left">

                <div
                  className="watch-logo"
                  style={{
                    background:
                      colorMap[stock.symbol] || "#2563eb",
                  }}
                >

                  {iconMap[stock.symbol] ||
                    stock.symbol.charAt(0)}

                </div>

                <div>

                  <h5>

                    {stock.companyName}

                  </h5>

                  <span>

                    {stock.symbol}

                  </span>

                </div>

              </div>

              <div className="watch-right">

                <strong>

                  {formatCurrency(currentPrice)}

                </strong>

                <div
                  className={
                    positive
                      ? "watch-green"
                      : "watch-red"
                  }
                >

                  {positive ? (
                    <FaArrowTrendUp />
                  ) : (
                    <FaArrowTrendDown />
                  )}

                  {positive ? "+" : ""}

                  {change.toFixed(2)}%

                </div>

              </div>

            </div>

          );

        })

      )}

    </div>
  );
};

export default Watchlist;