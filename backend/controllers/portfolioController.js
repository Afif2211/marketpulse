const {
    buyStock,
    sellStock,
    buyCrypto,
    sellCrypto,
} = require("../services/tradeService");

const Portfolio = require("../models/Portfolio");
const Transaction = require("../models/Transaction");
const User = require("../models/User");

const { getQuote } = require("../services/finnhubService");

const { generatePortfolioInsights } = require("../services/groqService");

const {
    getCryptoPrice,
} = require("../services/coinGeckoService");

const buy = async (req, res) => {
    try {

        const {
            symbol,
            shares,
            assetType = "stock",
        } = req.body;

        let result;

        if (assetType === "crypto") {

            result = await buyCrypto(
                req.user.id,
                symbol,
                Number(shares)
            );

        } else {

            result = await buyStock(
                req.user.id,
                symbol,
                Number(shares)
            );

        }

        res.status(200).json(result);

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message,
        });

    }
};

const sell = async (req, res) => {
    try {

        const {
            symbol,
            shares,
            assetType = "stock",
        } = req.body;

        let result;

        if (assetType === "crypto") {

            result = await sellCrypto(
                req.user.id,
                symbol,
                Number(shares)
            );

        } else {

            result = await sellStock(
                req.user.id,
                symbol,
                Number(shares)
            );

        }

        res.status(200).json(result);

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message,
        });

    }
};

const getPortfolio = async (req, res) => {
    try {

        const holdings = await Portfolio.find({
            user: req.user.id,
        }).sort({
            createdAt: -1,
        });

        const portfolio = [];

        let portfolioValue = 0;
        let totalInvestment = 0;
        let totalProfitLoss = 0;
        let totalProfitLossPercentage = 0;

        const quotes = await Promise.all(

            holdings.map(async (holding) => {

                if (holding.assetType === "crypto") {
                    return await getCryptoPrice(
                        holding.symbol
                    );
                }

                return await getQuote(
                    holding.symbol
                );

            })

        );

        holdings.forEach((holding, index) => {

            const quote = quotes[index];

            const currentPrice =
                holding.assetType === "crypto"
                    ? quote.currentPrice
                    : quote.c;

            const currentValue =
                currentPrice * holding.shares;

            const investment =
                holding.averageBuyPrice *
                holding.shares;

            const profitLoss =
                currentValue - investment;

            portfolioValue += currentValue;

            totalInvestment += investment;

            totalProfitLoss += profitLoss;

            portfolio.push({

                ...holding.toObject(),

                currentPrice,

                currentValue,

                investment,

                profitLoss,

            });

        });

        if (totalInvestment > 0) {

            totalProfitLossPercentage = Number(

                (
                    (totalProfitLoss /
                        totalInvestment) *
                    100
                ).toFixed(2)

            );

        }

        const user = await User.findById(
            req.user.id
        );

        res.status(200).json({

            success: true,

            walletBalance:
                user.walletBalance,

            portfolioValue,

            totalInvestment,

            totalProfitLoss,

            totalProfitLossPercentage,

            totalAccountValue:
                user.walletBalance +
                portfolioValue,

            holdings: portfolio,

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }
};

const getTransactions = async (req, res) => {
    try {

        const transactions = await Transaction.find({
            user: req.user.id,
        }).sort({
            createdAt: -1,
        });

        res.status(200).json({
            success: true,
            transactions,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

const buildPortfolioSnapshot = async (userId) => {

    const holdings = await Portfolio.find({ user: userId });

    let portfolioValue = 0;
    let totalInvestment = 0;
    let totalProfitLoss = 0;

    const quotes = await Promise.all(

        holdings.map(async (holding) => {

            if (holding.assetType === "crypto") {
                return await getCryptoPrice(holding.symbol);
            }

            return await getQuote(holding.symbol);

        })

    );

    const enriched = holdings.map((holding, index) => {

        const quote = quotes[index];

        const currentPrice =
            holding.assetType === "crypto"
                ? quote.currentPrice
                : quote.c;

        const currentValue = currentPrice * holding.shares;
        const investment = holding.averageBuyPrice * holding.shares;
        const profitLoss = currentValue - investment;

        portfolioValue += currentValue;
        totalInvestment += investment;
        totalProfitLoss += profitLoss;

        return {
            symbol: holding.symbol,
            companyName: holding.companyName,
            assetType: holding.assetType,
            shares: holding.shares,
            averageBuyPrice: holding.averageBuyPrice,
            currentPrice,
            profitLoss,
        };

    });

    const totalProfitLossPercentage =
        totalInvestment > 0
            ? Number(((totalProfitLoss / totalInvestment) * 100).toFixed(2))
            : 0;

    const user = await User.findById(userId);

    return {
        holdings: enriched,
        totalAccountValue: user.walletBalance + portfolioValue,
        totalProfitLoss,
        totalProfitLossPercentage,
    };

};

const CACHE_DURATION_MS = 24 * 60 * 60 * 1000;
const REFRESH_COOLDOWN_MS = 60 * 1000;

const getAiInsights = async (req, res) => {

    try {

        const user = await User.findById(req.user.id);

        const cached = user.aiInsights;

        const isFresh =
            cached &&
            cached.generatedAt &&
            Date.now() - new Date(cached.generatedAt).getTime() < CACHE_DURATION_MS;

        if (isFresh) {

            return res.status(200).json({
                success: true,
                summary: cached.summary,
                insights: cached.insights,
                generatedAt: cached.generatedAt,
                cached: true,
            });

        }

        const snapshot = await buildPortfolioSnapshot(req.user.id);

        const result = await generatePortfolioInsights(snapshot);

        user.aiInsights = {
            summary: result.summary,
            insights: result.insights,
            generatedAt: new Date(),
        };

        await user.save();

        res.status(200).json({
            success: true,
            summary: result.summary,
            insights: result.insights,
            generatedAt: user.aiInsights.generatedAt,
            cached: false,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

const refreshAiInsights = async (req, res) => {

    try {

        const user = await User.findById(req.user.id);

        const cached = user.aiInsights;

        const tooSoon =
            cached &&
            cached.generatedAt &&
            Date.now() - new Date(cached.generatedAt).getTime() < REFRESH_COOLDOWN_MS;

        if (tooSoon) {

            return res.status(429).json({
                success: false,
                message: "Please wait a moment before refreshing again.",
            });

        }

        const snapshot = await buildPortfolioSnapshot(req.user.id);

        const result = await generatePortfolioInsights(snapshot);

        user.aiInsights = {
            summary: result.summary,
            insights: result.insights,
            generatedAt: new Date(),
        };

        await user.save();

        res.status(200).json({
            success: true,
            summary: result.summary,
            insights: result.insights,
            generatedAt: user.aiInsights.generatedAt,
            cached: false,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

const getWallet = async (req, res) => {
    try {

        const user = await User.findById(
            req.user.id
        );

        res.status(200).json({
            success: true,
            walletBalance:
                user.walletBalance,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

module.exports = {
    buy,
    sell,
    getPortfolio,
    getTransactions,
    getWallet,
    getAiInsights,
    refreshAiInsights,
};