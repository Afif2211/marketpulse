import React from "react";
import "./Hero.css";
import { Link } from "react-router-dom";

const highlights = [
  { label: "Stocks & Crypto", value: "Live" },
  { label: "Portfolio Tracking", value: "Real-time" },
  { label: "AI Insights", value: "Built-in" },
];

const holdings = [
  { symbol: "AAPL", name: "Apple Inc.", price: "$189.40", change: "+1.8%", positive: true },
  { symbol: "BTC", name: "Bitcoin", price: "$66,245", change: "-0.3%", positive: false },
  { symbol: "NVDA", name: "NVIDIA", price: "$942.10", change: "+3.4%", positive: true },
];

const ProductsHero = () => {
  return (
    <section className="products-hero">
      <div className="container">

        <div className="row align-items-center">

          <div className="col-lg-6 products-hero-text">

            <span className="products-hero-eyebrow">
              Products
            </span>

            <h1 className="products-hero-title">
              Powerful tools for
              {" "}
              <span className="products-hero-highlight">smarter investing</span>
            </h1>

            <p className="products-hero-subtitle">
              MarketPulse gives you the tools to track live markets,
              analyze trends, manage a portfolio, and make confident
              decisions — all from one platform.
            </p>

            <div className="products-hero-actions">

              <Link to="/signup" className="products-hero-cta">
                Explore Products
              </Link>

              <Link to="/pricing" className="products-hero-secondary">
                See Pricing
              </Link>

            </div>

            <div className="products-hero-highlights">

              {highlights.map((item, index) => (

                <div className="products-hero-highlight-item" key={index}>
                  <span className="products-hero-highlight-value">{item.value}</span>
                  <span className="products-hero-highlight-label">{item.label}</span>
                </div>

              ))}

            </div>

          </div>

          <div className="col-lg-6 products-hero-image-col">

            <div className="products-hero-mockup">

              <div className="products-hero-mockup-topbar">

                <span className="products-hero-mockup-dot"></span>
                <span className="products-hero-mockup-dot"></span>
                <span className="products-hero-mockup-dot"></span>

              </div>

              <div className="products-hero-mockup-body">

                <div className="products-hero-mockup-summary">

                  <span>Total Account Value</span>

                  <h3>$9,897.46</h3>

                  <span className="products-hero-mockup-return">
                    ▲ +$1,250.75 (14.47%)
                  </span>

                </div>

                <div className="products-hero-mockup-chart">
                  <svg viewBox="0 0 300 90" preserveAspectRatio="none">
                    <polyline
                      points="0,70 40,60 80,65 120,40 160,45 200,20 240,28 300,10"
                      fill="none"
                      stroke="url(#productsHeroGradient)"
                      strokeWidth="3"
                    />
                    <defs>
                      <linearGradient id="productsHeroGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#4338CA" />
                        <stop offset="100%" stopColor="#3B82F6" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                <div className="products-hero-mockup-list">

                  {holdings.map((item, index) => (

                    <div className="products-hero-mockup-row" key={index}>

                      <div className="products-hero-mockup-row-info">
                        <strong>{item.symbol}</strong>
                        <small>{item.name}</small>
                      </div>

                      <div className="products-hero-mockup-row-price">
                        <span>{item.price}</span>
                        <small className={item.positive ? "up" : "down"}>
                          {item.change}
                        </small>
                      </div>

                    </div>

                  ))}

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default ProductsHero;