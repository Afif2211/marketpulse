const {
    getCryptoMarket,
} = require("../services/coinGeckoService");

const getCryptoOverview = async (req, res) => {
    try {
        const crypto = await getCryptoMarket();

        res.status(200).json({
            success: true,
            crypto,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch crypto data.",
        });
    }
};

module.exports = {
    getCryptoOverview,
};