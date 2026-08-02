import React, { useMemo, useState } from "react";

import "./PerformanceChart.css";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { usePortfolio } from "../../context/PortfolioContext";

const PerformanceChart = () => {

  const { portfolio, loading } = usePortfolio();

  const [period, setPeriod] = useState("1Y");

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
      portfolio.totalAccountValue || 0;

    const investment =
      portfolio.totalInvestment || 0;

    const labels = {

      "1D": [
        "09",
        "11",
        "13",
        "15",
        "17",
        "19",
        "Now",
      ],

      "1W": [
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sun",
      ],

      "1M": [
        "W1",
        "W2",
        "W3",
        "W4",
      ],

      "1Y": [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],

      "ALL": [
        "2022",
        "2023",
        "2024",
        "2025",
        "2026",
      ],

    };

    const xLabels =
      labels[period];

    const startValue =
      investment > 0
        ? investment
        : current * 0.8;

    return xLabels.map(
      (label, index) => {

        const progress =
          index /
          (xLabels.length - 1);

        const random =
          Math.sin(index * 1.7) *
          current *
          0.015;

        const value =
          startValue +
          (current - startValue) *
            progress +
          random;

        return {

          label,

          value:
            index ===
            xLabels.length - 1
              ? current
              : Math.max(
                  value,
                  0
                ),

        };

      }
    );

  }, [portfolio, period]);

  const totalValue =
    portfolio.totalAccountValue || 0;

  const totalInvestment =
    portfolio.totalInvestment || 0;

  const profit =
    totalValue -
    totalInvestment;

  const profitPercent =
    totalInvestment > 0
      ? (
          (profit /
            totalInvestment) *
          100
        ).toFixed(2)
      : "0.00";
        return (

    <div className="performance-card">

      <div className="performance-header">

        <div>

          <span className="performance-subtitle">

            Portfolio Performance

          </span>

          {loading ? (

            <h2>

              Loading...

            </h2>

          ) : (

            <>

              <h2>

                {formatCurrency(totalValue)}

              </h2>

              <p
                style={{
                  color:
                    profit >= 0
                      ? "#16a34a"
                      : "#dc2626",
                }}
              >

                {profit >= 0 ? "▲" : "▼"}{" "}

                {formatCurrency(
                  Math.abs(profit)
                )}{" "}

                ({profit >= 0 ? "+" : ""}
                {profitPercent}%)

              </p>

            </>

          )}

        </div>

        <div className="chart-filter">

          {[
            "1D",
            "1W",
            "1M",
            "1Y",
            "ALL",
          ].map((item) => (

            <button
              key={item}
              className={
                period === item
                  ? "active"
                  : ""
              }
              onClick={() =>
                setPeriod(item)
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
            height: "330px",
          }}
        >

          Loading portfolio...

        </div>

      ) : totalValue === 0 ? (

        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{
            height: "330px",
          }}
        >

          <h4>

            No portfolio data

          </h4>

          <p className="text-muted">

            Buy your first stock or cryptocurrency to start tracking your portfolio performance.

          </p>

        </div>

      ) : (

        <div className="chart-box">

          <ResponsiveContainer
            width="100%"
            height={330}
          >

            <AreaChart
              data={chartData}
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
                    offset="5%"
                    stopColor="#2563eb"
                    stopOpacity={0.35}
                  />

                  <stop
                    offset="95%"
                    stopColor="#2563eb"
                    stopOpacity={0}
                  />

                </linearGradient>

              </defs>

              <CartesianGrid
                strokeDasharray="4 4"
                stroke="#eef2f7"
              />

              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
              />

              <YAxis
                tickFormatter={(value) =>
                  `$${Math.round(
                    value / 1000
                  )}k`
                }
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
                strokeWidth={4}
                fill="url(#portfolioGradient)"
              />

            </AreaChart>

          </ResponsiveContainer>

        </div>

      )}

    </div>

  );

};

export default PerformanceChart;