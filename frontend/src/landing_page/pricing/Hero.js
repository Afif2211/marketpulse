import React from "react";
import "./Hero.css";

const points = [
  { value: "$0", label: "Account Opening", description: "Create your MarketPulse account completely free." },
  { value: "$0", label: "Every Trade", description: "No commissions, no fees — simulated trading only." },
  { value: "$0", label: "AI Insights", description: "All features included, no premium tier required." },
];

const Hero = () => {
  return (
    <section className="pricing-hero">
      <div className="container">

        <div className="row justify-content-center text-center">

          <div className="col-lg-9 pricing-hero-text">

            <span className="pricing-hero-eyebrow">
              Pricing
            </span>

            <h1 className="pricing-hero-title">
              Free for every investor,
              {" "}
              <span className="pricing-hero-highlight">no exceptions</span>
            </h1>

            <p className="pricing-hero-subtitle">
              MarketPulse is a free educational platform. There's no
              real money involved, so there's nothing to charge you
              for.
            </p>

          </div>

        </div>

        <div className="row pricing-hero-grid g-4">

          {points.map((point, index) => (

            <div className="col-lg-4" key={index}>

              <div className="pricing-hero-card">

                <h2 className="pricing-hero-value">{point.value}</h2>

                <h5 className="pricing-hero-label">{point.label}</h5>

                <p className="pricing-hero-description">{point.description}</p>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
};

export default Hero;