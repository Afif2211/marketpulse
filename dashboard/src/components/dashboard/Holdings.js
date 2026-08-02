import React from "react";
import "./Holdings.css";

import { useNavigate } from "react-router-dom";

import {
  FaApple,
  FaMicrosoft,
} from "react-icons/fa";

import {
  FaBitcoin,
  FaEthereum,
} from "react-icons/fa6";

import {
  SiNvidia,
  SiTesla,
  SiSolana,
} from "react-icons/si";

import { usePortfolio } from "../../context/PortfolioContext";

const Holdings = () => {

  const navigate = useNavigate();

  const { portfolio, loading } = usePortfolio();

  const holdings = portfolio.holdings;

  const iconMap = {
    AAPL: <FaApple />,
    NVDA: <SiNvidia />,
    TSLA: <SiTesla />,
    MSFT: <FaMicrosoft />,
    BTC: <FaBitcoin />,
    ETH: <FaEthereum />,
    SOL: <SiSolana />,
  };

  const formatCurrency = (value) => {
    return Number(value).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

    return (
    <div className="holdings-card">

      <div className="holdings-header">

        <div>

          <h2>My Holdings</h2>

          <p>Your current investment portfolio</p>

        </div>

        <button
          className="view-btn"
          onClick={() => navigate("/portfolio")}
        >
          View Portfolio
        </button>

      </div>

      <div className="table-responsive">

        <table className="table holdings-table align-middle">

          <thead>

            <tr>

              <th>Company</th>

              <th>Shares</th>

              <th>Average</th>

              <th>Current</th>

              <th>Return</th>

            </tr>

          </thead>

          <tbody>

            {loading ? (

              <tr>

                <td
                  colSpan="5"
                  className="text-center py-4"
                >
                  Loading holdings...
                </td>

              </tr>

            ) : holdings.length === 0 ? (

              <tr>

                <td
                  colSpan="5"
                  className="text-center py-4"
                >
                  No holdings found.
                </td>

              </tr>

            ) : (

              holdings.slice(0, 5).map((stock) => {

                const percentage =
                  stock.investment > 0
                    ? (
                        (stock.profitLoss /
                          stock.investment) *
                        100
                      ).toFixed(2)
                    : "0.00";

                const positive =
                  stock.profitLoss >= 0;

                return (

                  <tr key={stock._id}>

                    <td>

                      <div className="company-info">

                        <div
                          className="company-logo"
                          style={{
                            background:
                              stock.assetType === "crypto"
                                ? "#f59e0b"
                                : "#2563eb",
                          }}
                        >
                          {iconMap[stock.symbol] ||
                            stock.symbol.charAt(0)}
                        </div>

                        <div>

                          <h6>

                            {stock.companyName}

                          </h6>

                          <span>

                            {stock.symbol}

                          </span>

                        </div>

                      </div>

                    </td>

                    <td>

                      {stock.assetType === "crypto"
                        ? Number(stock.shares).toFixed(6).replace(/\.?0+$/, "")
                        : stock.shares}

                    </td>

                    <td>

                      {formatCurrency(
                        stock.averageBuyPrice
                      )}

                    </td>

                    <td>

                      {formatCurrency(
                        stock.currentPrice
                      )}

                    </td>

                    <td>

                      <span
                        className={
                          positive
                            ? "profit"
                            : "loss"
                        }
                      >

                        {positive ? "+" : ""}

                        {percentage}%

                      </span>

                    </td>

                  </tr>

                );

              })

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Holdings;