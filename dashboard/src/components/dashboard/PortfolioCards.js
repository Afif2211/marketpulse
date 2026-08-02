import React from "react";
import "./PortfolioCards.css";

import {
  FaWallet,
  FaArrowTrendUp,
  FaCoins,
  FaChartPie,
} from "react-icons/fa6";

import { usePortfolio } from "../../context/PortfolioContext";

const PortfolioCards = () => {

  const { portfolio, loading } = usePortfolio();

  const cards = [
    {
      title: "Total Account Value",
      value: loading
        ? "Loading..."
        : `$${portfolio.totalAccountValue.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`,
      change: loading
        ? ""
        : `${portfolio.totalProfitLoss >= 0 ? "+" : "-"}$${Math.abs(
            portfolio.totalProfitLoss
          ).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })} (${portfolio.totalProfitLossPercentage >= 0 ? "+" : ""}${
            portfolio.totalProfitLossPercentage
          }%)`,
      positive: portfolio.totalProfitLoss >= 0,
      icon: <FaWallet />,
      color: "blue",
    },
    {
      title: "Total Gain / Loss",
      value: loading
        ? "Loading..."
        : `${portfolio.totalProfitLoss >= 0 ? "+" : "-"}$${Math.abs(
            portfolio.totalProfitLoss
          ).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`,
      change: loading
        ? ""
        : `${portfolio.totalProfitLossPercentage >= 0 ? "+" : ""}${
            portfolio.totalProfitLossPercentage
          }%`,
      positive: portfolio.totalProfitLoss >= 0,
      icon: <FaArrowTrendUp />,
      color: "green",
    },
    {
      title: "Available Cash",
      value: loading
        ? "Loading..."
        : `$${portfolio.walletBalance.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`,
      change: "Ready to Invest",
      positive: true,
      icon: <FaCoins />,
      color: "orange",
    },
    {
      title: "Total Holdings",
      value: loading ? "Loading..." : portfolio.holdings.length,
      change:
        portfolio.holdings.length === 1
          ? "Stock"
          : "Stocks",
      positive: true,
      icon: <FaChartPie />,
      color: "purple",
    },
  ];

  return (
    <div className="row g-4">
      {cards.map((card, index) => (
        <div className="col-xl-3 col-md-6" key={index}>
          <div className="summary-card">
            <div className={`summary-icon ${card.color}`}>
              {card.icon}
            </div>

            <div className="summary-content">
              <span>{card.title}</span>

              <h3>{card.value}</h3>

              <p className={card.positive ? "positive" : "negative"}>
                {card.change}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PortfolioCards;