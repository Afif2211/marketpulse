import React from "react";
import "./Universe.css";
import { Link } from "react-router-dom";

import {
  FaChartLine,
  FaWallet,
  FaBookmark,
  FaChartPie,
  FaBrain,
  FaNewspaper,
} from "react-icons/fa";

const modules = [
  { icon: <FaChartLine />, title: "Dashboard" },
  { icon: <FaWallet />, title: "Portfolio" },
  { icon: <FaBookmark />, title: "Watchlist" },
  { icon: <FaChartPie />, title: "Markets" },
  { icon: <FaBrain />, title: "AI Insights" },
  { icon: <FaNewspaper />, title: "News" },
];

const Universe = () => {
  return (
    <section className="universe-section">
      <div className="container">

        <div className="universe-card">

          <div className="row align-items-center gy-5">

            <div className="col-lg-5 universe-content">

              <span className="universe-eyebrow">
                The MarketPulse Universe
              </span>

              <h2 className="universe-title">
                Everything you need to
                {" "}
                <span className="universe-highlight">invest smarter</span>
              </h2>

              <p className="universe-subtitle">
                MarketPulse brings live prices, watchlists, portfolio
                tracking, AI insights, and market news together into
                one seamless platform.
              </p>

              <Link to="/signup" className="universe-cta">
                Get Started →
              </Link>

            </div>

            <div className="col-lg-7 universe-modules-col">

              <div className="universe-modules-grid">

                {modules.map((module, index) => (

                  <div className="universe-module" key={index}>

                    <div className="universe-module-icon">
                      {module.icon}
                    </div>

                    <span>{module.title}</span>

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

export default Universe;