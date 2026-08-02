const axios = require("axios");

const COINGECKO_URL =
    "https://api.coingecko.com/api/v3/coins/markets";

// Cache market data for 60 seconds
const CACHE_DURATION = 60 * 1000;

let cachedMarket = null;
let lastFetched = 0;

const fetchMarketFromAPI = async () => {

    const response = await axios.get(COINGECKO_URL, {
        params: {
            vs_currency: "usd",
            order: "market_cap_desc",
            per_page: 100,
            page: 1,
            sparkline: false,
        },
    });

    cachedMarket = response.data;
    lastFetched = Date.now();

    return cachedMarket;
};

const getCryptoMarket = async () => {

    const now = Date.now();

    if (
        cachedMarket &&
        now - lastFetched < CACHE_DURATION
    ) {
        return cachedMarket;
    }

    try {

        return await fetchMarketFromAPI();

    } catch (err) {

        // If CoinGecko rate limits us but we still have cached data,
        // continue using the cached prices instead of failing.
        if (cachedMarket) {
            console.log(
                "CoinGecko rate limited. Using cached market data."
            );
            return cachedMarket;
        }

        throw err;
    }
};

const getCryptoBySymbol = async (symbol) => {

    if (!symbol) {
        throw new Error("Crypto symbol is required.");
    }

    const market = await getCryptoMarket();

    const crypto = market.find(
        (coin) =>
            coin.symbol.toUpperCase() === symbol.toUpperCase()
    );

    if (!crypto) {
        throw new Error("Cryptocurrency not found.");
    }

    return crypto;
};

const getCryptoPrice = async (symbol) => {

    const crypto = await getCryptoBySymbol(symbol);

    return {
        symbol: crypto.symbol.toUpperCase(),
        companyName: crypto.name,
        currentPrice: crypto.current_price,
        image: crypto.image,
        marketCap: crypto.market_cap,
    };
};

module.exports = {
    getCryptoMarket,
    getCryptoPrice,
    getCryptoBySymbol,
};