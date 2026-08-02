import React, { useState } from "react";
import "./HoldingsTable.css";

import {
  FaApple,
  FaMicrosoft,
} from "react-icons/fa";

import {
  SiNvidia,
  SiTesla,
} from "react-icons/si";

import { usePortfolio } from "../../context/PortfolioContext";
import TradeModal from "../markets/TradeModal";

const HoldingsTable = () => {

  const { portfolio, loading, refreshPortfolio } = usePortfolio();

  const holdings = portfolio.holdings;

  const [showTradeModal, setShowTradeModal] = useState(false);

  const [tradeMode, setTradeMode] = useState("buy");

  const [selectedStock, setSelectedStock] = useState(null);

  const iconMap = {
    AAPL: <FaApple />,
    NVDA: <SiNvidia />,
    TSLA: <SiTesla />,
    MSFT: <FaMicrosoft />,
  };

  const formatCurrency = (value) =>
    Number(value).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const openTradeModal = (stock, mode) => {
    setSelectedStock(stock);
    setTradeMode(mode);
    setShowTradeModal(true);
  };

  const closeTradeModal = () => {
    setShowTradeModal(false);
    setSelectedStock(null);
  };

  return (
    <>
      <div className="pf-holdings-card">

        <div className="pf-holdings-header">

          <div>

            <h2>Holdings</h2>

            <p>Your current investments</p>

          </div>

        </div>

        <div className="table-responsive">

          <table className="table pf-holdings-table align-middle">

            <thead>

              <tr>

                <th>Company</th>
                <th>Quantity</th>
                <th>Avg Price</th>
                <th>Current</th>
                <th>Value</th>
                <th>P/L</th>
                <th>Action</th>

              </tr>

            </thead>

            <tbody>              {loading ? (

                <tr>

                  <td
                    colSpan="7"
                    className="text-center py-4"
                  >

                    Loading holdings...

                  </td>

                </tr>

              ) : holdings.length === 0 ? (

                <tr>

                  <td
                    colSpan="7"
                    className="text-center py-4"
                  >

                    No holdings found.

                  </td>

                </tr>

              ) : (

                holdings.map((stock) => {

                  const isProfit =
                    stock.profitLoss >= 0;

                  const percentage =
                    stock.investment > 0
                      ? (
                          (stock.profitLoss /
                            stock.investment) *
                          100
                        ).toFixed(2)
                      : 0;

                  return (

                    <tr key={stock._id}>

                      <td>

                        <div className="pf-company-cell">

                          <div className="pf-company-icon">

                            {iconMap[stock.symbol] || stock.symbol.charAt(0)}

                          </div>

                          <div>

                            <strong>

                              {stock.companyName}

                            </strong>

                            <small>

                              {stock.symbol}

                            </small>

                          </div>

                        </div>

                      </td>

                      <td>

                        {stock.shares}

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

                        {formatCurrency(
                          stock.currentValue
                        )}

                      </td>

                      <td>

                        <span
                          className={
                            isProfit
                              ? "pf-profit-badge"
                              : "pf-loss-badge"
                          }
                        >

                          {isProfit ? "+" : ""}

                          {percentage}%

                        </span>

                      </td>

                      <td>

                        <button
                          className="pf-buy-btn"
                          onClick={() =>
                            openTradeModal(
                              stock,
                              "buy"
                            )
                          }
                        >

                          Buy

                        </button>

                        <button
                          className="pf-sell-btn"
                          onClick={() =>
                            openTradeModal(
                              stock,
                              "sell"
                            )
                          }
                        >

                          Sell

                        </button>

                      </td>

                    </tr>

                  );
                })

              )}

            </tbody>

          </table>

        </div>

      </div>
            <TradeModal
        show={showTradeModal}
        mode={tradeMode}
        stock={selectedStock}
        onClose={closeTradeModal}
        onTradeSuccess={refreshPortfolio}
      />

    </>

  );
};

export default HoldingsTable;