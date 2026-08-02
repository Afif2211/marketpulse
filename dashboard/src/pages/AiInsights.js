import React, { useEffect, useState } from "react";
import "./AiInsights.css";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

import api from "../services/Api";
import { FaRedo } from "react-icons/fa";

const AiInsightsPage = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [summary, setSummary] = useState("");
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [generatedAt, setGeneratedAt] = useState(null);

  const loadInsights = async () => {

    try {

      setLoading(true);
      setError("");

      const result = await api.getAiInsights();

      if (result.ok && result.data.success) {

        setSummary(result.data.summary);
        setInsights(result.data.insights || []);
        setGeneratedAt(result.data.generatedAt);

      } else {

        setError(result.data.message || "Unable to load insights.");

      }

    } catch (err) {

      setError("Something went wrong.");

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    loadInsights();

  }, []);

  const handleRefresh = async () => {

    try {

      setRefreshing(true);
      setError("");

      const result = await api.refreshAiInsights();

      if (result.ok && result.data.success) {

        setSummary(result.data.summary);
        setInsights(result.data.insights || []);
        setGeneratedAt(result.data.generatedAt);

      } else {

        setError(result.data.message || "Unable to refresh insights.");

      }

    } catch (err) {

      setError("Something went wrong.");

    } finally {

      setRefreshing(false);

    }

  };

  const recClass = (rec) => {

    if (rec === "BUY") return "insights-buy";
    if (rec === "SELL") return "insights-sell";
    return "insights-hold";

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

        <div className="insights-page">

          <div className="insights-page-header">

            <div>

              <h1>🤖 AI Insights</h1>

              <p>AI-powered analysis of your portfolio holdings</p>

            </div>

            <button
              className="insights-refresh-btn"
              onClick={handleRefresh}
              disabled={refreshing || loading}
            >

              <FaRedo className={refreshing ? "insights-spin" : ""} />

              {refreshing ? "Refreshing..." : "Refresh"}

            </button>

          </div>

          {loading ? (

            <div className="insights-empty-state">

              Loading insights...

            </div>

          ) : error ? (

            <div className="insights-empty-state">

              <p>{error}</p>

            </div>

          ) : (

            <>

              <div className="insights-summary-card">

                <p>

                  {summary || "Buy your first stock or cryptocurrency to get AI insights."}

                </p>

                {generatedAt && (

                  <span className="insights-timestamp">

                    Last updated: {new Date(generatedAt).toLocaleString()}

                  </span>

                )}

              </div>

              {insights.length > 0 && (

                <div className="insights-grid">

                  {insights.map((stock, index) => (

                    <div className="insights-card" key={index}>

                      <div className="insights-card-top">

                        <div>

                          <h4>{stock.companyName}</h4>

                          <span>{stock.symbol}</span>

                        </div>

                        <div className="insights-score">

                          {stock.score}

                        </div>

                      </div>

                      <div className="insights-info">

                        <div>

                          <small>Recommendation</small>

                          <strong className={recClass(stock.recommendation)}>

                            {stock.recommendation}

                          </strong>

                        </div>

                        <div>

                          <small>Confidence</small>

                          <strong>

                            {stock.confidence}

                          </strong>

                        </div>

                      </div>

                      <p className="insights-description">

                        {stock.description}

                      </p>

                    </div>

                  ))}

                </div>

              )}

            </>

          )}

        </div>

      </div>

    </div>
  );
};

export default AiInsightsPage;