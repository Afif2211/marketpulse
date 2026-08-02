import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import {
  faTwitter,
  faLinkedin,
  faGithub,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <footer className="footer mt-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <Link to="/" className="footer-brand">
              <span className="footer-brand-market">Market</span>
              <span className="footer-brand-pulse">Pulse</span>
            </Link>

            <p className="footer-description mt-4">
              Invest smarter with real-time market insights. Track stocks, build portfolios and make confident investment decisions with MarketPulse.
            </p>

            <div className="social-icons mt-4">
              <a href="#!"><FontAwesomeIcon icon={faTwitter} /></a>
              <a href="https://linkedin.com/in/theafifkhan" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faLinkedin} /></a>
              <a href="https://github.com/Afif2211" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faGithub} /></a>
              <a href="#!"><FontAwesomeIcon icon={faInstagram} /></a>
              <a href="#!"><FontAwesomeIcon icon={faYoutube} /></a>
            </div>
          </div>

          <div className="col-6 col-lg-2">
            <h5>Company</h5>
            <ul>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/pricing">Pricing</Link></li>
              <li><Link to="/support">Contact</Link></li>
            </ul>
          </div>

          <div className="col-6 col-lg-2">
            <h5>Products</h5>
            <ul>
              <li><Link to="/products">Stocks</Link></li>
              <li><Link to="/products">Mutual Funds</Link></li>
              <li><Link to="/products">ETFs</Link></li>
              <li><Link to="/products">Portfolio</Link></li>
            </ul>
          </div>

          <div className="col-6 col-lg-2">
            <h5>Resources</h5>
            <ul>
              <li><Link to="/support">Blog</Link></li>
              <li><Link to="/support">Market News</Link></li>
              <li><Link to="/support">Learn</Link></li>
              <li><Link to="/support">Help Center</Link></li>
            </ul>
          </div>

          <div className="col-6 col-lg-2">
            <h5>Account</h5>
            <ul>
              <li><Link to="/signup">Sign Up</Link></li>
              <li><Link to="/login">Login</Link></li>
            </ul>
          </div>
        </div>

        <hr className="footer-divider" />

        <div className="text-center">
          <p className="footer-credit">
            © 2026 MarketPulse. Designed & Developed with{" "}
            <FontAwesomeIcon icon={faHeart} className="heart-icon" />
            {" "}by <strong>Afif Ahmad</strong>.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;