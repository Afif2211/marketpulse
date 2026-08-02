import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import HomePage from "./landing_page/home/HomePage";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import ProductPage from './landing_page/products/ProductPage';
import PricingPage from './landing_page/pricing/PricingPage';
import AboutPage from './landing_page/about/AboutPage'
import SupportPage from './landing_page/support/SupportPage'
import Signup from './landing_page/signup/Signup'
import Navbar from './landing_page/Navbar';
import Footer from './landing_page/Footer';
import NotFound from './landing_page/NotFound';
import Login from "./landing_page/login/Login";
import ForgotPassword from "./landing_page/login/ForgotPassword";
import ResetPassword from "./landing_page/login/ResetPassword";
import { ThemeProvider } from "./context/ThemeContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
  <ThemeProvider>
  <BrowserRouter >
  <Navbar />
    <Routes> 
      <Route path = "/" element = {<HomePage />} />
      <Route path = "/products" element = {<ProductPage />} /> 
      <Route path = "/pricing" element = {<PricingPage />} /> 
      <Route path = "/about" element = {<AboutPage />} />
      <Route path = "/support" element = {<SupportPage />} />
      <Route path = "/signup" element = {<Signup />} />
      <Route path = "*" element = {<NotFound />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
    </Routes>
  <Footer />
  </BrowserRouter>
  </ThemeProvider>
  </GoogleOAuthProvider>
);