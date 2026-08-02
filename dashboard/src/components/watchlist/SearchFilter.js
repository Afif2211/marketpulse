import React, { useEffect, useRef, useState } from "react";
import "./SearchFilter.css";

import { FaSearch } from "react-icons/fa";
import api from "../../services/Api";

const SearchFilter = ({ onStockAdded }) => {

    const [searchTerm, setSearchTerm] = useState("");

    const [searchResults, setSearchResults] = useState([]);

    const [loading, setLoading] = useState(false);

    const [showDropdown, setShowDropdown] = useState(false);

    const [message, setMessage] = useState("");

    const [messageType, setMessageType] = useState("");

    const dropdownRef = useRef(null);

    const debounceRef = useRef(null);

    useEffect(() => {

        const handleClickOutside = (event) => {

            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setShowDropdown(false);
            }

        };

        document.addEventListener("mousedown", handleClickOutside);

        return () =>
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );

    }, []);

    useEffect(() => {

        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        if (!searchTerm.trim()) {

            setSearchResults([]);
            setShowDropdown(false);

            return;

        }

        debounceRef.current = setTimeout(async () => {

            try {

                setLoading(true);

                const response = await api.searchStocks(searchTerm);

                if (response.ok) {

                    const stocks = response.data.stocks.result
                        .filter((stock) => {

                            return (

                                stock.symbol &&
                                stock.description &&
                                stock.type === "Common Stock" &&
                                stock.symbol === stock.displaySymbol &&
                                !stock.symbol.includes(".") &&
                                /^[A-Z]{1,5}$/.test(stock.symbol)

                            );

                        })
                        .slice(0, 10);

                    setSearchResults(stocks);

                    setShowDropdown(true);

                }

            } catch (error) {

                console.error(error);

            } finally {

                setLoading(false);

            }

        }, 500);

        return () => clearTimeout(debounceRef.current);

    }, [searchTerm]);

    const handleAddStock = async (stock) => {

        try {

            const response = await api.addToWatchlist({

                symbol: stock.symbol,

                companyName: stock.description,

            });

            if (response.ok) {

                setMessage("Stock added successfully.");

                setMessageType("success");

                setSearchTerm("");

                setSearchResults([]);

                setShowDropdown(false);

                if (onStockAdded) {
                    onStockAdded();
                }

            } else {

                setMessage(
                    response.data.message ||
                    "Unable to add stock."
                );

                setMessageType("error");

            }

        } catch (error) {

            console.error(error);

            setMessage("Something went wrong.");

            setMessageType("error");

        }

        setTimeout(() => {

            setMessage("");

            setMessageType("");

        }, 3000);

    };

    return (
        <div className="search-filter-card">

            <div className="search-filter-top">

                <div
                    className="watchlist-search"
                    ref={dropdownRef}
                >

                    <FaSearch className="watchlist-search-icon" />

                    <input
                        type="text"
                        placeholder="Search stocks..."
                        value={searchTerm}
                        onChange={(e) =>
                            setSearchTerm(e.target.value)
                        }
                    />

                    {showDropdown && (
                        <div className="search-dropdown">

                            {loading ? (

                                <div className="search-item">
                                    Searching...
                                </div>

                            ) : searchResults.length === 0 ? (

                                <div className="search-item">
                                    No stocks found.
                                </div>

                            ) : (

                                searchResults.map((stock) => (

                                    <div
                                        key={stock.symbol}
                                        className="search-item"
                                    >

                                        <div className="search-stock-info">

                                            <strong>
                                                {stock.description}
                                            </strong>

                                            <span>
                                                {stock.symbol}
                                            </span>

                                        </div>

                                        <button
                                            className="add-stock-search-btn"
                                            onClick={() =>
                                                handleAddStock(stock)
                                            }
                                        >
                                            Add
                                        </button>

                                    </div>

                                ))

                            )}

                        </div>
                    )}

                </div>

            </div>

            {message && (

                <div
                    className={
                        messageType === "success"
                            ? "watchlist-success"
                            : "watchlist-error"
                    }
                >
                    {message}
                </div>

            )}

        </div>
    );

};

export default SearchFilter;