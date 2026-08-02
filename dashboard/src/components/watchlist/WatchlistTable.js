import React, { useEffect, useState } from "react";
import "./WatchlistTable.css";

import api from "../../services/Api";

import {
  FaApple,
  FaMicrosoft,
  FaAmazon,
} from "react-icons/fa";

import {
  SiNvidia,
  SiTesla,
} from "react-icons/si";

const iconMap = {
  AAPL: <FaApple />,
  NVDA: <SiNvidia />,
  TSLA: <SiTesla />,
  MSFT: <FaMicrosoft />,
  AMZN: <FaAmazon />,
};

const WatchlistTable = ({ refreshTrigger }) => {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWatchlist = async () => {
    try {
      setLoading(true);

      const response = await api.getWatchlist();

      if (response.ok) {
        setWatchlist(response.data.watchlist);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWatchlist();
  }, [refreshTrigger]);

  const handleRemove = async (id) => {
    try {
      const response = await api.removeFromWatchlist(id);

      if (response.ok) {
        setWatchlist((prev) =>
          prev.filter((stock) => stock._id !== id)
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="watchlist-table-card">
        <div className="watchlist-table-header">
          <div>
            <h2>My Watchlist</h2>
            <p>Monitor your favourite assets</p>
          </div>
        </div>

        <p style={{ padding: "20px" }}>Loading...</p>
      </div>
    );
  }

  return (
    <div className="watchlist-table-card">
      <div className="watchlist-table-header">
        <div>
          <h2>My Watchlist</h2>
          <p>Monitor your favourite assets</p>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table watchlist-table align-middle">
          <thead>
            <tr>
              <th>Company</th>
              <th>Price</th>
              <th>Daily Change</th>
              <th>Symbol</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {watchlist.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  style={{
                    textAlign: "center",
                    padding: "30px",
                  }}
                >
                  <strong>Your watchlist is empty.</strong>
                  <br />
                  <small>
                    Search for a stock and add it to start tracking your
                    favourite companies.
                  </small>
                </td>
              </tr>
            ) : (
              watchlist.map((stock) => (
                <tr key={stock._id}>
                  <td>
                    <div className="watch-company">
                      <div className="watch-icon">
                        {iconMap[stock.symbol] ||
                          stock.symbol.charAt(0)}
                      </div>

                      <div>
                        <strong>{stock.companyName}</strong>
                        <small>{stock.symbol}</small>
                      </div>
                    </div>
                  </td>

                  <td>
                    ${stock.currentPrice?.toFixed(2)}
                  </td>

                  <td>
                    <span
                      className={
                        stock.change >= 0
                          ? "positive-change"
                          : "negative-change"
                      }
                    >
                      {stock.change >= 0 ? "+" : ""}
                      {stock.change?.toFixed(2)}%
                    </span>
                  </td>

                  <td>{stock.symbol}</td>

                  <td>
                    <button
                      className="remove-stock-btn"
                      onClick={() => handleRemove(stock._id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WatchlistTable;