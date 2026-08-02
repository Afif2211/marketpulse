import React from "react";
import "./MarketOverview.css";

import {
  FaArrowTrendUp,
  FaArrowTrendDown,
} from "react-icons/fa6";

import { useMarketData } from "../../context/MarketDataContext";

const MarketOverview = () => {

  const { stocks: markets, loading } = useMarketData();

  const formatPrice = (price) =>
    Number(price || 0).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return (
    <div className="market-card">

      <div className="market-header">

        <div>

          <h2>Market Overview</h2>

          <p>Global markets today</p>

        </div>

        <span className="market-live">

          ● Live

        </span>

      </div>

      {loading ? (

        <div className="text-center py-4">

          Loading market data...

        </div>

      ) : markets.length === 0 ? (

        <div
          className="text-center py-5"
          style={{ padding: "40px 20px" }}
        >

          <h5 className="mb-2">

            Market data unavailable

          </h5>

          <p className="text-muted">

            Please try again later.

          </p>

        </div>

      ) : (

        markets.map((market) => {

          const quote = market.quote || {};

          const price = Number(quote.c || 0);

          const change = Number(quote.dp || 0);

          const positive = change >= 0;

          return (

            <div
              className="market-item"
              key={market.symbol}
            >

              <div>

                <h5>

                  {market.symbol}

                </h5>

                <span>

                  {formatPrice(price)}

                </span>

              </div>

              <div
                className={
                  positive
                    ? "market-green"
                    : "market-red"
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

          );

        })

      )}

    </div>
  );
};

export default MarketOverview;