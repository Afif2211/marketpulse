const axios = require("axios");

const BASE_URL = "https://finnhub.io/api/v1";
const API_KEY = process.env.FINNHUB_API_KEY;

const STOCKS = [
    "AAPL",
    "MSFT",
    "NVDA",
    "TSLA",
    "AMZN",
    "META",
    "JPM",
    "XOM",
];

let marketCache = null;
let cacheTime = 0;
const CACHE_DURATION = 60000; // 60 seconds

const searchStocks = async (query) => {
    const response = await axios.get(`${BASE_URL}/search`, {
        params: {
            q: query,
            token: API_KEY,
        },
    });

    return response.data;
};

const getQuote = async (symbol) => {
    const response = await axios.get(`${BASE_URL}/quote`, {
        params: {
            symbol,
            token: API_KEY,
        },
    });

    return response.data;
};


const getCompanyProfile = async (symbol) => {
    const response = await axios.get(`${BASE_URL}/stock/profile2`, {
        params: {
            symbol,
            token: API_KEY,
        },
    });

    return response.data;
};

const getMarketNews = async () => {
    const response = await axios.get(`${BASE_URL}/news`, {
        params: {
            category: "general",
            token: API_KEY,
        },
    });

    return response.data;
};

const getMarketOverview = async () => {

    const now = Date.now();

    if (marketCache && now - cacheTime < CACHE_DURATION) {
        return marketCache;
    }

    const quotes = await Promise.all(
        STOCKS.map(async (symbol) => {

            try {

                const response = await axios.get(`${BASE_URL}/quote`, {
                    params: {
                        symbol,
                        token: API_KEY,
                    },
                });

                return {
                    symbol,
                    quote: response.data,
                };

            } catch {

                return {
                    symbol,
                    quote: null,
                };

            }

        })
    );

    marketCache = quotes;
    cacheTime = now;

    return quotes;
};

module.exports = {
    searchStocks,
    getQuote,
    getCompanyProfile,
    getMarketNews,
    getMarketOverview,
};