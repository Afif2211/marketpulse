import React, { useEffect, useState } from "react";
import "./AiInsights.css";
import api from "../../services/Api";
import { FaRedo } from "react-icons/fa";

const AiInsights = () => {

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

    if (rec === "BUY") return "buy";
    if (rec === "SELL") return "sell";
    return "hold";

  };

  return (
    <div className="ai-card">

      <div className="ai-header">

        <div>

          <h2>🤖 AI Insights</h2>

          <p>AI-powered portfolio analysis</p>

        </div>

        <button
          className="ai-refresh-btn"
          onClick={handleRefresh}
          disabled={refreshing || loading}
          title="Refresh insights"
        >

          <FaRedo className={refreshing ? "spin" : ""} />

        </button>

      </div>

      {loading ? (

        <div className="ai-empty-state">

          Loading insights...

        </div>

      ) : error ? (

        <div className="ai-empty-state">

          <p>{error}</p>

        </div>

      ) : insights.length === 0 ? (

        <div className="ai-empty-state">

          <p>

            {summary || "Buy your first stock or cryptocurrency to get AI insights."}

          </p>

        </div>

      ) : (

        <>

          {summary && (

            <p className="ai-summary">

              {summary}

            </p>

          )}

          {insights.map((stock, index) => (

            <div className="ai-stock" key={index}>

              <div className="ai-top">

                <div>

                  <h4>{stock.companyName}</h4>

                  <span>{stock.symbol}</span>

                </div>

                <div className="ai-score">

                  {stock.score}

                </div>

              </div>

              <div className="ai-info">

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

              <p className="ai-description">

                {stock.description}

              </p>

            </div>

          ))}

          {generatedAt && (

            <p className="ai-timestamp">

              Last updated: {new Date(generatedAt).toLocaleString()}

            </p>

          )}

        </>

      )}

    </div>
  );
};

export default AiInsights;