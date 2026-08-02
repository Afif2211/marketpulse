import React from "react";
import "./MarketsOverviewCards.css";

import {
  FaApple,
  FaMicrosoft,
  FaCar,
  FaMicrochip,
} from "react-icons/fa";

import { useMarketData } from "../../context/MarketDataContext";

const marketAssets = [
  {
    title: "Apple",
    symbol: "AAPL",
    icon: <FaApple />,
  },
  {
    title: "Microsoft",
    symbol: "MSFT",
    icon: <FaMicrosoft />,
  },
  {
    title: "Tesla",
    symbol: "TSLA",
    icon: <FaCar />,
  },
  {
    title: "NVIDIA",
    symbol: "NVDA",
    icon: <FaMicrochip />,
  },
];

const MarketsOverviewCards = () => {

  const { stocks, loading } = useMarketData();

  const stockMap = stocks.reduce((acc, stock) => {
    acc[stock.symbol] = stock.quote;
    return acc;
  }, {});

  return (
    <div className="markets-overview">

      {marketAssets.map((market) => {

        const quote = stockMap[market.symbol];

        return (

          <div
            className="market-card"
            key={market.symbol}
          >

            <div className="market-card-top">

              <div className="market-icon">
                {market.icon}
              </div>

              <span
                className={
                  quote?.dp >= 0
                    ? "market-change mkt-positive"
                    : "market-change mkt-negative"
                }
              >
                {quote
                  ? `${quote.dp.toFixed(2)}%`
                  : "--"}
              </span>

            </div>

            <h5>{market.title}</h5>

            <h2>
              {loading
                ? "Loading..."
                : quote
                ? `$${quote.c.toFixed(2)}`
                : "--"}
            </h2>

          </div>

        );

      })}

    </div>
  );

};

export default MarketsOverviewCards;