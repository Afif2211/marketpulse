const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000/api";

const AUTH_API_URL = `${BASE_URL}/auth`;
const PORTFOLIO_API_URL = `${BASE_URL}/portfolio`;
const WATCHLIST_API_URL = `${BASE_URL}/watchlist`;
const STOCK_API_URL = `${BASE_URL}/stocks`;
const CRYPTO_API_URL = `${BASE_URL}/crypto`;

const getAuthHeaders = (extraHeaders = {}) => {

    const token = localStorage.getItem("token");

    return {
        ...extraHeaders,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

};

const api = {
    getCurrentUser: async () => {

        const response = await fetch(`${AUTH_API_URL}/me`, {
            method: "GET",
            credentials: "include",
            headers: getAuthHeaders(),
        });

        const data = await response.json();

        return {
            ok: response.ok,
            data,
        };
    },

    logout: async () => {

        const response = await fetch(`${AUTH_API_URL}/logout`, {
            method: "POST",
            credentials: "include",
            headers: getAuthHeaders(),
        });

        const data = await response.json();

        return {
            ok: response.ok,
            data,
        };
    },

    getPortfolio: async () => {

        const response = await fetch(PORTFOLIO_API_URL, {
            method: "GET",
            credentials: "include",
            headers: getAuthHeaders(),
        });

        const data = await response.json();

        return {
            ok: response.ok,
            data,
        };
    },

    getWallet: async () => {

        const response = await fetch(`${PORTFOLIO_API_URL}/wallet`, {
            method: "GET",
            credentials: "include",
            headers: getAuthHeaders(),
        });

        const data = await response.json();

        return {
            ok: response.ok,
            data,
        };
    },

    getTransactions: async () => {

        const response = await fetch(`${PORTFOLIO_API_URL}/transactions`, {
            method: "GET",
            credentials: "include",
            headers: getAuthHeaders(),
        });

        const data = await response.json();

        return {
            ok: response.ok,
            data,
        };
    },

    getAiInsights: async () => {

        const response = await fetch(`${PORTFOLIO_API_URL}/insights`, {
            method: "GET",
            credentials: "include",
            headers: getAuthHeaders(),
        });

        const data = await response.json();

        return {
            ok: response.ok,
            data,
        };
    },

    refreshAiInsights: async () => {

        const response = await fetch(`${PORTFOLIO_API_URL}/insights/refresh`, {
            method: "POST",
            credentials: "include",
            headers: getAuthHeaders(),
        });

        const data = await response.json();

        return {
            ok: response.ok,
            data,
        };
    },

    buyStock: async (
        symbol,
        shares,
        assetType = "stock"
        ) => {

            const response = await fetch(`${PORTFOLIO_API_URL}/buy`, {
            method: "POST",
            credentials: "include",
            headers: getAuthHeaders({
                "Content-Type": "application/json",
            }),
            body: JSON.stringify({
            symbol,
            shares,
            assetType,
        }),
    });

    const data = await response.json();

    return {
        ok: response.ok,
        data,
    };
},

    sellStock: async (
    symbol,
    shares,
    assetType = "stock"
) => {

    const response = await fetch(`${PORTFOLIO_API_URL}/sell`, {
        method: "POST",
        credentials: "include",
        headers: getAuthHeaders({
            "Content-Type": "application/json",
        }),
        body: JSON.stringify({
            symbol,
            shares,
            assetType,
        }),
    });

    const data = await response.json();

    return {
        ok: response.ok,
        data,
    };
},

    searchStocks: async (query) => {

    const response = await fetch(
        `${STOCK_API_URL}/search?q=${encodeURIComponent(query)}`,
        {
            method: "GET",
            credentials: "include",
            headers: getAuthHeaders(),
        }
    );

    const data = await response.json();

        return {
            ok: response.ok,
            data,
        };
    },

    getCrypto: async () => {

        const response = await fetch(CRYPTO_API_URL, {
            method: "GET",
            credentials: "include",
            headers: getAuthHeaders(),
        });

        const data = await response.json();

        return {
            ok: response.ok,
            data,
        };
    },

    getMarketOverview: async () => {

        const response = await fetch(`${STOCK_API_URL}/market-overview`, {
            method: "GET",
            credentials: "include",
            headers: getAuthHeaders(),
        });

        const data = await response.json();

        return {
            ok: response.ok,
            data,
        };
    },

    getNews: async () => {

        const response = await fetch(`${STOCK_API_URL}/news`, {
            method: "GET",
            credentials: "include",
            headers: getAuthHeaders(),
        });

        const data = await response.json();

        return {
            ok: response.ok,
            data,
        };
    },

    getWatchlist: async () => {

    const response = await fetch(WATCHLIST_API_URL, {
        method: "GET",
        credentials: "include",
        headers: getAuthHeaders(),
    });

    const data = await response.json();

    return {
        ok: response.ok,
        data,
    };
},

addToWatchlist: async (stock) => {

    const response = await fetch(WATCHLIST_API_URL, {
        method: "POST",
        credentials: "include",
        headers: getAuthHeaders({
            "Content-Type": "application/json",
        }),
        body: JSON.stringify(stock),
    });

    const data = await response.json();

    return {
        ok: response.ok,
        data,
    };
},

removeFromWatchlist: async (id) => {

    const response = await fetch(`${WATCHLIST_API_URL}/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: getAuthHeaders(),
    });

    const data = await response.json();

    return {
        ok: response.ok,
        data,
    };
},

updateProfile: async (profileData) => {

    const response = await fetch(`${AUTH_API_URL}/profile`, {
        method: "PUT",
        credentials: "include",
        headers: getAuthHeaders({
            "Content-Type": "application/json",
        }),
        body: JSON.stringify(profileData),
    });

    const data = await response.json();

    return {
        ok: response.ok,
        data,
    };
},

changePassword: async (passwordData) => {

    const response = await fetch(`${AUTH_API_URL}/change-password`, {
        method: "PUT",
        credentials: "include",
        headers: getAuthHeaders({
            "Content-Type": "application/json",
        }),
        body: JSON.stringify(passwordData),
    });

    const data = await response.json();

    return {
        ok: response.ok,
        data,
    };
},

};

export default api;