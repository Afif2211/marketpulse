import React, { useEffect, useMemo, useState } from "react";
import "./TradeModal.css";
import api from "../../services/Api";

const TradeModal = ({
  show,
  mode = "buy",
  stock = null,
  onClose,
  onTradeSuccess,
}) => {
  const [shares, setShares] = useState("");
  const [walletBalance, setWalletBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!show) return;

    setShares("");
    setError("");
    setSuccess("");

    fetchWallet();
  }, [show]);

  const fetchWallet = async () => {
    try {
      const result = await api.getWallet();

      if (result.ok && result.data.success) {
        setWalletBalance(result.data.walletBalance);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const currentPrice = useMemo(() => {
    return Number(stock?.currentPrice || 0);
  }, [stock]);

  const ownedShares = useMemo(() => {
    return Number(stock?.shares || 0);
  }, [stock]);

  const assetType = useMemo(() => {
    return stock?.assetType || "stock";
  }, [stock]);

  const total = useMemo(() => {
    return currentPrice * Number(shares || 0);
  }, [shares, currentPrice]);

  const formatCurrency = (value) => {
    return Number(value).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const validate = () => {
    if (Number(shares) <= 0) {
      setError("Please enter a valid quantity.");
      return false;
    }

    if (mode === "buy" && total > walletBalance) {
      setError("Insufficient wallet balance.");
      return false;
    }

    if (mode === "sell" && Number(shares) > ownedShares) {
      setError("You cannot sell more shares than you own.");
      return false;
    }

    return true;
  };
    const handleTrade = async () => {
    setError("");
    setSuccess("");

    if (!validate()) {
      return;
    }

    try {
      setLoading(true);

      let result;

      if (mode === "buy") {
        result = await api.buyStock(
          stock.symbol,
          Number(shares),
          assetType
        );
      } else {
        result = await api.sellStock(
          stock.symbol,
          Number(shares),
          assetType
        );
      }

      if (!result.ok) {
        throw new Error(
          result.data.message || "Trade failed."
        );
      }

      setSuccess(result.data.message);

      await fetchWallet();

      if (onTradeSuccess) {
        onTradeSuccess();
      }

      setTimeout(() => {
        onClose();
      }, 1000);

    } catch (err) {

      setError(err.message);

    } finally {

      setLoading(false);

    }
  };

  if (!show || !stock) {
    return null;
  }

  return (
    <>
      <div
        className="modal fade show"
        style={{ display: "block" }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content trade-modal">

            <div className="modal-header">

              <div>

                <h4>
                  {mode === "buy"
                    ? assetType === "crypto"
                      ? "Buy Crypto"
                      : "Buy Shares"
                    : assetType === "crypto"
                    ? "Sell Crypto"
                    : "Sell Shares"}
                </h4>

                <p className="trade-company">
                  {stock.companyName}
                </p>

                <small>{stock.symbol}</small>

              </div>

              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              />

            </div>

            <div className="modal-body">

              <div className="trade-info">

                <div className="trade-row">

                  <span>Current Price</span>

                  <strong>
                    {formatCurrency(currentPrice)}
                  </strong>

                </div>

                <div className="trade-row">

                  <span>Wallet Balance</span>

                  <strong>
                    {formatCurrency(walletBalance)}
                  </strong>

                </div>

                {mode === "sell" && (

                  <div className="trade-row">

                    <span>
                      {assetType === "crypto"
                        ? "Owned Quantity"
                        : "Owned Shares"}
                    </span>

                    <strong>{ownedShares}</strong>

                  </div>

                )}

              </div>
                            <div className="mt-4">

                <label className="form-label">

                  {assetType === "crypto"
                    ? "Quantity"
                    : "Shares"}

                </label>

                <input
                  type="number"
                  min={assetType === "crypto" ? "0.000001" : "1"}
                  step={assetType === "crypto" ? "any" : "1"}
                  placeholder={
                    assetType === "crypto"
                      ? "e.g. 0.01"
                      : "e.g. 1"
                  }
                  className="form-control"
                  value={shares}
                  onChange={(e) =>
                    setShares(e.target.value)
                  }
                />

              </div>

              <div className="trade-total">

                <span>
                  {mode === "buy"
                    ? "Estimated Cost"
                    : "Estimated Proceeds"}
                </span>

                <h3>
                  {formatCurrency(total)}
                </h3>

              </div>

              {error && (

                <div className="alert alert-danger mt-3">

                  {error}

                </div>

              )}

              {success && (

                <div className="alert alert-success mt-3">

                  {success}

                </div>

              )}

            </div>

            <div className="modal-footer">

              <button
                className="btn btn-outline-secondary"
                onClick={onClose}
                disabled={loading}
              >

                Cancel

              </button>

              <button
                className={
                  mode === "buy"
                    ? "btn btn-success"
                    : "btn btn-danger"
                }
                onClick={handleTrade}
                disabled={loading}
              >

                {loading
                  ? "Processing..."
                  : mode === "buy"
                  ? assetType === "crypto"
                    ? "Buy Crypto"
                    : "Buy Shares"
                  : assetType === "crypto"
                  ? "Sell Crypto"
                  : "Sell Shares"}

              </button>

            </div>

          </div>
        </div>
      </div>

      <div
        className="modal-backdrop fade show"
        onClick={onClose}
      ></div>
    </>
  );
};

export default TradeModal;