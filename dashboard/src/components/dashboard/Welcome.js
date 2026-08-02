import React from "react";
import "./Welcome.css";
import { useAuth } from "../../context/AuthContext";
import { usePortfolio } from "../../context/PortfolioContext";
import { useNavigate } from "react-router-dom";

import {
    FaArrowTrendUp,
    FaArrowTrendDown,
    FaArrowRightArrowLeft,
    FaChartLine,
} from "react-icons/fa6";

const Welcome = () => {
    const { user, loading: userLoading } = useAuth();
    const { portfolio, loading: portfolioLoading } = usePortfolio();
    const navigate = useNavigate();

    const hour = new Date().getHours();

    let greeting = "Good Evening";

    if (hour >= 5 && hour < 12) {
        greeting = "Good Morning";
    } else if (hour >= 12 && hour < 17) {
        greeting = "Good Afternoon";
    }

    const isProfit = portfolio.totalProfitLoss >= 0;

    const portfolioValue = `$${portfolio.portfolioValue.toLocaleString(
        "en-US",
        {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }
    )}`;

    const walletBalance = `$${portfolio.walletBalance.toLocaleString(
        "en-US",
        {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }
    )}`;

    const totalAccountValue = `$${portfolio.totalAccountValue.toLocaleString(
        "en-US",
        {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }
    )}`;

    const profitLoss = `${isProfit ? "+" : "-"}$${Math.abs(
        portfolio.totalProfitLoss
    ).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })}`;

    const percentage = `${isProfit ? "+" : ""}${portfolio.totalProfitLossPercentage}%`;

    return (
        <div className="welcome-card">
            <div className="welcome-top">
                <div>
                    <h2>
                        👋 {greeting},{" "}
                        {userLoading ? "Investor" : user?.fullName || "Investor"}
                    </h2>

                    <p>
                        Build your investing skills with virtual funds in a safe,
                        educational environment. No real money or bank accounts
                        are used.
                    </p>
                </div>

                <div className="market-status">
                    <span className="status-dot"></span>
                    Paper Trading
                </div>
            </div>

            <div className="portfolio-summary">
                <span className="summary-label">
                    Total Account Value
                </span>

                <h1>
                    {portfolioLoading ? "Loading..." : totalAccountValue}
                </h1>

                <div
                    className="today-profit"
                    style={{
                        color: isProfit ? "#16a34a" : "#dc2626",
                    }}
                >
                    {isProfit ? (
                        <FaArrowTrendUp />
                    ) : (
                        <FaArrowTrendDown />
                    )}

                    <span>
                        {portfolioLoading
                            ? "Loading..."
                            : `${profitLoss} (${percentage})`}
                    </span>
                </div>

                <div className="account-summary">
                    <div className="account-summary-row">
                        <span>💵 Cash Available</span>

                        <strong>
                            {portfolioLoading
                                ? "Loading..."
                                : walletBalance}
                        </strong>
                    </div>

                    <div className="account-summary-row">
                        <span>📈 Invested</span>

                        <strong>
                            {portfolioLoading
                                ? "Loading..."
                                : portfolioValue}
                        </strong>
                    </div>
                </div>

                <div className="paper-trading-note">
                    🎓 Educational Project • All trades use virtual money only.
                </div>
            </div>

            <div className="welcome-actions">
                <button
                    className="primary-btn"
                    onClick={() => navigate("/markets")}
                >
                    <FaChartLine />
                    Explore Markets
                </button>

                <button
                    className="secondary-btn"
                    onClick={() => navigate("/portfolio")}
                >
                    <FaArrowRightArrowLeft />
                    View Portfolio
                </button>
            </div>
        </div>
    );
};

export default Welcome;