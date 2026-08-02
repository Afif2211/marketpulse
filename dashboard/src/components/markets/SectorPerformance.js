import React from "react";
import "./SectorPerformance.css";

import { useMarketData } from "../../context/MarketDataContext";

const sectorStocks = [
  {
    sector: "Technology",
    symbols: ["AAPL", "MSFT", "NVDA"],
  },
  {
    sector: "Healthcare",
    symbols: ["JNJ", "PFE", "ABBV"],
  },
  {
    sector: "Financials",
    symbols: ["JPM", "BAC", "GS"],
  },
  {
    sector: "Energy",
    symbols: ["XOM", "CVX", "COP"],
  },
  {
    sector: "Consumer Goods",
    symbols: ["AMZN", "TSLA", "DIS"],
  },
  {
    sector: "Industrials",
    symbols: ["CAT", "HON", "GE"],
  },
];

const SectorPerformance = () => {

  const { stocks } = useMarketData();

  const stockMap = stocks.reduce((acc, stock) => {
    acc[stock.symbol] = stock.quote;
    return acc;
  }, {});

  const sectors = sectorStocks.map((sector) => {

    const changes = sector.symbols.map((symbol) => {
      return stockMap[symbol]?.dp || 0;
    });

    const average =
      changes.reduce((sum, value) => sum + value, 0) /
      changes.length;

    return {
      sector: sector.sector,
      change: average,
      positive: average >= 0,
    };

  });

  return (
    <div className="sector-card">
      <div className="sector-header">
        <div>
          <h2>Sector Performance</h2>
          <p>Performance of major market sectors today.</p>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table sector-table align-middle">
          <thead>
            <tr>
              <th>Sector</th>
              <th>Today's Change</th>
              <th>Market Sentiment</th>
            </tr>
          </thead>

          <tbody>
            {sectors.map((sector) => (
              <tr key={sector.sector}>
                <td>
                  <strong>{sector.sector}</strong>
                </td>

                <td>
                  <span
                    className={
                      sector.positive
                        ? "sector-positive"
                        : "sector-negative"
                    }
                  >
                    {sector.positive ? "+" : ""}
                    {sector.change.toFixed(2)}%
                  </span>
                </td>

                <td>
                  <span
                    className={
                      sector.positive
                        ? "sector-status bullish"
                        : "sector-status bearish"
                    }
                  >
                    {sector.positive ? "Bullish" : "Bearish"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SectorPerformance;