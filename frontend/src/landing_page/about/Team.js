import React from "react";
import "./Team.css";
import { FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const skills = ["React", "Node.js", "MongoDB"];

function Team() {
  return (
    <section className="team-section">
      <div className="container">
        <div className="team-header">
          <h2 className="team-title">Meet the Developer</h2>
          <p className="team-subtitle">
            Passionate about building modern web applications and creating intuitive financial products that make investing smarter and more accessible.
          </p>
        </div>

        <div className="row align-items-center gy-5">
          <div className="col-lg-5 team-profile-col">
            <img src="media/images/profile.png" alt="Afif Ahmad" className="team-photo" />

            <h3 className="team-name">Afif Ahmad</h3>
            <h5 className="team-role">Founder & Full Stack Developer</h5>

            <p className="team-location">
              <FaMapMarkerAlt />
              Liverpool, United Kingdom
            </p>

            <div className="team-skills">
              {skills.map((skill, index) => (
                <span className="team-skill-badge" key={index}>{skill}</span>
              ))}
            </div>
          </div>

          <div className="col-lg-7 team-bio-col">
            <p>
              I'm a Full Stack MERN Developer passionate about creating scalable, user-friendly applications with modern web technologies. MarketPulse represents my vision of making investing simpler through clean design and powerful tools.
            </p>

            <p>
              I enjoy turning ideas into real products using React, Node.js, Express, and MongoDB. Every project I build focuses on performance, simplicity, and delivering a great user experience.
            </p>

            <div className="team-social">
              <a href="https://github.com/Afif2211" target="_blank" rel="noreferrer" className="team-social-btn">
                <FaGithub size={20} />
              </a>

              <a href="https://linkedin.com/in/theafifkhan" target="_blank" rel="noreferrer" className="team-social-btn">
                <FaLinkedin size={20} />
              </a>

              <a href="mailto:afifahmaduk@gmail.com" className="team-social-btn">
                <FaEnvelope size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Team;