import React from "react";
import "./Sidebar.css";

import { NavLink } from "react-router-dom";

import {
    FaChartLine,
    FaWallet,
    FaBookmark,
    FaChartPie,
    FaBrain,
    FaNewspaper,
    FaTimes,
} from "react-icons/fa";

const Sidebar = ({
    isOpen = false,
    onClose = () => {},
}) => {

    const menu = [

        {
            title: "Dashboard",
            icon: <FaChartLine />,
            path: "/",
        },

        {
            title: "Portfolio",
            icon: <FaWallet />,
            path: "/portfolio",
        },

        {
            title: "Watchlist",
            icon: <FaBookmark />,
            path: "/watchlist",
        },

        {
            title: "Markets",
            icon: <FaChartPie />,
            path: "/markets",
        },

        {
            title: "AI Insights",
            icon: <FaBrain />,
            path: "/ai",
        },

        {
            title: "News",
            icon: <FaNewspaper />,
            path: "/news",
        },

    ];

    return (

        <>

            {

                isOpen && (

                    <div
                        className="sidebar-overlay"
                        onClick={onClose}
                    />

                )

            }

            <aside
                className={`sidebar ${
                    isOpen
                        ? "sidebar-open"
                        : ""
                }`}
            >

                <div>

                    <div className="sidebar-mobile-header">

                        <h3>

                            Navigation

                        </h3>

                        <button
                            className="sidebar-close-btn"
                            onClick={onClose}
                        >

                            <FaTimes />

                        </button>

                    </div>

                    <p className="sidebar-title">

                        NAVIGATION

                    </p>

                    <div className="sidebar-menu">

                        {

                            menu.map((item) => (

                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    end={item.path === "/"}
                                    onClick={onClose}
                                    className={({ isActive }) =>
                                        `menu-item ${
                                            isActive
                                                ? "active-menu"
                                                : ""
                                        }`
                                    }
                                >

                                    <span className="menu-icon">

                                        {item.icon}

                                    </span>

                                    <span className="menu-text">

                                        {item.title}

                                    </span>

                                </NavLink>

                            ))

                        }

                    </div>

                </div>

            </aside>

        </>

    );

};

export default Sidebar;