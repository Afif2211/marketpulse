import React from "react";
import "./OpenAccount.css";
import { Link } from "react-router-dom";

function OpenAccount() {
  return (
    <section className="open-account-section">
      <div className="container">
        <div className="row justify-content-center text-center">

          <div className="col-lg-8">

            <h2 className="open-account-title">
              Open your MarketPulse account
            </h2>

            <p className="open-account-subtitle">
              Modern investing platform with real-time market data,
              zero hidden charges, and powerful portfolio management.
            </p>

            <Link to="/signup" className="open-account-btn">
              Sign Up Now
            </Link>

          </div>

        </div>
      </div>
    </section>
  );
}

export default OpenAccount;