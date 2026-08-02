import React, { useEffect, useState } from "react";
import "./RecentActivity.css";

import {
  FaArrowTrendUp,
  FaArrowTrendDown,
} from "react-icons/fa6";

import { useNavigate } from "react-router-dom";

import api from "../../services/Api";

const RecentActivity = () => {

  const navigate = useNavigate();

  const [transactions, setTransactions] = useState([]);

  const [loading, setLoading] = useState(true);

  const formatCurrency = (value) =>
    Number(value || 0).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

  const formatDate = (date) =>
    new Date(date).toLocaleDateString(
      "en-GB",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );

  const loadTransactions = async () => {

    try {

      setLoading(true);

      const result =
        await api.getTransactions();

      if (
        result.ok &&
        result.data.success
      ) {

        setTransactions(
          result.data.transactions || []
        );

      }

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    loadTransactions();

  }, []);

  useEffect(() => {

    window.addEventListener("focus", loadTransactions);

    return () => {
      window.removeEventListener("focus", loadTransactions);
    };

  }, []);

    return (

    <div className="activity-card">

      <div className="activity-header">

        <div>

          <h2>

            Recent Transactions

          </h2>

          <p>

            Your latest portfolio activity

          </p>

        </div>

        <button
        
          onClick={() => navigate("/portfolio")}
        >

          View All

        </button>

      </div>

      {loading ? (

        <div className="text-center py-4">

          Loading transactions...

        </div>

      ) : transactions.length === 0 ? (

        <div
          className="text-center py-5"
          style={{ padding: "40px 20px" }}
        >

          <h5 className="mb-2">

            No transactions yet

          </h5>

          <p
            className="text-muted mb-4"
          >

            Start buying stocks or cryptocurrencies to build your portfolio.

          </p>

          <button
            onClick={() => navigate("/portfolio")}
            className="activity-empty-btn"
          >

            Go to Portfolio

          </button>

        </div>

      ) : (

        transactions
          .slice(0, 4)
          .map((item) => {

            const isBuy =
              item.type === "BUY";

            return (

              <div
                key={item._id}
                className="activity-item"
              >

                <div
                  className={`activity-icon ${
                    isBuy
                      ? "buy"
                      : "sell"
                  }`}
                >

                  {isBuy ? (

                    <FaArrowTrendUp />

                  ) : (

                    <FaArrowTrendDown />

                  )}

                </div>

                <div className="activity-info">

                  <h5>

                    {item.companyName}

                  </h5>

                  <span>

                    {item.symbol}

                  </span>

                </div>

                <div className="activity-price">

                  <strong>

                    {formatCurrency(
                      item.totalAmount
                    )}

                  </strong>

                  <span>

                    {item.shares}
                    {" "}
                    {Number(item.shares) === 1
                      ? "Share"
                      : "Shares"}

                    {" • "}

                    {formatDate(
                      item.createdAt
                    )}

                  </span>

                </div>

              </div>

            );

          })

      )}

    </div>

  );

};

export default RecentActivity;