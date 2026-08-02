const express = require("express");

const {
    buy,
    sell,
    getPortfolio,
    getTransactions,
    getWallet,
    getAiInsights,
    refreshAiInsights,
} = require("../controllers/portfolioController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getPortfolio);

router.get("/wallet", protect, getWallet);

router.get("/transactions", protect, getTransactions);

router.get("/insights", protect, getAiInsights);

router.post("/insights/refresh", protect, refreshAiInsights);

router.post("/buy", protect, buy);

router.post("/sell", protect, sell);

module.exports = router;