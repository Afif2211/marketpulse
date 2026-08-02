import React from "react";
import "./RightSection.css";
import { Link } from "react-router-dom";

import {
  FaWallet,
  FaChartPie,
  FaHistory,
  FaShieldAlt,
} from "react-icons/fa";

const features = [
  {
    icon: <FaWallet />,
    title: "Portfolio",
    description: "Track every holding in one place.",
  },
  {
    icon: <FaChartPie />,
    title: "Allocation",
    description: "See how your assets are distributed.",
  },
  {
    icon: <FaHistory />,
    title: "Transaction History",
    description: "Every buy and sell, fully logged.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Secure",
    description: "Bank-grade protection for your account.",
  },
];

const allocation = [
  { label: "Stocks", percent: 65, color: "#4338CA" },
  { label: "Crypto", percent: 25, color: "#3B82F6" },
  { label: "Cash", percent: 10, color: "#93C5FD" },
];

const RightSection = () => {
  return (
    <section className="portfolio-section">
      <div className="container">

        <div className="row align-items-center gy-5">

          <div className="col-lg-6 portfolio-section-content">

            <span className="portfolio-section-eyebrow">
              Portfolio Management
            </span>

            <h2 className="portfolio-section-title">
              Manage your investments
              {" "}
              <span className="portfolio-section-highlight">with confidence</span>
            </h2>

            <p className="portfolio-section-subtitle">
              Build a diversified portfolio, monitor gains and losses,
              analyze allocation, and keep track of every investment
              from one secure dashboard.
            </p>

            <div className="portfolio-section-grid">

              {features.map((feature, index) => (

                <div className="portfolio-section-feature" key={index}>

                  <div className="portfolio-section-feature-icon">
                    {feature.icon}
                  </div>

                  <div>
                    <h6>{feature.title}</h6>
                    <small>{feature.description}</small>
                  </div>

                </div>

              ))}

            </div>

            <Link to="/signup" className="portfolio-section-cta">
              View Portfolio →
            </Link>

          </div>

          <div className="col-lg-5 ms-lg-auto portfolio-section-image-col">

            <div className="portfolio-mockup">

              <p className="portfolio-mockup-label">Asset Allocation</p>

              <div className="portfolio-mockup-bar">

                {allocation.map((item, index) => (

                  <div
                    key={index}
                    className="portfolio-mockup-segment"
                    style={{
                      width: `${item.percent}%`,
                      background: item.color,
                    }}
                  ></div>

                ))}

              </div>

              <div className="portfolio-mockup-legend">

                {allocation.map((item, index) => (

                  <div className="portfolio-mockup-legend-item" key={index}>

                    <span
                      className="portfolio-mockup-dot"
                      style={{ background: item.color }}
                    ></span>

                    <span>{item.label}</span>

                    <strong>{item.percent}%</strong>

                  </div>

                ))}

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default RightSection;