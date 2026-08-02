import React, { useState } from "react";
import "./Login.css";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";

const ResetPassword = () => {

  const { token } = useParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");
    setSuccess("");

    if (!newPassword || !confirmPassword) {
      setError("Please fill all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {

      setLoading(true);

      const result = await api.resetPassword(token, newPassword);

      if (!result.ok) {
        setError(result.data.message || "Something went wrong.");
        return;
      }

      setSuccess("Password reset successfully! Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

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

          

          <h1 className="auth-title fw-bold">
            Set a new password
          </h1>

          <p className="auth-subtitle text-muted mt-3 mb-5">
            Choose a new password for your account.
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
                <FaLock />
              </span>

              <input
                type={showPassword ? "text" : "password"}
                className="form-control py-3"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />

              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>

            </div>

            <div className="input-group mb-4">

              <span className="input-group-text bg-white">
                <FaLock />
              </span>

              <input
                type={showPassword ? "text" : "password"}
                className="form-control py-3"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

            </div>

            <button
              disabled={loading}
              type="submit"
              className="btn btn-primary w-100 py-3 fw-semibold auth-submit-btn"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>

          </form>

          <p className="text-center mt-4 text-muted">
            <Link
              to="/login"
              style={{ textDecoration: "none", fontWeight: "600" }}
            >
              Back to Sign In
            </Link>
          </p>

        </div>

<div className="col-lg-6 p-0 d-none d-lg-block auth-image-col">

          <div className="auth-visual">

            <div className="auth-visual-icon">
              🔒
            </div>

            <h3>Almost there</h3>

            <p>
              Choose a strong new password to secure your account.
            </p>

          </div>

        </div>

      </div>

    </section>
  );
};

export default ResetPassword;