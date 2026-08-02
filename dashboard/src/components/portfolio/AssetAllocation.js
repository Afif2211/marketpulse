import React, { useMemo } from "react";
import "./AssetAllocation.css";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

import { usePortfolio } from "../../context/PortfolioContext";

const COLORS = [
  "#2563eb",
  "#16a34a",
  "#f59e0b",
  "#9333ea",
  "#dc2626",
  "#0ea5e9",
  "#f97316",
  "#7c3aed",
];

const AssetAllocation = () => {

  const { portfolio } = usePortfolio();

  const formatCurrency = (value) =>
    Number(value).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });

  const allocationData = useMemo(() => {

    const {
      holdings,
      walletBalance,
      totalAccountValue,
    } = portfolio;

    const assets = [];

    holdings.forEach((holding, index) => {

      assets.push({

        name: holding.companyName,

        value:
        totalAccountValue > 0
        ? Number(
          ((holding.currentValue / totalAccountValue) * 100 ).toFixed(1)
        ): 0,

        color:
          COLORS[index % COLORS.length],

      });

    });

    assets.push({

      name: "Cash",

      value:
      totalAccountValue > 0
      ? Number((
          (walletBalance / totalAccountValue) * 100
        ).toFixed(1)
      ): 0,

      color:
        COLORS[holdings.length % COLORS.length],

    });

    return assets;

  }, [portfolio]);

  const totalValue = portfolio.totalAccountValue || 0;

  return (

    <div className="allocation-card">

      <div className="allocation-header">

        <div>

          <h2>Asset Allocation</h2>

          <p>Portfolio distribution</p>

        </div>

      </div>

      <div className="allocation-chart">
                <ResponsiveContainer
          width="100%"
          height={260}
        >

          <PieChart>

            <Pie
              data={allocationData}
              dataKey="value"
              innerRadius={70}
              outerRadius={95}
              paddingAngle={4}
            >

              {allocationData.map((entry, index) => (

                <Cell
                  key={index}
                  fill={entry.color}
                />

              ))}

            </Pie>

          </PieChart>

        </ResponsiveContainer>

        <div className="chart-center">

          <h3>

            {formatCurrency(totalValue)}

          </h3>

          <span>Total</span>

        </div>

      </div>

      <div className="allocation-list">

        {allocationData.map((item, index) => (

          <div
            key={index}
            className="allocation-item"
          >

            <div className="allocation-left">

              <span
                className="allocation-dot"
                style={{
                  background: item.color,
                }}
              ></span>

              <span>

                {item.name}

              </span>

            </div>

            <strong>

              {item.value}%

            </strong>

          </div>

        ))}

        </div>

    </div>

  );
};

export default AssetAllocation;