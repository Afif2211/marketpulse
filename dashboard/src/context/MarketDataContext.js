import React, {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import api from "../services/Api";

const MarketDataContext = createContext();

export const MarketDataProvider = ({ children }) => {

    const [stocks, setStocks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMarketData();
    }, []);

    const fetchMarketData = async () => {

        try {

            const result = await api.getMarketOverview();

            if (result.ok && result.data.success) {
                setStocks(result.data.stocks);
            }

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }

    };

    return (
        <MarketDataContext.Provider
            value={{
                stocks,
                loading,
            }}
        >
            {children}
        </MarketDataContext.Provider>
    );

};

export const useMarketData = () => useContext(MarketDataContext);