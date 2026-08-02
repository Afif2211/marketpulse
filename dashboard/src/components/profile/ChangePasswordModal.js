import React, { useState } from "react";
import "./ChangePasswordModal.css";

import {
    FaTimes,
    FaEye,
    FaEyeSlash,
} from "react-icons/fa";

import api from "../../services/Api";

const ChangePasswordModal = ({
    isOpen,
    onClose,
}) => {

    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [showCurrent, setShowCurrent] = useState(false);

    const [showNew, setShowNew] = useState(false);

    const [showConfirm, setShowConfirm] = useState(false);

    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState("");

    const [error, setError] = useState("");

    if (!isOpen) return null;

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

    };

    const handleClose = () => {

        setFormData({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        });

        setMessage("");

        setError("");

        setShowCurrent(false);

        setShowNew(false);

        setShowConfirm(false);

        onClose();

    };

    const handleSave = async () => {

        setError("");

        setMessage("");

        if (
            !formData.currentPassword ||
            !formData.newPassword ||
            !formData.confirmPassword
        ) {

            setError("Please fill all fields.");

            return;

        }

        if (
            formData.newPassword !==
            formData.confirmPassword
        ) {

            setError("Passwords do not match.");

            return;

        }

        try {

            setLoading(true);

            const result =
                await api.changePassword({

                    currentPassword:
                        formData.currentPassword,

                    newPassword:
                        formData.newPassword,

                });

            if (!result.ok) {

                setError(result.data.message);

                return;

            }

            setMessage("Password changed successfully.");

            setTimeout(() => {

                handleClose();

            }, 1200);

        }

        catch {

            setError("Something went wrong.");

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="password-overlay">

            <div className="password-modal">

                <div className="password-header">

                    <h3>

                        Change Password

                    </h3>

                    <button
                        className="close-btn"
                        onClick={handleClose}
                    >

                        <FaTimes />

                    </button>

                </div>

                <div className="password-body">

                    {error && (

                        <div className="alert alert-danger">

                            {error}

                        </div>

                    )}

                    {message && (

                        <div className="alert alert-success">

                            {message}

                        </div>

                    )}

                    {/* Current */}

                    <div className="form-group">

                        <label>

                            Current Password

                        </label>

                        <div className="password-input">

                            <input
                                type={
                                    showCurrent
                                        ? "text"
                                        : "password"
                                }
                                name="currentPassword"
                                value={
                                    formData.currentPassword
                                }
                                onChange={handleChange}
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowCurrent(
                                        !showCurrent
                                    )
                                }
                            >

                                {showCurrent ? (
                                    <FaEyeSlash />
                                ) : (
                                    <FaEye />
                                )}

                            </button>

                        </div>

                    </div>

                    {/* New */}

                    <div className="form-group">

                        <label>

                            New Password

                        </label>

                        <div className="password-input">

                            <input
                                type={
                                    showNew
                                        ? "text"
                                        : "password"
                                }
                                name="newPassword"
                                value={
                                    formData.newPassword
                                }
                                onChange={handleChange}
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowNew(
                                        !showNew
                                    )
                                }
                            >

                                {showNew ? (
                                    <FaEyeSlash />
                                ) : (
                                    <FaEye />
                                )}

                            </button>

                        </div>

                    </div>

                    {/* Confirm */}

                    <div className="form-group">

                        <label>

                            Confirm Password

                        </label>

                        <div className="password-input">

                            <input
                                type={
                                    showConfirm
                                        ? "text"
                                        : "password"
                                }
                                name="confirmPassword"
                                value={
                                    formData.confirmPassword
                                }
                                onChange={handleChange}
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowConfirm(
                                        !showConfirm
                                    )
                                }
                            >

                                {showConfirm ? (
                                    <FaEyeSlash />
                                ) : (
                                    <FaEye />
                                )}

                            </button>

                        </div>

                    </div>

                </div>

                <div className="password-footer">

                    <button
                        className="cancel-btn"
                        onClick={handleClose}
                        disabled={loading}
                    >

                        Cancel

                    </button>

                    <button
                        className="save-btn"
                        onClick={handleSave}
                        disabled={loading}
                    >

                        {loading
                            ? "Updating..."
                            : "Change Password"}

                    </button>

                </div>

            </div>

        </div>

    );

};

export default ChangePasswordModal;