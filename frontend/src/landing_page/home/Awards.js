import React from "react";
import "./Awards.css";

import {
  FaChartLine,
  FaWallet,
  FaBrain,
  FaShieldAlt,
} from "react-icons/fa";

const features = [
  {
    icon: <FaChartLine />,
    title: "Real-Time Market Data",
    description: "Live prices, charts, and market updates for stocks and crypto, updated as the market moves.",
  },
  {
    icon: <FaWallet />,
    title: "Portfolio Management",
    description: "Track every position, your average cost, and your returns in one clean, organized view.",
  },
  {
    icon: <FaBrain />,
    title: "AI-Powered Insights",
    description: "Smart recommendations and analysis to help you understand what's moving and why.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Secure & Reliable",
    description: "Bank-grade security practices protect your account and data at every step.",
  },
];

function Awards() {
  return (
    <section className="features-section">
      <div className="container">

        <div className="features-header">

          <span className="features-eyebrow">Why MarketPulse</span>

          <h2 className="features-title">
            Everything you need to invest with confidence
          </h2>

          <p className="features-subtitle">
            Built from the ground up for investors who want a clear,
            modern way to learn markets and manage a portfolio.
          </p>

        </div>

        <div className="features-grid">

          {features.map((feature, index) => (

            <div className="feature-card" key={index}>

              <div className="feature-icon">
                {feature.icon}
              </div>

              <h3 className="feature-title">
                {feature.title}
              </h3>

              <p className="feature-description">
                {feature.description}
              </p>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default Awards;