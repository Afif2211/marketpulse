import React from "react";
import "./Stats.css";
import { Link } from "react-router-dom";

import {
  FaGraduationCap,
  FaLock,
  FaBolt,
  FaHandHoldingUsd,
} from "react-icons/fa";

const values = [
  {
    icon: <FaGraduationCap />,
    title: "Built for learning",
    description: "Practice with virtual funds in a real market environment before you ever risk real money.",
  },
  {
    icon: <FaLock />,
    title: "No real money, ever",
    description: "Every trade on MarketPulse uses simulated funds. It's a safe space to make mistakes and learn from them.",
  },
  {
    icon: <FaBolt />,
    title: "Real-time, not delayed",
    description: "Prices and portfolio performance update live, so what you see reflects the actual market.",
  },
  {
    icon: <FaHandHoldingUsd />,
    title: "Completely free",
    description: "No subscriptions, no hidden fees. MarketPulse is free to use, start to finish.",
  },
];

function Stats() {
  return (
    <section className="trust-section">
      <div className="container">
        <div className="row align-items-center">

          <div className="col-lg-6 trust-text">

            <span className="trust-eyebrow">Why MarketPulse</span>

            <h2 className="trust-title">
              Learn to invest without the risk
            </h2>

            <p className="trust-subtitle">
              MarketPulse gives you a real market experience — live data,
              a full portfolio, real trades — without putting a single
              real dollar on the line.
            </p>

            <div className="trust-values">

              {values.map((value, index) => (

                <div className="trust-value-row" key={index}>

                  <div className="trust-value-icon">
                    {value.icon}
                  </div>

                  <div>
                    <h3 className="trust-value-title">{value.title}</h3>
                    <p className="trust-value-description">{value.description}</p>
                  </div>

                </div>

              ))}

            </div>

          </div>

          <div className="col-lg-6 trust-visual-col">

            <div className="trust-visual-card">

              <div className="trust-visual-badge">
                🎓 Educational Project
              </div>

              <h3 className="trust-visual-heading">
                Virtual Portfolio
              </h3>

              <div className="trust-visual-stat">
                <span>Starting Balance</span>
                <strong>$10,000.00</strong>
              </div>

              <div className="trust-visual-stat">
                <span>Real Money Used</span>
                <strong>$0.00</strong>
              </div>

              <div className="trust-visual-links">

                <Link to="/products">
                  Explore products →
                </Link>

                <Link to="/signup">
                  Create free account →
                </Link>

              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

export default Stats;