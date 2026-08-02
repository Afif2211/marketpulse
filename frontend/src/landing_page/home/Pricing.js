import React from "react";
import "./Pricing.css";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";

const included = [
  "Unlimited paper trades",
  "Real-time market data",
  "Full portfolio tracking",
  "AI-powered insights",
];

function Pricing() {
  return (
    <section className="home-pricing-section">
      <div className="container">
        <div className="row align-items-center">

          <div className="col-lg-6 home-pricing-text">

            <span className="home-pricing-eyebrow">Pricing</span>

            <h2 className="home-pricing-title">
              Free. No catch, no fees.
            </h2>

            <p className="home-pricing-subtitle">
              MarketPulse is a free educational platform. There's no
              subscription, no hidden charges, and no real money involved —
              ever.
            </p>

            <Link to="/pricing" className="home-pricing-link">
              See full pricing details →
            </Link>

          </div>

          <div className="col-lg-6 home-pricing-card-col">

            <div className="home-pricing-card">

              <span className="home-pricing-card-label">
                MarketPulse Plan
              </span>

              <div className="home-pricing-amount">
                <span className="home-pricing-currency">$</span>0
                <span className="home-pricing-period">/ forever</span>
              </div>

              <ul className="home-pricing-list">

                {included.map((item, index) => (

                  <li key={index}>
                    <FaCheck className="home-pricing-check" />
                    {item}
                  </li>

                ))}

              </ul>

              <Link to="/signup" className="home-pricing-cta">
                Get Started Free
              </Link>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

export default Pricing;