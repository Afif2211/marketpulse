const axios = require("axios");

const COINGECKO_URL =
    "https://api.coingecko.com/api/v3/coins/markets";

// Cache market data for 3 minutes — crypto prices don't need
// to refresh every few seconds for this app, and this drastically
// cuts how often we hit CoinGecko's free-tier rate limit.
const CACHE_DURATION = 3 * 60 * 1000;

let cachedMarket = null;
let lastFetched = 0;
let inFlightRequest = null;

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

    // If a fetch is already in progress (e.g. several dashboard
    // components asking at once), share that same request instead
    // of firing multiple calls to CoinGecko at the same time.
    if (inFlightRequest) {
        return inFlightRequest;
    }

    inFlightRequest = (async () => {

        try {

            return await fetchMarketFromAPI();

        } catch (err) {

            // If CoinGecko rate limits us but we still have cached data
            // (even if slightly stale), keep serving it instead of failing.
            if (cachedMarket) {
                console.log(
                    "CoinGecko rate limited. Using cached market data."
                );
                return cachedMarket;
            }

            throw err;

        } finally {

            inFlightRequest = null;

        }

    })();

    return inFlightRequest;

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