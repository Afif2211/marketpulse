import React from "react";
import "./QuickActions.css";

import {
    FaUserEdit,
    FaLock,
    FaSignOutAlt,
    FaChevronRight,
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";

const QuickActions = ({
    onEdit,
    onPassword,
}) => {

    const { logout } = useAuth();

    const actions = [
        {
            id: 1,
            title: "Edit Profile",
            description: "Update your personal information.",
            icon: <FaUserEdit />,
            danger: false,
            onClick: onEdit,
        },
        {
            id: 2,
            title: "Change Password",
            description: "Update your account password.",
            icon: <FaLock />,
            danger: false,
            onClick: onPassword,
        },
        {
            id: 3,
            title: "Logout",
            description: "Sign out of your account.",
            icon: <FaSignOutAlt />,
            danger: true,
            onClick: logout,
        },
    ];

    return (

        <div className="quick-actions-container">

            <div className="section-header">

                <h3>Quick Actions</h3>

            </div>

            <div className="actions-list">

                {actions.map((action) => (

                    <div
                        key={action.id}
                        className={`action-row ${
                            action.danger ? "danger" : ""
                        }`}
                        onClick={action.onClick}
                        style={{ cursor: "pointer" }}
                    >

                        <div className="action-left">

                            <div
                                className={`action-icon ${
                                    action.danger
                                        ? "danger-icon"
                                        : ""
                                }`}
                            >

                                {action.icon}

                            </div>

                            <div>

                                <h5>{action.title}</h5>

                                <p>{action.description}</p>

                            </div>

                        </div>

                        <FaChevronRight className="action-arrow" />

                    </div>

                ))}

            </div>

        </div>

    );

};

export default QuickActions;