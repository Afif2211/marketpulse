import React from "react";
import "./TopMovers.css";

import { useMarketData } from "../../context/MarketDataContext";

const stockList = [
  { symbol: "AAPL", company: "Apple" },
  { symbol: "MSFT", company: "Microsoft" },
  { symbol: "NVDA", company: "NVIDIA" },
  { symbol: "META", company: "Meta" },
  { symbol: "AMZN", company: "Amazon" },
  { symbol: "TSLA", company: "Tesla" },
  { symbol: "NFLX", company: "Netflix" },
  { symbol: "AMD", company: "AMD" },
  { symbol: "INTC", company: "Intel" },
  { symbol: "GOOGL", company: "Alphabet" },
  { symbol: "DIS", company: "Disney" },
  { symbol: "ORCL", company: "Oracle" },
];

const TopMovers = () => {

  const { stocks, loading } = useMarketData();

  const marketData = stockList
    .map((stock) => {

      const data = stocks.find(
        (item) => item.symbol === stock.symbol
      );

      return {
        symbol: stock.symbol,
        company: stock.company,
        price: data?.quote?.c || 0,
        change: data?.quote?.dp || 0,
      };

    });

  const sorted = [...marketData].sort((a, b) => b.change - a.change);

  const gainers = sorted.slice(0, 4);

  const losers = [...sorted].reverse().slice(0, 4);

  return (
    <div className="top-movers">

      <div className="movers-card">

        <h2>Top Gainers</h2>

        {gainers.map((stock) => (

          <div
            className="mover-row"
            key={stock.symbol}
          >

            <div>

              <strong>{stock.symbol}</strong>

              <small>{stock.company}</small>

            </div>

            <div className="mover-right">

              <strong>
                {loading ? "Loading..." : `$${stock.price.toFixed(2)}`}
              </strong>

              <span className="gain">
                +{stock.change.toFixed(2)}%
              </span>

            </div>

          </div>

        ))}

      </div>

      <div className="movers-card">

        <h2>Top Losers</h2>

        {losers.map((stock) => (

          <div
            className="mover-row"
            key={stock.symbol}
          >

            <div>

              <strong>{stock.symbol}</strong>

              <small>{stock.company}</small>

            </div>

            <div className="mover-right">

              <strong>
                {loading ? "Loading..." : `$${stock.price.toFixed(2)}`}
              </strong>

              <span className="loss">
                {stock.change.toFixed(2)}%
              </span>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default TopMovers;