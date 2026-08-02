const finnhub = require("../services/finnhubService");

// Search Stocks
const searchStocks = async (req, res) => {
    try {
        const { q } = req.query;

        if (!q) {
            return res.status(400).json({
                success: false,
                message: "Search query is required",
            });
        }

        const stocks = await finnhub.searchStocks(q);

        res.status(200).json({
            success: true,
            stocks,
        });

    } catch (error) {
    console.log("========== FINNHUB ERROR ==========");
    console.log("Message:", error.message);
    console.log("Status:", error.response?.status);
    console.log("Data:", error.response?.data);
    console.log("Request URL:", error.config?.url);
    console.log("Request Params:", error.config?.params);
    console.log("===================================");

    res.status(500).json({
        success: false,
        message: error.message,
    });
}
};

// Get Live Quote
const getQuote = async (req, res) => {
    try {
        const quote = await finnhub.getQuote(req.params.symbol);

        res.status(200).json({
            success: true,
            quote,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Company Profile
const getCompanyProfile = async (req, res) => {
    try {
        const profile = await finnhub.getCompanyProfile(req.params.symbol);

        res.status(200).json({
            success: true,
            profile,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Market News
const getMarketNews = async (req, res) => {
    try {
        const news = await finnhub.getMarketNews();

        res.status(200).json({
            success: true,
            news,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getMarketOverview = async (req, res) => {

    try {

        const stocks = await finnhub.getMarketOverview();

        res.status(200).json({
            success: true,
            stocks,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

module.exports = {
    searchStocks,
    getQuote,
    getCompanyProfile,
    getMarketNews,
    getMarketOverview,
};