import React, { useState } from "react";
import "./Markets.css";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

import MarketsHeader from "../components/markets/MarketsHeader";
import MarketsOverviewCards from "../components/markets/MarketsOverviewCards";
import MarketIndices from "../components/markets/MarketIndices";
import TopMovers from "../components/markets/TopMovers";
import SectorPerformance from "../components/markets/SectorPerformance";
import CryptoOverview from "../components/markets/CryptoOverview";

const Markets = () => {

    const [sidebarOpen, setSidebarOpen] = useState(false);

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

                <div className="markets-page">

                    <MarketsHeader />

                    <MarketsOverviewCards />

                    <MarketIndices />

                    <TopMovers />

                    <SectorPerformance />

                    <CryptoOverview />

                </div>

            </div>

        </div>
    );
};

export default Markets;