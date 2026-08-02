import React from "react";
import "./PortfolioSummary.css";

// import { FaDownload } from "react-icons/fa";

import { usePortfolio } from "../../context/PortfolioContext";

const PortfolioSummary = () => {

  const { portfolio, loading } = usePortfolio();

  const isProfit = portfolio.totalProfitLoss >= 0;

  const formatCurrency = (value) =>
    `$${Number(value).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  return (
    <div className="portfolio-overview">
      <div className="portfolio-overview-header">
        <div>
          <h2>Portfolio Overview</h2>

          <p>Summary of your investments</p>
        </div>

        {/* <button className="export-btn">
          <FaDownload />
          Export
        </button> */}
      </div>

      <div className="portfolio-stats">
        <div className="portfolio-stat">
          <span>Total Account Value</span>

          <h3>
            {loading
              ? "Loading..."
              : formatCurrency(portfolio.totalAccountValue)}
          </h3>
        </div>

        <div className="portfolio-stat">
          <span>Total Profit / Loss</span>

          <div className={isProfit ? "gain-badge" : "loss-badge"}>
            {loading
              ? "Loading..."
              : `${isProfit ? "+" : "-"}${formatCurrency(
                  Math.abs(portfolio.totalProfitLoss)
                )}`}
          </div>
        </div>

        <div className="portfolio-stat">
          <span>Total Return</span>

          <div className={isProfit ? "gain-badge" : "loss-badge"}>
            {loading
              ? "Loading..."
              : `${isProfit ? "+" : ""}${portfolio.totalProfitLossPercentage}%`}
          </div>
        </div>

        <div className="portfolio-stat">
          <span>Available Cash</span>

          <h3>
            {loading
              ? "Loading..."
              : formatCurrency(portfolio.walletBalance)}
          </h3>
        </div>
      </div>

      <div className="portfolio-footer">
        Last Updated: {loading ? "Loading..." : new Date().toLocaleTimeString()}
      </div>
    </div>
  );
};

export default PortfolioSummary;