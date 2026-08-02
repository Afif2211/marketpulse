import React, { useEffect, useMemo, useState } from "react";
import "./TransactionHistory.css";

import {
    FaArrowTrendUp,
    FaArrowTrendDown,
} from "react-icons/fa6";

import api from "../services/Api";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const TransactionHistory = () => {
    const navigate = useNavigate();

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("ALL");

    const formatCurrency = (value) =>
        Number(value).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
        });

    const formatDate = (date) =>
        new Date(date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });

    const loadTransactions = async () => {

        try {

            setLoading(true);

            const result = await api.getTransactions();

            if (result.ok && result.data.success) {

                setTransactions(result.data.transactions);

            }

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadTransactions();

    }, []);

    const filteredTransactions = useMemo(() => {

        return transactions.filter((item) => {

            const matchesSearch =
                item.companyName
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                item.symbol
                    .toLowerCase()
                    .includes(search.toLowerCase());

            const matchesFilter =
                filter === "ALL" || item.type === filter;

            return matchesSearch && matchesFilter;

        });

    }, [transactions, search, filter]);

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

            <div className="portfolio-header history-page-header">

                <div>

                    <h1>Transaction History</h1>

                    <p>
                        View your complete trading activity.
                    </p>

                </div>

                <button
                    className="back-btn"
                    onClick={() => navigate("/portfolio")}
                >

                    <FaArrowLeft />

                    Back to Portfolio

                </button>

            </div>

            <div className="transaction-history-container">

                <div className="history-controls">

                    <input
                        type="text"
                        placeholder="Search company or symbol..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                    <select
                        value={filter}
                        onChange={(e) =>
                            setFilter(e.target.value)
                        }
                    >

                        <option value="ALL">
                            All Transactions
                        </option>

                        <option value="BUY">
                            Buy Orders
                        </option>

                        <option value="SELL">
                            Sell Orders
                        </option>

                    </select>

                </div>

                {loading ? (

                    <div className="history-empty">

                        Loading...

                    </div>

                ) : filteredTransactions.length === 0 ? (

                    <div className="history-empty">

                        No transactions found.

                    </div>

                ) : (

                    filteredTransactions.map((item) => {

                        const isBuy =
                            item.type === "BUY";

                        return (

                            <div
                                className="transaction-row"
                                key={item._id}
                            >

                                <div className="transaction-left">

                                    <div
                                        className={
                                            isBuy
                                                ? "transaction-icon txn-buy"
                                                : "transaction-icon txn-sell"
                                        }
                                    >

                                        {isBuy ? (
                                            <FaArrowTrendUp />
                                        ) : (
                                            <FaArrowTrendDown />
                                        )}

                                    </div>

                                    <div className="transaction-company">

                                        <h5>
                                            {item.companyName}
                                        </h5>

                                        <span>
                                            {item.symbol}
                                        </span>

                                    </div>

                                </div>

                                <div className="transaction-info">

                                    <div>

                                        <small>Type</small>

                                        <strong>
                                            {item.type}
                                        </strong>

                                    </div>

                                    <div>

                                        <small>Quantity</small>

                                        <strong>
                                            {item.shares} Shares
                                        </strong>

                                    </div>

                                    <div>

                                        <small>Amount</small>

                                        <strong>
                                            {formatCurrency(item.totalAmount)}
                                        </strong>

                                    </div>

                                    <div>

                                        <small>Date</small>

                                        <strong>
                                            {formatDate(item.createdAt)}
                                        </strong>

                                    </div>

                                    <div>

                                        <small>Status</small>

                                        <span className="status-badge">

                                            Completed

                                        </span>

                                    </div>

                                </div>

                            </div>

                        );

                    })

                )}

            </div>

        </div>

    </>
);

};

export default TransactionHistory;