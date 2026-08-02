import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './theme.css';
import { AuthProvider } from "./context/AuthContext";
import { PortfolioProvider } from "./context/PortfolioContext";
import { MarketDataProvider } from "./context/MarketDataContext";
import { ThemeProvider } from "./context/ThemeContext";

const root = ReactDOM.createRoot(
    document.getElementById("root")
);

root.render(
    <React.StrictMode>
        <ThemeProvider>
            <AuthProvider>
                <PortfolioProvider>
                    <MarketDataProvider>
                        <App />
                    </MarketDataProvider>
                </PortfolioProvider>
            </AuthProvider>
        </ThemeProvider>
    </React.StrictMode>
);