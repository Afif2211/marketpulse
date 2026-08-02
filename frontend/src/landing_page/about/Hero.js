import React from "react";
import "./Hero.css";

const Hero = () => {
  return (
    <section className="about-hero">
      <div className="container">

        <div className="row justify-content-center text-center">

          <div className="col-lg-9">

            <span className="about-hero-eyebrow">
              About MarketPulse
            </span>

            <h1 className="about-hero-title">
              Building the future of investing
              {" "}
              <span className="about-hero-highlight">with modern technology</span>
            </h1>

            <p className="about-hero-subtitle">
              MarketPulse combines real-time market data, portfolio
              management, watchlists, and powerful analytics into one
              seamless investing platform.
            </p>

          </div>

        </div>

        <div className="about-hero-divider"></div>

        <div className="row gy-5">

          <div className="col-lg-6 about-hero-block">

            <h4>Our Story</h4>

            <p>
              MarketPulse was created to simplify investing through
              technology. We believe financial markets should be
              transparent, easy to understand, and accessible to
              everyone.
            </p>

            <p>
              Whether you're tracking stocks, managing a portfolio, or
              exploring new investment opportunities, MarketPulse brings
              everything together in one modern platform.
            </p>

            <p>
              Every feature is designed with simplicity, speed, and
              reliability so investors can focus on making smarter
              financial decisions.
            </p>

          </div>

          <div className="col-lg-6 about-hero-block">

            <h4>Our Mission</h4>

            <p>
              Innovation is at the heart of everything we build. Our
              goal is to deliver a fast, secure, and intuitive investing
              experience powered by modern web technologies.
            </p>

            <p>
              From live prices and intelligent analytics to
              personalized watchlists and portfolio tracking, every
              tool is built to help investors stay informed and invest
              with confidence.
            </p>

            <p>
              As MarketPulse grows, our mission remains the same:
              making investing smarter, simpler, and more accessible
              for everyone.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Hero;