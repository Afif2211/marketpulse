import React, { useEffect, useState } from "react";
import "./EditProfileModal.css";

import { FaTimes } from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";
import api from "../../services/Api";

const EditProfileModal = ({
    isOpen,
    onClose,
}) => {

    const {
        user,
        refreshUser,
    } = useAuth();

    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        country: "",
    });

    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState("");

    const [error, setError] = useState("");

    useEffect(() => {

        if (user) {

            setFormData({
                fullName: user.fullName || "",
                phone: user.phone || "",
                country: user.country || "",
            });

        }

        if (isOpen) {

            setMessage("");

            setError("");

        }

    }, [user, isOpen]);

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

    };

    const handleClose = () => {

        setMessage("");

        setError("");

        onClose();

    };

    const handleSave = async () => {

        try {

            setLoading(true);

            setError("");

            setMessage("");

            const result = await api.updateProfile({

                fullName: formData.fullName,

                phone: formData.phone,

                country: formData.country,

            });

            if (!result.ok) {

                setError(result.data.message);

                return;

            }

            await refreshUser();

            setMessage("Profile updated successfully.");

            setTimeout(() => {

                handleClose();

            }, 1000);

        }

        catch (error) {

            setError("Something went wrong.");

        }

        finally {

            setLoading(false);

        }

    };

    if (!isOpen) return null;

    return (

        <div className="edit-profile-overlay">

            <div className="edit-profile-modal">

                <div className="edit-profile-header">

                    <h3>Edit Profile</h3>

                    <button
                        className="close-btn"
                        onClick={handleClose}
                    >
                        <FaTimes />
                    </button>

                </div>

                <div className="edit-profile-body">

                    {

                        error && (

                            <div className="alert alert-danger">

                                {error}

                            </div>

                        )

                    }

                    {

                        message && (

                            <div className="alert alert-success">

                                {message}

                            </div>

                        )

                    }

                    <div className="form-group">

                        <label>

                            Full Name

                        </label>

                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-group">

                        <label>

                            Phone Number

                        </label>

                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-group">

                        <label>

                            Country

                        </label>

                        <input
                            type="text"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                        />

                    </div>

                </div>

                <div className="edit-profile-footer">

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

                        {

                            loading

                                ? "Saving..."

                                : "Save Changes"

                        }

                    </button>

                </div>

            </div>

        </div>

    );

};

export default EditProfileModal;