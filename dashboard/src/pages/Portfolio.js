import React, { useState } from "react";
import "./Portfolio.css";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

import PortfolioSummary from "../components/portfolio/PortfolioSummary";
import AssetAllocation from "../components/portfolio/AssetAllocation";
import PortfolioChart from "../components/portfolio/PortfolioChart";
import HoldingsTable from "../components/portfolio/HoldingsTable";
import Transactions from "../components/portfolio/Transactions";

const Portfolio = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Navbar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="portfolio-page">

        <div className="portfolio-header">

          <h1>Portfolio</h1>

          <p>Track, manage and analyze your investments.</p>

        </div>

        <div className="portfolio-section">
          <PortfolioSummary />
        </div>

        <div className="row g-4 portfolio-section">

          <div className="col-lg-5">
            <AssetAllocation />
          </div>

          <div className="col-lg-7">
            <PortfolioChart />
          </div>

        </div>

        <div className="portfolio-section">
          <HoldingsTable />
        </div>

        <div className="portfolio-section">
          <Transactions />
        </div>

      </div>
    </>
  );
};

export default Portfolio;