import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
    useEffect(() => {
        const handleMove = (e) => {
        const circles = document.querySelectorAll(".gradient-circle");

        const x = (window.innerWidth / 2 - e.clientX) / 35;
        const y = (window.innerHeight / 2 - e.clientY) / 35;

        circles.forEach((circle) => {
            circle.style.transform = `translate(${x}px, ${y}px)`;
        });
    };

        window.addEventListener("mousemove", handleMove);

    return () => {
        window.removeEventListener("mousemove", handleMove);
        };
    }, []);
  return (
    <div className="notfound-page">

        {/* Trading Grid */}
<div className="trading-grid"></div>
      {/* Background Gradient Blobs */}

      <div className="gradient-circle circle-one"></div>
      <div className="gradient-circle circle-two"></div>
      <div className="gradient-circle circle-three"></div>

      {/* Floating Dots */}

      <div className="dot dot1"></div>
      <div className="dot dot2"></div>
      <div className="dot dot3"></div>
      <div className="dot dot4"></div>
      <div className="dot dot5"></div>

      {/* Main Card */}

      <div className="glass-card">
        <div className="cursor-glow"></div>
        <div className="glass-shine"></div>
        <span className="error-tag">
          ERROR 404
        </span>
<div className="market-status">
  <span className="status-dot"></span>
  Market Status: Bullish
</div>

        <div className="error-title">

  <span className="four">4</span>

  <div className="stock-ring">

    <div className="ring"></div>

    <div className="ring ring2"></div>

    <div className="ring ring3"></div>

    <div className="ring-center">

      <span className="pulse-dot"></span>

    </div>

  </div>

  <span className="four">4</span>

</div>

        <h2 className="heading">
          Oops! The Market Couldn't Find This Page
        </h2>

        <p className="description">
          The page you're looking for may have been moved,
          deleted or never existed.
          Don't worry—the markets are still open.
        </p>

        {/* Animated Stock Chart */}

        <svg
    className="stock-chart"
    viewBox="0 0 700 170"
>

    <line x1="80" y1="40" x2="80" y2="130" className="wick"/>

    <rect x="70" y="60" width="20" height="45" className="bull"/>

    <line x1="180" y1="20" x2="180" y2="145" className="wick"/>

    <rect x="170" y="40" width="20" height="70" className="bear"/>

    <line x1="280" y1="30" x2="280" y2="125" className="wick"/>

    <rect x="270" y="55" width="20" height="40" className="bull"/>

    <line x1="380" y1="18" x2="380" y2="110" className="wick"/>

    <rect x="370" y="28" width="20" height="55" className="bull"/>

    <line x1="480" y1="45" x2="480" y2="145" className="wick"/>

    <rect x="470" y="65" width="20" height="45" className="bear"/>

    <line x1="580" y1="15" x2="580" y2="115" className="wick"/>

    <rect x="570" y="30" width="20" height="65" className="bull"/>

</svg>

        {/* Fake Market Ticker */}

        <div className="ticker-container">
            <div className="ticker">

                <span>NASDAQ ▲ 2.4%</span>
                <span>S&P 500 ▲ 1.2%</span>
                <span>BTC ▲ 3.8%</span>
                <span>AAPL ▲ 1.4%</span>
                <span>TSLA ▼ 0.9%</span>
                <span>NASDAQ ▲ 2.4%</span>
                <span>S&P 500 ▲ 1.2%</span>
                <span>BTC ▲ 3.8%</span>
                <span>AAPL ▲ 1.4%</span>
                <span>TSLA ▼ 0.9%</span>

            </div>
    </div>

        {/* CTA */}

        <Link
          to="/"
          className="home-btn"
        >
          ← Return Home
        </Link>

      </div>

    </div>
  );
}

export default NotFound;