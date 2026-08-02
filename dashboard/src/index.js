import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './theme.css';
import { AuthProvider } from "./context/AuthContext";
import { PortfolioProvider } from "./context/PortfolioContext";
import { MarketDataProvider } from "./context/MarketDataContext";

const params = new URLSearchParams(window.location.search);

const tokenFromUrl = params.get("token");

if (tokenFromUrl) {

    localStorage.setItem("token", tokenFromUrl);

    params.delete("token");

    const cleanedSearch = params.toString();

    const newUrl =
        window.location.pathname +
        (cleanedSearch ? `?${cleanedSearch}` : "") +
        window.location.hash;

    window.history.replaceState({}, "", newUrl);

}

const root = ReactDOM.createRoot(
    document.getElementById("root")
);

root.render(
    <React.StrictMode>
            <AuthProvider>
                <PortfolioProvider>
                    <MarketDataProvider>
                        <App />
                    </MarketDataProvider>
                </PortfolioProvider>
            </AuthProvider>       
    </React.StrictMode>
);