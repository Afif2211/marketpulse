const express = require("express");

const router = express.Router();

const {
    searchStocks,
    getQuote,
    getCompanyProfile,
    getMarketNews,
    getMarketOverview,
} = require("../controllers/stockController");

router.get("/search", searchStocks);

router.get("/quote/:symbol", getQuote);

router.get("/profile/:symbol", getCompanyProfile);

router.get("/news", getMarketNews);

router.get("/market-overview", getMarketOverview);

module.exports = router;