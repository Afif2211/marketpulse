import React, { useEffect, useState } from "react";
import "./Transactions.css";

import {
  FaArrowTrendUp,
  FaArrowTrendDown,
} from "react-icons/fa6";

import { useNavigate } from "react-router-dom";

import api from "../../services/Api";

const Transactions = () => {

  const navigate = useNavigate();

  const [transactions, setTransactions] = useState([]);

  const [loading, setLoading] = useState(true);

  const formatCurrency = (value) =>
    Number(value).toLocaleString("en-US", {
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
          result.data.transactions
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

    <div className="transactions-card">

      <div className="transactions-header">

        <div>

          <h2>

            Recent Transactions

          </h2>

          <p>

            Your latest portfolio activity

          </p>

        </div>

        <button
          className="view-all-btn"
          onClick={() =>
            navigate("/transactions")
          }
        >

          View All

        </button>

      </div>
            {loading ? (

        <div className="text-center py-4">

          Loading transactions...

        </div>

      ) : transactions.length === 0 ? (

        <div className="text-center py-4">

          No transactions found.

        </div>

      ) : (

        transactions
          .slice(0, 5)
          .map((item) => {

            const isBuy =
              item.type === "BUY";

            return (

              <div
                className="transaction-row"
                key={item._id}
              >

                <div className="transaction-left">

                  <div
                    className={
                      isBuy
                        ? "transaction-icon txn-buy"
                        : "transaction-icon txn-sell"
                    }
                  >

                    {isBuy ? (

                      <FaArrowTrendUp />

                    ) : (

                      <FaArrowTrendDown />

                    )}

                  </div>

                  <div className="transaction-company">

                    <h5>

                      {item.companyName}

                    </h5>

                    <span>

                      {item.symbol}

                    </span>

                  </div>

                </div>

                <div className="transaction-info">

                  <div>

                    <small>Type</small>

                    <strong>

                      {item.type}

                    </strong>

                  </div>

                  <div>

                    <small>Quantity</small>

                    <strong>

                      {item.shares} Shares

                    </strong>

                  </div>

                  <div>

                    <small>Amount</small>

                    <strong>

                      {formatCurrency(
                        item.totalAmount
                      )}

                    </strong>

                  </div>

                  <div>

                    <small>Date</small>

                    <strong>

                      {formatDate(
                        item.createdAt
                      )}

                    </strong>

                  </div>

                  <div>

                    <small>Status</small>

                    <span className="status-badge">

                      Completed

                    </span>

                  </div>

                </div>

              </div>

            );

          })

      )}

          </div>

  );

};

export default Transactions;