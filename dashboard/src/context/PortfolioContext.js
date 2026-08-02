import {
    createContext,
    useContext,
    useState,
    useCallback,
    useEffect,
} from "react";

import api from "../services/Api";

const PortfolioContext = createContext();

const emptyPortfolio = {
    portfolioValue: 0,
    walletBalance: 0,
    totalInvestment: 0,
    totalAccountValue: 0,
    totalProfitLoss: 0,
    totalProfitLossPercentage: 0,
    holdings: [],
};

export const PortfolioProvider = ({ children }) => {

    const [portfolio, setPortfolio] = useState(emptyPortfolio);

    const [loading, setLoading] = useState(true);

    const refreshPortfolio = useCallback(async () => {

        try {

            setLoading(true);

            const result = await api.getPortfolio();

            if (result.ok && result.data.success) {

                setPortfolio(result.data);

            }

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    }, []);

    useEffect(() => {

        refreshPortfolio();

    }, [refreshPortfolio]);

    return (

        <PortfolioContext.Provider
            value={{
                portfolio,
                loading,
                refreshPortfolio,
            }}
        >
            {children}
        </PortfolioContext.Provider>

    );

};

export const usePortfolio = () => useContext(PortfolioContext);