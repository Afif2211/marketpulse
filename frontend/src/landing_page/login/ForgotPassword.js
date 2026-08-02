import React, { useState } from "react";
import "./Login.css";
import { FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";
import api from "../../services/api";

const ForgotPassword = () => {

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");
    setSuccess("");

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    try {

      setLoading(true);

      const result = await api.forgotPassword(email);

      if (!result.ok) {
        setError(result.data.message || "Something went wrong.");
        return;
      }

      setSuccess(result.data.message);

    } catch (error) {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }

  };

  return (
    <section className="container auth-section">

      <div className="row align-items-center shadow-lg overflow-hidden auth-row">

        <div className="col-lg-6 auth-form-col">

          <img
            src="media/images/logo.png"
            alt="MarketPulse"
            className="auth-logo mb-5"
          />

          <h1 className="auth-title fw-bold">
            Forgot your password?
          </h1>

          <p className="auth-subtitle text-muted mt-3 mb-5">
            Enter the email address associated with your account,
            and we'll send you a link to reset your password.
          </p>

          {error && (
            <div className="alert alert-danger">
              {error}
            </div>
          )}

          {success && (
            <div className="alert alert-success">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <div className="input-group mb-4">

              <span className="input-group-text bg-white">
                <FaEnvelope />
              </span>

              <input
                type="email"
                className="form-control py-3"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

            </div>

            <button
              disabled={loading}
              type="submit"
              className="btn btn-primary w-100 py-3 fw-semibold auth-submit-btn"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>

          </form>

          <p className="text-center mt-4 text-muted">
            Remembered your password?{" "}

            <Link
              to="/login"
              style={{ textDecoration: "none", fontWeight: "600" }}
            >
              Sign In
            </Link>

          </p>

        </div>

<div className="col-lg-6 p-0 d-none d-lg-block auth-image-col">

          <div className="auth-visual">

            <div className="auth-visual-icon">
              🔑
            </div>

            <h3>Reset your access</h3>

            <p>
              We'll email you a secure link to get back into your account.
            </p>

          </div>

        </div>

      </div>

    </section>
  );
};

export default ForgotPassword;