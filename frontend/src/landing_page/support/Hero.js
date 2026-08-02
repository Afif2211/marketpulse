import React from "react";
import "./Hero.css";

const topics = ["Account", "Trading", "Portfolio", "Security"];

const Hero = () => {
  return (
    <section className="support-hero">
      <div className="container">

        <div className="row justify-content-center text-center">

          <div className="col-lg-9">

            <span className="support-hero-eyebrow">
              Support
            </span>

            <h1 className="support-hero-title">
              How can we
              {" "}
              <span className="support-hero-highlight">help you?</span>
            </h1>

            <p className="support-hero-subtitle">
              Browse common questions below, or reach out directly and
              we'll get back to you.
            </p>

            <div className="support-hero-topics">

              {topics.map((topic, index) => (

                <span className="support-hero-topic" key={index}>
                  {topic}
                </span>

              ))}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Hero;