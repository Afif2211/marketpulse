import React from "react";
import "./LeftSection.css";
import { Link } from "react-router-dom";

import {
  FaBolt,
  FaChartLine,
  FaChartBar,
  FaGlobe,
} from "react-icons/fa";

const features = [
  {
    icon: <FaBolt />,
    title: "Real-time Updates",
    description: "Live market prices, refreshed continuously.",
  },
  {
    icon: <FaChartLine />,
    title: "Smart Charts",
    description: "Interactive charts for technical analysis.",
  },
  {
    icon: <FaChartBar />,
    title: "Analytics",
    description: "Portfolio and market insights, clearly presented.",
  },
  {
    icon: <FaGlobe />,
    title: "Stocks & Crypto",
    description: "Track equities and cryptocurrencies side by side.",
  },
];

const tickers = [
  { symbol: "AAPL", price: "$189.40", change: "+1.8%", positive: true },
  { symbol: "BTC", price: "$66,245", change: "-0.3%", positive: false },
  { symbol: "NVDA", price: "$942.10", change: "+3.4%", positive: true },
];

const LeftSection = () => {
  return (
    <section className="market-data-section">
      <div className="container">

        <div className="row align-items-center gy-5">

          <div className="col-lg-5 market-data-image-col">

            <div className="market-data-mockup">

              <div className="market-data-mockup-header">
                <span className="market-data-mockup-dot"></span>
                <span className="market-data-mockup-dot"></span>
                <span className="market-data-mockup-dot"></span>
              </div>

              <div className="market-data-mockup-body">

                <p className="market-data-mockup-label">Market Overview</p>

                <div className="market-data-mockup-chart">
                  <svg viewBox="0 0 300 100" preserveAspectRatio="none">
                    <polyline
                      points="0,60 40,65 80,45 120,50 160,25 200,35 240,15 300,20"
                      fill="none"
                      stroke="url(#marketGradient)"
                      strokeWidth="3"
                    />
                    <defs>
                      <linearGradient id="marketGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#4338CA" />
                        <stop offset="100%" stopColor="#3B82F6" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                <div className="market-data-mockup-list">

                  {tickers.map((ticker, index) => (

                    <div className="market-data-mockup-row" key={index}>

                      <span className="market-data-mockup-symbol">{ticker.symbol}</span>
                      <span className="market-data-mockup-price">{ticker.price}</span>
                      <span className={ticker.positive ? "market-data-mockup-up" : "market-data-mockup-down"}>
                        {ticker.change}
                      </span>

                    </div>

                  ))}

                </div>

              </div>

            </div>

          </div>

          <div className="col-lg-6 ms-lg-auto market-data-content">

            <span className="market-data-eyebrow">
              Live Market Data
            </span>

            <h2 className="market-data-title">
              Stay ahead with
              {" "}
              <span className="market-data-highlight">real-time markets</span>
            </h2>

            <p className="market-data-subtitle">
              Track live stock and cryptocurrency prices with fast,
              reliable updates. Built for investors who want speed,
              accuracy and simplicity in one platform.
            </p>

            <div className="market-data-grid">

              {features.map((feature, index) => (

                <div className="market-data-feature" key={index}>

                  <div className="market-data-feature-icon">
                    {feature.icon}
                  </div>

                  <div>
                    <h6>{feature.title}</h6>
                    <small>{feature.description}</small>
                  </div>

                </div>

              ))}

            </div>

            <Link to="/signup" className="market-data-cta">
              Explore Markets →
            </Link>

          </div>

        </div>

      </div>
    </section>
  );
};

export default LeftSection;