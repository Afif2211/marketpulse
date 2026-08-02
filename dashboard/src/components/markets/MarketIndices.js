import React, { useState } from "react";
import "./MarketIndices.css";

import { useMarketData } from "../../context/MarketDataContext";
import { usePortfolio } from "../../context/PortfolioContext";

import TradeModal from "./TradeModal";

const stocks = [
  { name: "Apple", symbol: "AAPL" },
  { name: "Microsoft", symbol: "MSFT" },
  { name: "NVIDIA", symbol: "NVDA" },
  { name: "Amazon", symbol: "AMZN" },
  { name: "Tesla", symbol: "TSLA" },
  { name: "Meta", symbol: "META" },
];

const MarketIndices = () => {

  const { stocks: marketStocks, loading } = useMarketData();

  const { refreshPortfolio } = usePortfolio();

  const [showTradeModal, setShowTradeModal] = useState(false);

  const [selectedStock, setSelectedStock] = useState(null);

  const stockMap = marketStocks.reduce((acc, stock) => {
    acc[stock.symbol] = stock.quote;
    return acc;
  }, {});

  const openTradeModal = (stock) => {

    const quote = stockMap[stock.symbol];

    setSelectedStock({
      companyName: stock.name,
      symbol: stock.symbol,
      currentPrice: quote?.c || 0,
    });

    setShowTradeModal(true);
  };

  const closeTradeModal = () => {
    setShowTradeModal(false);
    setSelectedStock(null);
  };

  return (
    <>
      <div className="indices-card">

        <div className="indices-header">

          <div>

            <h2>Market Watch</h2>

            <p>Live prices of the world's most traded stocks.</p>

          </div>

        </div>

        <div className="table-responsive">

          <table className="table indices-table align-middle">

            <thead>

              <tr>

                <th>Company</th>
                <th>Symbol</th>
                <th>Current Price</th>
                <th>Daily Change</th>
                <th>Status</th>
                <th>Action</th>

              </tr>

            </thead>

            <tbody>
                          {stocks.map((stock) => {

              const quote = stockMap[stock.symbol];

              const price = quote?.c || 0;
              const change = quote?.dp || 0;
              const positive = change >= 0;

              return (

                <tr key={stock.symbol}>

                  <td>

                    <strong>{stock.name}</strong>

                  </td>

                  <td>

                    {stock.symbol}

                  </td>

                  <td>

                    {loading
                      ? "Loading..."
                      : `$${price.toFixed(2)}`}

                  </td>

                  <td>

                    <span
                      className={
                        positive
                          ? "idx-positive-change"
                          : "idx-negative-change"
                      }
                    >

                      {positive ? "+" : ""}

                      {change.toFixed(2)}%

                    </span>

                  </td>

                  <td>

                    <span
                      className={
                        positive
                          ? "idx-status-badge idx-open"
                          : "idx-status-badge idx-closed"
                      }
                    >

                      {positive
                        ? "Bullish"
                        : "Bearish"}

                    </span>

                  </td>

                  <td>

                    <button
                      className="idx-buy-btn"
                      onClick={() =>
                        openTradeModal(stock)
                      }
                    >

                      Buy

                    </button>

                  </td>

                </tr>

              );

            })}

          </tbody>

        </table>

      </div>

    </div>
          <TradeModal
        show={showTradeModal}
        mode="buy"
        stock={selectedStock}
        onClose={closeTradeModal}
        onTradeSuccess={() => {
          refreshPortfolio();
          closeTradeModal();
        }}
      />

    </>

  );
};

export default MarketIndices;