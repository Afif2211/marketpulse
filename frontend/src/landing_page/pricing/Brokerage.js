import React from "react";
import "./Brokerage.css";

import {
  FaChartLine,
  FaWallet,
  FaBookmark,
  FaBrain,
  FaNewspaper,
  FaShieldAlt,
} from "react-icons/fa";

const included = [
  { icon: <FaChartLine />, title: "Live Market Data", description: "Real-time prices for stocks and crypto." },
  { icon: <FaWallet />, title: "Unlimited Trading", description: "Buy and sell as often as you like." },
  { icon: <FaBookmark />, title: "Watchlist", description: "Track any stock or coin you're interested in." },
  { icon: <FaBrain />, title: "AI Insights", description: "Portfolio analysis, included by default." },
  { icon: <FaNewspaper />, title: "Market News", description: "Stay updated with the latest headlines." },
  { icon: <FaShieldAlt />, title: "Zero Risk", description: "Simulated funds, no real money, ever." },
];

const faqs = [
  {
    question: "Is MarketPulse really free?",
    answer: "Yes. There's no subscription, no trial period, and no hidden charges. Every feature is available to every account.",
  },
  {
    question: "Why is it free?",
    answer: "MarketPulse is an educational project built for practicing investing skills. Since no real money changes hands, there's no fee structure to charge against.",
  },
  {
    question: "Do I need a credit card to sign up?",
    answer: "No. Signing up only requires an email address and a password.",
  },
];

const Brokerage = () => {
  return (
    <section className="pricing-included-section">
      <div className="container">

        <div className="pricing-included-header">

          <span className="pricing-included-eyebrow">
            What's Included
          </span>

          <h2 className="pricing-included-title">
            Every feature. Every account. No upsells.
          </h2>

          <p className="pricing-included-subtitle">
            There's only one plan on MarketPulse, and everyone gets it.
          </p>

        </div>

        <div className="pricing-included-grid">

          {included.map((item, index) => (

            <div className="pricing-included-card" key={index}>

              <div className="pricing-included-icon">
                {item.icon}
              </div>

              <h5>{item.title}</h5>

              <p>{item.description}</p>

            </div>

          ))}

        </div>

        <div className="pricing-faq">

          <h3 className="pricing-faq-title">
            Common questions
          </h3>

          {faqs.map((faq, index) => (

            <div className="pricing-faq-item" key={index}>

              <h6>{faq.question}</h6>

              <p>{faq.answer}</p>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
};

export default Brokerage;