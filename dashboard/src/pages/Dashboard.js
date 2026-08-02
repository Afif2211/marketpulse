import React, { useState } from "react";
import "./Dashboard.css";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

import Welcome from "../components/dashboard/Welcome";
import PortfolioCards from "../components/dashboard/PortfolioCards";
import PerformanceChart from "../components/dashboard/PerformanceChart";
import Holdings from "../components/dashboard/Holdings";
import Watchlist from "../components/dashboard/Watchlist";
import MarketOverview from "../components/dashboard/MarketOverview";
import AiInsights from "../components/dashboard/AiInsights";
import News from "../components/dashboard/News";
import RecentActivity from "../components/dashboard/RecentActivity";

const Dashboard = () => {

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

            <main className="dashboard-content">

                <section className="dashboard-section">

                    <Welcome />

                </section>

                <section className="dashboard-section">

                    <PortfolioCards />

                </section>

                <section className="dashboard-section">

                    <div className="row g-4">

                        <div className="col-lg-8">

                            <PerformanceChart />

                        </div>

                        <div className="col-lg-4">

                            <Watchlist />

                        </div>

                    </div>

                </section>

                <section className="dashboard-section">

                    <Holdings />

                </section>

                <section className="dashboard-section">

                    <div className="row g-4">

                        <div className="col-lg-6">

                            <MarketOverview />

                        </div>

                        <div className="col-lg-6">

                            <AiInsights />

                        </div>

                    </div>

                </section>

                <section className="dashboard-section">

                    <News />

                </section>

                <section className="dashboard-section">

                    <RecentActivity />

                </section>

            </main>

        </div>

    );

};

export default Dashboard;