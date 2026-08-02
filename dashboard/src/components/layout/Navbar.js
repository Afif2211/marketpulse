import React, {
    useEffect,
    useRef,
    useState,
} from "react";

import "./Navbar.css";

import {
    FaBars,
    FaChevronDown,
    FaSignOutAlt,
    FaUser,
    FaCheckCircle,
    FaCalendarAlt,
} from "react-icons/fa";

import { Link } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

const Navbar = ({
    sidebarOpen,
    setSidebarOpen,
}) => {

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const dropdownRef = useRef(null);

    const {
        user,
        logout,
    } = useAuth();

    useEffect(() => {

        const handleOutsideClick = (event) => {

            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {

                setDropdownOpen(false);

            }

        };

        const handleEscape = (event) => {

            if (event.key === "Escape") {

                setDropdownOpen(false);

            }

        };

        document.addEventListener(
            "mousedown",
            handleOutsideClick
        );

        document.addEventListener(
            "keydown",
            handleEscape
        );

        return () => {

            document.removeEventListener(
                "mousedown",
                handleOutsideClick
            );

            document.removeEventListener(
                "keydown",
                handleEscape
            );

        };

    }, []);

    const closeDropdown = () => {

        setDropdownOpen(false);

    };

    const avatarUrl =
        user?.avatar &&
        user.avatar.trim() !== ""
            ? user.avatar
            : `https://api.dicebear.com/9.x/adventurer/svg?seed=${encodeURIComponent(
                  user?.fullName || "User"
              )}`;

    const today = new Date().toLocaleDateString(
        "en-GB",
        {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        }
    );

    return (

        <header className="mp-navbar">

            <div className="mp-navbar-left">

                <button
                    className="menu-toggle"
                    onClick={() =>
                        setSidebarOpen(true)
                    }
                >

                    <FaBars />

                </button>

                <Link
                    to="/"
                    className="brand-logo"
                >

                    <span className="brand-market">

                        Market

                    </span>

                    <span className="brand-pulse">

                        Pulse

                    </span>

                </Link>

            </div>

            <div className="navbar-center">

                <FaCalendarAlt />

                <span>

                    {today}

                </span>

            </div>

            <div className="mp-navbar-right">

                <div
                    className="profile-wrapper"
                    ref={dropdownRef}
                >

                    <button
                        className="profile"
                        onClick={() =>
                            setDropdownOpen(
                                !dropdownOpen
                            )
                        }
                    >

                        <img
                            src={avatarUrl}
                            alt={user?.fullName}
                            className="navbar-avatar"
                        />

                        <div className="profile-text">

                            <h6>

                                {

                                    user?.fullName
                                        ?.split(" ")[0] ||
                                    "User"

                                }

                            </h6>

                        </div>

                        <FaChevronDown
                            className={
                                dropdownOpen
                                    ? "dropdown-arrow rotate"
                                    : "dropdown-arrow"
                            }
                        />

                    </button>
                                        {

                        dropdownOpen && (

                            <div className="profile-dropdown">

                                <div className="mp-dropdown-header">

                                    <div className="dropdown-brand">

                                        <span className="brand-market">

                                            Market

                                        </span>

                                        <span className="brand-pulse">

                                            Pulse

                                        </span>

                                    </div>

                                    <div className="dropdown-user-info">

                                        <h5>

                                            {user?.fullName || "User"}

                                        </h5>

                                        <span>

                                            {user?.email || "No email"}

                                        </span>

                                        <div className="verified-badge">

                                            <FaCheckCircle />

                                            Active Account

                                        </div>

                                    </div>

                                </div>

                                <div className="mp-dropdown-divider"></div>

                                <Link
                                    to="/profile"
                                    className="mp-dropdown-item"
                                    onClick={closeDropdown}
                                >

                                    <FaUser />

                                    <span>

                                        My Profile

                                    </span>

                                </Link>

                                <div className="mp-dropdown-divider"></div>

                                <button
                                    type="button"
                                    className="mp-dropdown-item logout-btn"
                                    onClick={async () => {

                                        closeDropdown();

                                        await logout();

                                    }}
                                >

                                    <FaSignOutAlt />

                                    <span>

                                        Logout

                                    </span>

                                </button>

                            </div>

                        )

                    }

                </div>

            </div>

        </header>

    );

};

export default Navbar;