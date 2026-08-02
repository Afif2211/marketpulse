import React, { useState } from "react";
import "./Login.css";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { Link} from "react-router-dom";
import api from "../../services/api";
import { GoogleLogin } from "@react-oauth/google";
import { useRef, useEffect } from "react";


const Login = () => {

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox"
        ? checked
        : value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  setError("");

  if (!formData.email || !formData.password) {
    setError("Please fill all fields.");
    return;
  }

  try {
    setLoading(true);

    const result = await api.login({
      email: formData.email,
      password: formData.password,
    });

    if (!result.ok) {
  setError(result.data.message || "Login failed.");
  return;
}

// Save the user for quick access to profile info in the frontend.
localStorage.setItem(
  "user",
  JSON.stringify(result.data.user)
);

// Redirect to the dashboard, passing the token so it can
// authenticate cross-domain requests via Authorization header.
const dashboardUrl = process.env.REACT_APP_DASHBOARD_URL || "http://localhost:3001";

window.location.href = `${dashboardUrl}?token=${encodeURIComponent(result.data.token)}`;

  } catch (error) {
    setError("Something went wrong.");
  } finally {
    setLoading(false);
  }
};

const handleGoogleSuccess = async (credentialResponse) => {

    setError("");

    try {

      setLoading(true);

      const result = await api.googleAuth(credentialResponse.credential);

      if (!result.ok) {
        setError(result.data.message || "Google sign-in failed.");
        return;
      }

      localStorage.setItem(
        "user",
        JSON.stringify(result.data.user)
      );

      const dashboardUrl = process.env.REACT_APP_DASHBOARD_URL || "http://localhost:3001";

      window.location.href = `${dashboardUrl}?token=${encodeURIComponent(result.data.token)}`;

    } catch (error) {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }

  };

  const googleBtnRef = useRef(null);

  const [googleBtnWidth, setGoogleBtnWidth] = useState(300);

  useEffect(() => {

    const updateWidth = () => {

      if (googleBtnRef.current) {

        setGoogleBtnWidth(Math.min(googleBtnRef.current.offsetWidth, 400));

      }

    };

    updateWidth();

    window.addEventListener("resize", updateWidth);

    return () => window.removeEventListener("resize", updateWidth);

  }, []);

  return (
    <section className="container auth-section">

      <div className="row align-items-center shadow-lg overflow-hidden auth-row">

        {/* LEFT SIDE */}

        <div className="col-lg-6 auth-form-col">

          <img
            src="media/images/logo.png"
            alt="MarketPulse"
            className="auth-logo mb-5"
          />

          <h1 className="auth-title fw-bold">
            Welcome Back
          </h1>

          <p className="auth-subtitle text-muted mt-3 mb-5">
            Sign in to access your portfolio,
            monitor live markets and continue
            your investment journey.
          </p>
          {error && (
            <div className="alert alert-danger">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>

            {/* Email */}

            <div className="input-group mb-4">

              <span className="input-group-text bg-white">
                <FaEnvelope />
              </span>

              <input
                type="email"
                className="form-control py-3"
                placeholder="Email Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />

            </div>

            {/* Password */}
                      <div className="input-group mb-4">

            <span className="input-group-text bg-white">
              <FaLock />
            </span>

            <input
              type={showPassword ? "text" : "password"}
              className="form-control py-3"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />

            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >
              {showPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </button>

          </div>

          {/* Remember & Forgot */}

          <div className="d-flex justify-content-between align-items-center mb-4 auth-remember-row">

            <div className="form-check">

              <input
                className="form-check-input"
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
              />

              <label className="form-check-label">
                Remember me
              </label>

            </div>

            <Link
              to="/forgot-password"
              style={{
                textDecoration: "none",
                fontWeight: "500",
              }}
            >
              Forgot Password?
            </Link>

          </div>

          {/* Button */}

          <button
            disabled={loading}
            type="submit"
            className="btn btn-primary w-100 py-3 fw-semibold auth-submit-btn"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

          </form>

          {/* Divider */}

          <div className="d-flex align-items-center my-4">

            <hr className="flex-grow-1" />

            <span className="mx-3 text-muted">
              OR
            </span>

            <hr className="flex-grow-1" />

          </div>

          {/* Google */}

          <div className="auth-google-btn-wrapper" ref={googleBtnRef}>

            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => setError("Google sign-in failed.")}
              width={googleBtnWidth}
            />

          </div>

          {/* Footer */}

          <p
            className="text-center mt-4 text-muted"
          >
            Don't have an account?{" "}

            <Link
              to="/signup"
              style={{
                textDecoration: "none",
                fontWeight: "600",
              }}
            >
              Sign Up
            </Link>

          </p>

        </div>

        {/* RIGHT SIDE */}

        <div className="col-lg-6 p-0 d-none d-lg-block auth-image-col">

          <img
            src="media/images/signup.png"
            alt="Login Illustration"
            className="img-fluid h-100 auth-image"
          />

        </div>

      </div>

    </section>
  );
};

export default Login;