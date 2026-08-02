import React, { useState } from "react";
import "./CreateTicket.css";
import { FaChevronDown, FaEnvelope } from "react-icons/fa";

const faqs = [
  {
    question: "What is MarketPulse?",
    answer: "MarketPulse is a free, educational paper-trading platform. You can practice investing in stocks and crypto using simulated funds — no real money is ever involved.",
  },
  {
    question: "How do I create an account?",
    answer: "Click Sign Up, enter your name, email, and a password. No credit card or verification is required.",
  },
  {
    question: "I forgot my password. What do I do?",
    answer: "Use the 'Forgot Password?' link on the login page to reset it.",
  },
  {
    question: "Does MarketPulse use real money?",
    answer: "No. Every trade uses virtual funds. It's designed purely for learning and practice.",
  },
  {
    question: "What can I trade on MarketPulse?",
    answer: "You can trade stocks and cryptocurrencies. Prices are based on real, live market data.",
  },
  {
    question: "Is my account secure?",
    answer: "Yes. MarketPulse follows standard security practices to protect your account and data.",
  },
];

const CreateTicket = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="support-faq-section">
      <div className="container">
        <div className="support-faq-header">
          <span className="support-faq-eyebrow">Frequently Asked Questions</span>
          <h2 className="support-faq-title">Answers to common questions</h2>
        </div>

        <div className="support-faq-list">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div className={isOpen ? "support-faq-item open" : "support-faq-item"} key={index}>
                <button className="support-faq-question" onClick={() => toggleFaq(index)}>
                  <span>{faq.question}</span>
                  <FaChevronDown className="support-faq-icon" />
                </button>

                {isOpen && <p className="support-faq-answer">{faq.answer}</p>}
              </div>
            );
          })}
        </div>

        <div className="support-contact-card">
          <FaEnvelope className="support-contact-icon" />
          <h3>Still need help?</h3>
          <p>Can't find what you're looking for? Send us an email and we'll get back to you.</p>
          <a href="mailto:afifahmaduk@gmail.com" className="support-contact-btn">Email Support</a>
        </div>
      </div>
    </section>
  );
};

export default CreateTicket;