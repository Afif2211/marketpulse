import React, {
  useMemo,
  useState,
} from "react";

import "./PortfolioChart.css";

import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  Tooltip,
} from "recharts";

import { usePortfolio } from "../../context/PortfolioContext";

const PortfolioChart = () => {

  const [range, setRange] =
    useState("1Y");

  const { portfolio, loading } = usePortfolio();

  const formatCurrency = (value) =>
    Number(value || 0).toLocaleString(
      "en-US",
      {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 2,
      }
    );

  const chartData = useMemo(() => {

    const current =
      portfolio.portfolioValue || 0;

    const investment =
      portfolio.totalInvestment || 0;

    const ranges = {

      "1D": [
        "9 AM",
        "11 AM",
        "1 PM",
        "3 PM",
        "5 PM",
      ],

      "1W": [
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
      ],

      "1M": [
        "W1",
        "W2",
        "W3",
        "W4",
      ],

      "1Y": [
        "Jan",
        "Mar",
        "May",
        "Jul",
        "Sep",
        "Nov",
        "Now",
      ],

      "ALL": [
        "2022",
        "2023",
        "2024",
        "2025",
        "2026",
      ],

    };

    const generatedData = {};

    Object.entries(ranges).forEach(
      ([key, labels]) => {

        const startValue =
          investment > 0
            ? investment
            : current * 0.8;

        generatedData[key] =
          labels.map(
            (label, index) => {

              const progress =
                index /
                (labels.length - 1);

              const random =
                Math.sin(index * 1.7) *
                current *
                0.015;

              const value =
                startValue +
                (current -
                  startValue) *
                  progress +
                random;

              return {

                name: label,

                value:
                  index ===
                  labels.length - 1
                    ? current
                    : Math.max(
                        value,
                        0
                      ),

              };

            }
          );

      }
    );

    return generatedData;

  }, [portfolio]);

  const currentValue =
    portfolio.portfolioValue || 0;

  const totalReturn =
    portfolio.totalProfitLossPercentage || 0;
      return (

    <div className="portfolio-perf-card">

      <div className="portfolio-perf-header">

        <div>

          <h2>

            Portfolio Performance

          </h2>

          <p>

            Track portfolio growth over time

          </p>

        </div>

        <div className="portfolio-perf-filters">

          {Object.keys(chartData).map((item) => (

            <button
              key={item}
              onClick={() =>
                setRange(item)
              }
              className={
                range === item
                  ? "portfolio-active-filter"
                  : ""
              }
            >

              {item}

            </button>

          ))}

        </div>

      </div>

      {loading ? (

        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            height: "350px",
          }}
        >

          Loading portfolio...

        </div>

      ) : currentValue === 0 ? (

        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{
            height: "350px",
          }}
        >

          <h4>

            No portfolio data

          </h4>

          <p className="text-muted">

            Buy your first stock or cryptocurrency to view your portfolio performance.

          </p>

        </div>

      ) : (

        <>

          <div className="portfolio-perf-summary">

            <div>

              <span>

                Current Value

              </span>

              <h3>

                {formatCurrency(
                  currentValue
                )}

              </h3>

            </div>

            <div>

              <span>

                Total Return

              </span>

              <h4
                style={{
                  color:
                    totalReturn >= 0
                      ? "#16a34a"
                      : "#dc2626",
                }}
              >

                {totalReturn >= 0
                  ? "+"
                  : ""}
                {totalReturn.toFixed(
                  2
                )}
                %

              </h4>

            </div>

          </div>

          <ResponsiveContainer
            width="100%"
            height={310}
          >

            <AreaChart
              data={
                chartData[
                  range
                ]
              }
            >

              <defs>

                <linearGradient
                  id="portfolioGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >

                  <stop
                    offset="0%"
                    stopColor="#2563eb"
                    stopOpacity={0.45}
                  />

                  <stop
                    offset="100%"
                    stopColor="#2563eb"
                    stopOpacity={0}
                  />

                </linearGradient>

              </defs>

              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
              />

              <Tooltip
                formatter={(value) =>
                  formatCurrency(
                    value
                  )
                }
              />

              <Area
                type="monotone"
                dataKey="value"
                stroke="#2563eb"
                strokeWidth={3}
                fill="url(#portfolioGradient)"
              />

            </AreaChart>

          </ResponsiveContainer>

        </>

      )}

    </div>

  );

};

export default PortfolioChart;