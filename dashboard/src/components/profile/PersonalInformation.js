import React from "react";
import "./PersonalInformation.css";

import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaGlobeEurope,
  FaCalendarAlt,
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";

const PersonalInformation = () => {

  const { user } = useAuth();

  if (!user) return null;

  const joinedDate = new Date(user.createdAt).toLocaleDateString(
    "en-GB",
    {
      month: "long",
      year: "numeric",
    }
  );

  const details = [
    {
      icon: <FaUser />,
      label: "Full Name",
      value: user.fullName,
    },
    {
      icon: <FaEnvelope />,
      label: "Email Address",
      value: user.email,
    },
    {
      icon: <FaPhone />,
      label: "Phone Number",
      value:
        user.phone && user.phone.trim() !== ""
          ? user.phone
          : "Not Added",
    },
    {
      icon: <FaGlobeEurope />,
      label: "Country",
      value:
        user.country && user.country.trim() !== ""
          ? user.country
          : "Not Added",
    },
    {
      icon: <FaCalendarAlt />,
      label: "Member Since",
      value: joinedDate,
    },
  ];

  return (

    <div className="personal-information-card">

      <div className="section-header">

        <h3>Personal Information</h3>

      </div>

      <div className="information-grid">

        {details.map((item, index) => (

          <div
            className="information-item"
            key={index}
          >

            <div className="information-icon">

              {item.icon}

            </div>

            <div className="information-content">

              <span>{item.label}</span>

              <h5>{item.value}</h5>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

};

export default PersonalInformation;