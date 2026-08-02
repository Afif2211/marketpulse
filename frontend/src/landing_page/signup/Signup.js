import React, { useState } from "react";
import "./Signup.css";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { GoogleLogin } from "@react-oauth/google";
import { useRef, useEffect } from "react";

const Signup = () => {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (
        !formData.fullName ||
        !formData.email ||
        !formData.password ||
        !formData.confirmPassword
    ) {
        setError("Please fill all fields.");
        return;
    }

    if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match.");
        return;
    }

    if (!formData.agree) {
        setError("Please accept the Terms and Privacy Policy.");
        return;
    }

    try {
        setLoading(true);

        const result = await api.register({
            fullName: formData.fullName,
            email: formData.email,
            password: formData.password,
        });

        if (!result.ok) {
            setError(result.data.message);
            return;
        }

        setSuccess("Account created successfully!");

        setTimeout(() => {
            navigate("/login");
        }, 1500);

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

      window.location.href = process.env.REACT_APP_DASHBOARD_URL || "http://localhost:3001";

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
            Create your account
          </h1>

          <p className="auth-subtitle text-muted mt-3 mb-5">
            Join thousands of investors using MarketPulse to
            track live markets, build smarter portfolios and
            invest with confidence.
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

            {/* Full Name */}

            <div className="input-group mb-4">

              <span className="input-group-text bg-white">
                <FaUser />
              </span>

              <input
                type="text"
                className="form-control py-3"
                placeholder="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />

            </div>

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

          {/* Confirm */}

          <div className="input-group mb-4">

            <span className="input-group-text bg-white">
              <FaLock />
            </span>

            <input
              type={showConfirm ? "text" : "password"}
              className="form-control py-3"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />

            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={() =>
                setShowConfirm(!showConfirm)
              }
            >
              {showConfirm ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </button>

          </div>

          {/* Checkbox */}

          <div className="form-check mb-4">

            <input
              className="form-check-input"
              type="checkbox"
              name="agree"
              checked={formData.agree}
              onChange={handleChange}
            />

           <label className="form-check-label">

              I agree to the Terms of Service and Privacy Policy

            </label>
          </div>

          {/* Button */}

          <button
            disabled={loading}
            type="submit"
            className="btn btn-primary w-100 py-3 fw-semibold auth-submit-btn"
          >
            {loading ? "Creating Account..." : "Create Account"}
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
            Already have an account?{" "}

            <Link
              to="/login"
              style={{
                textDecoration: "none",
                fontWeight: "600",
              }}
            >
              Sign In
            </Link>

          </p>

        </div>

        {/* RIGHT SIDE */}

        <div className="col-lg-6 p-0 d-none d-lg-block auth-image-col">

          <img
            src="media/images/signup.png"
            alt="Signup Illustration"
            className="img-fluid h-100 auth-image"
          />

        </div>

      </div>

    </section>
  );
};

export default Signup;