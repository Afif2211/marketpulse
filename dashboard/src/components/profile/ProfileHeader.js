import React from "react";
import "./ProfileHeader.css";

import {
  FaCheckCircle,
  FaPen,
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";

const ProfileHeader = ({ onEdit }) => {

  const { user } = useAuth();

  if (!user) return null;

  const avatarUrl =
    user.avatar && user.avatar.trim() !== ""
      ? user.avatar
      : `https://api.dicebear.com/9.x/adventurer/svg?seed=${encodeURIComponent(
          user.fullName
        )}`;

  return (

    <div className="profile-header">

      <div className="profile-header-left">

        <div className="profile-avatar-wrapper">

          <img
            src={avatarUrl}
            alt={user.fullName}
            className="profile-avatar"
          />

        </div>

        <div className="profile-user-info">

          <div className="profile-name-row">

            <h2>{user.fullName}</h2>

            <span className="active-badge">

              <FaCheckCircle />

              Active

            </span>

          </div>

          <p>{user.email}</p>

        </div>

      </div>

      <button
        className="edit-profile-btn"
        onClick={onEdit}
      >

        <FaPen />

        Edit Profile

      </button>

    </div>

  );

};

export default ProfileHeader;