import React from "react";
import "./Hero.css";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="home-hero">
      <div className="container">
        <div className="row align-items-center">

          <div className="col-lg-6 home-hero-text">

            <span className="home-hero-eyebrow">
              Now open to everyone
            </span>

            <h1 className="home-hero-title">
              Invest in <span className="home-hero-highlight">everything</span>
            </h1>

            <p className="home-hero-subtitle">
              One platform for stocks, derivatives, mutual funds,
              ETFs, bonds, and more. Built for investors who want
              clarity, not clutter.
            </p>

            <div className="home-hero-actions">

              <Link to="/signup" className="home-hero-cta">
                Sign Up Now
              </Link>

              <Link to="/products" className="home-hero-secondary">
                Explore Products
              </Link>

            </div>

          </div>

          <div className="col-lg-6 home-hero-image-col">

            <img
              src="media/images/homeHero.png"
              alt="MarketPulse platform preview"
              className="home-hero-image"
            />

          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;