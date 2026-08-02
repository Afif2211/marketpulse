import React, { useState } from "react";
import "./Profile.css";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

import ProfileHeader from "../components/profile/ProfileHeader";
import PersonalInformation from "../components/profile/PersonalInformation";
import QuickActions from "../components/profile/QuickActions";

import EditProfileModal from "../components/profile/EditProfileModal";
import ChangePasswordModal from "../components/profile/ChangePasswordModal";

const Profile = () => {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [showEditModal, setShowEditModal] = useState(false);

    const [showPasswordModal, setShowPasswordModal] = useState(false);

    return (

        <div className="dashboard">

            <Navbar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            <div className="dashboard-content">

                <div className="profile-page">

                    <ProfileHeader
                        onEdit={() => setShowEditModal(true)}
                    />

                    <PersonalInformation />

                    <QuickActions
                        onEdit={() => setShowEditModal(true)}
                        onPassword={() => setShowPasswordModal(true)}
                    />

                </div>

            </div>

            <EditProfileModal
                isOpen={showEditModal}
                onClose={() => setShowEditModal(false)}
            />

            <ChangePasswordModal
                isOpen={showPasswordModal}
                onClose={() => setShowPasswordModal(false)}
            />

        </div>

    );

};

export default Profile;