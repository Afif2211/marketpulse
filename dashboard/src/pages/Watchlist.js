import React, { useState } from "react";
import "./Watchlist.css";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

import SearchFilter from "../components/watchlist/SearchFilter";
import WatchlistTable from "../components/watchlist/WatchlistTable";

const Watchlist = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleStockAdded = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

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

        <div className="watchlist-page">

          <SearchFilter
            onStockAdded={handleStockAdded}
          />

          <WatchlistTable
            refreshTrigger={refreshTrigger}
          />

        </div>

      </div>

    </div>
  );
};

export default Watchlist;