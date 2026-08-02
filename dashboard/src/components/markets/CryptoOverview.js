import React, { useEffect, useState } from "react";
import "./CryptoOverview.css";

import api from "../../services/Api";
import { usePortfolio } from "../../context/PortfolioContext";

import TradeModal from "../markets/TradeModal";

const CryptoOverview = () => {

  const { refreshPortfolio } = usePortfolio();

  const [crypto, setCrypto] = useState([]);

  const [showTradeModal, setShowTradeModal] = useState(false);

  const [tradeMode, setTradeMode] = useState("buy");

  const [selectedCoin, setSelectedCoin] = useState(null);

  useEffect(() => {
    fetchCrypto();
  }, []);

  const fetchCrypto = async () => {
    try {

      const result = await api.getCrypto();

      if (result.ok && result.data.success) {
        setCrypto(result.data.crypto);
      }

    } catch (error) {

      console.error(error);

    }
  };

  const openTradeModal = (coin, mode) => {

    setTradeMode(mode);

    setSelectedCoin({
      symbol: coin.symbol.toUpperCase(),
      companyName: coin.name,
      currentPrice: coin.current_price,
      shares: 0,
      assetType: "crypto",
      image: coin.image,
    });

    setShowTradeModal(true);

  };

  const closeTradeModal = () => {
    setShowTradeModal(false);
    setSelectedCoin(null);
  };
    return (
    <>
      <div className="crypto-card">

        <div className="crypto-header">
          <div>
            <h2>Crypto Overview</h2>
            <p>Top cryptocurrencies by market capitalization.</p>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table crypto-table align-middle">

            <thead>
              <tr>
                <th>Asset</th>
                <th>Price</th>
                <th>24h Change</th>
                <th>Market Cap</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>

              {crypto.map((coin) => {

                const currentPrice = coin.current_price ?? 0;
                const priceChange = coin.price_change_percentage_24h ?? 0;
                const marketCap = coin.market_cap ?? 0;

                return (
                  <tr key={coin.id}>

                    <td>
                      <div className="crypto-name">

                        <div className="crypto-icon">
                          <img
                            src={coin.image}
                            alt={coin.name}
                            width="30"
                            height="30"
                          />
                        </div>

                        <div>
                          <strong>{coin.name}</strong>
                          <small>{coin.symbol.toUpperCase()}</small>
                        </div>

                      </div>
                    </td>

                    <td>
                      ${currentPrice.toLocaleString()}
                    </td>

                    <td>
                      <span
                        className={
                          priceChange >= 0
                            ? "crypto-positive"
                            : "crypto-negative"
                        }
                      >
                        {priceChange >= 0 ? "+" : ""}
                        {priceChange.toFixed(2)}%
                      </span>
                    </td>

                    <td>
                      ${(marketCap / 1000000000).toFixed(2)}B
                    </td>

                    <td className="text-center">

                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={() => openTradeModal(coin, "buy")}
                      >
                        Buy
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => openTradeModal(coin, "sell")}
                      >
                        Sell
                      </button>

                    </td>

                  </tr>
                );

              })}

            </tbody>

          </table>
        </div>

      </div>

      {showTradeModal && selectedCoin && (
        <TradeModal
          show={showTradeModal}
          onClose={closeTradeModal}
          stock={selectedCoin}
          mode={tradeMode}
          onTradeSuccess={() => {
            fetchCrypto();
            refreshPortfolio();
          }}
        />
      )}

    </>
  );
};

export default CryptoOverview;