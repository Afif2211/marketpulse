import React from "react";
import "./Education.css";
import { Link } from "react-router-dom";

import {
  FaLightbulb,
  FaChartBar,
  FaRobot,
} from "react-icons/fa";

const points = [
  {
    icon: <FaLightbulb />,
    title: "Learn by doing, not just reading",
    description: "Every trade you make on MarketPulse is real practice — real prices, real portfolio math, zero risk.",
  },
  {
    icon: <FaChartBar />,
    title: "See the impact of every decision",
    description: "Your Portfolio Performance chart shows exactly how your choices play out over time.",
  },
  {
    icon: <FaRobot />,
    title: "Get AI-powered insights",
    description: "AI Insights breaks down your holdings and highlights what's worth paying attention to.",
  },
];

function Education() {
  return (
    <section className="learn-section">
      <div className="container">
        <div className="row align-items-center">

          <div className="col-lg-6 learn-text">

            <span className="learn-eyebrow">Learn as you go</span>

            <h2 className="learn-title">
              The best way to learn the market is to trade in it
            </h2>

            <p className="learn-subtitle">
              MarketPulse isn't a textbook — it's a live simulation. You'll
              understand risk, timing, and portfolio strategy faster by
              actually doing it.
            </p>

            <div className="learn-points">

              {points.map((point, index) => (

                <div className="learn-point" key={index}>

                  <div className="learn-point-icon">
                    {point.icon}
                  </div>

                  <div>
                    <h3>{point.title}</h3>
                    <p>{point.description}</p>
                  </div>

                </div>

              ))}

            </div>

            <Link to="/signup" className="learn-cta">
              Start learning for free →
            </Link>

          </div>

          <div className="col-lg-6 learn-visual-col">

            <div className="learn-visual-card">

              <div className="learn-visual-header">
                <span className="learn-visual-dot"></span>
                <span className="learn-visual-dot"></span>
                <span className="learn-visual-dot"></span>
              </div>

              <div className="learn-visual-body">

                <p className="learn-visual-label">Portfolio Performance</p>

                <div className="learn-visual-chart">
                  <svg viewBox="0 0 300 100" preserveAspectRatio="none">
                    <polyline
                      points="0,80 40,70 80,75 120,50 160,55 200,30 240,35 300,10"
                      fill="none"
                      stroke="url(#learnGradient)"
                      strokeWidth="3"
                    />
                    <defs>
                      <linearGradient id="learnGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#4338CA" />
                        <stop offset="100%" stopColor="#3B82F6" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                <div className="learn-visual-stats">

                  <div>
                    <span>Total Return</span>
                    <strong className="positive">+14.4%</strong>
                  </div>

                  <div>
                    <span>Holdings</span>
                    <strong>5</strong>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

export default Education;