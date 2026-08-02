const User = require("../models/User");
const Portfolio = require("../models/Portfolio");
const Transaction = require("../models/Transaction");
const Stock = require("../models/Stock");

const { getQuote } = require("./finnhubService");

const {
    getCryptoPrice,
} = require("./coinGeckoService");


const buyStock = async (userId, symbol, shares) => {
    if (!symbol || !shares) {
        throw new Error("Symbol and shares are required.");
    }

    if (shares <= 0) {
        throw new Error("Shares must be greater than 0.");
    }

    symbol = symbol.toUpperCase();

    const stock = await Stock.findOne({ symbol });

    if (!stock) {
        throw new Error("Stock not found.");
    }

    const quote = await getQuote(symbol);

    if (!quote || !quote.c) {
        throw new Error("Unable to fetch stock price.");
    }

    const currentPrice = quote.c;
    const totalCost = currentPrice * shares;

    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found.");
    }

    if (user.walletBalance < totalCost) {
        throw new Error("Insufficient wallet balance.");
    }

    let holding = await Portfolio.findOne({
        user: userId,
        symbol,
        assetType: "stock",
    });

    if (!holding) {
        holding = new Portfolio({
            user: userId,
            assetType: "stock",
            symbol,
            companyName: stock.companyName,
            shares,
            averageBuyPrice: currentPrice,
        });
    } else {
        const totalShares = holding.shares + shares;

        const newAveragePrice =
            (
                (holding.shares * holding.averageBuyPrice) +
                (shares * currentPrice)
            ) / totalShares;

        holding.shares = totalShares;
        holding.averageBuyPrice = newAveragePrice;
    }

    user.walletBalance -= totalCost;

    await holding.save();
    await user.save();

    await Transaction.create({
        user: userId,
        assetType: "stock",
        type: "BUY",
        symbol,
        companyName: stock.companyName,
        shares,
        price: currentPrice,
        totalAmount: totalCost,
        realizedProfit: 0,
    });

    return {
        success: true,
        message: "Stock purchased successfully.",
        walletBalance: user.walletBalance,
        holding,
    };
};


const sellStock = async (userId, symbol, shares) => {
    if (!symbol || !shares) {
        throw new Error("Symbol and shares are required.");
    }

    if (shares <= 0) {
        throw new Error("Shares must be greater than 0.");
    }

    symbol = symbol.toUpperCase();

    const holding = await Portfolio.findOne({
        user: userId,
        symbol,
        assetType: "stock",
    });

    if (!holding) {
        throw new Error("You do not own this stock.");
    }

    if (holding.shares < shares) {
        throw new Error("Not enough shares to sell.");
    }

    const quote = await getQuote(symbol);

    if (!quote || !quote.c) {
        throw new Error("Unable to fetch stock price.");
    }

    const currentPrice = quote.c;

    const saleAmount = currentPrice * shares;

    const costBasis = holding.averageBuyPrice * shares;

    const realizedProfit = saleAmount - costBasis;

    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found.");
    }

    user.walletBalance += saleAmount;

    holding.shares -= shares;

    if (holding.shares === 0) {
        await Portfolio.deleteOne({ _id: holding._id });
    } else {
        await holding.save();
    }

    await user.save();

    await Transaction.create({
        user: userId,
        assetType: "stock",
        type: "SELL",
        symbol,
        companyName: holding.companyName,
        shares,
        price: currentPrice,
        totalAmount: saleAmount,
        realizedProfit,
    });

    return {
        success: true,
        message: "Stock sold successfully.",
        walletBalance: user.walletBalance,
        realizedProfit,
    };
};


const buyCrypto = async (userId, symbol, shares) => {

    if (!symbol || !shares) {
        throw new Error("Crypto symbol and quantity are required.");
    }

    if (shares <= 0) {
        throw new Error("Quantity must be greater than 0.");
    }

    symbol = symbol.toUpperCase();

    const crypto = await getCryptoPrice(symbol);

    const currentPrice = crypto.currentPrice;

    const totalCost = currentPrice * shares;

    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found.");
    }

    if (user.walletBalance < totalCost) {
        throw new Error("Insufficient wallet balance.");
    }

    let holding = await Portfolio.findOne({
        user: userId,
        symbol,
        assetType: "crypto",
    });

    if (!holding) {

        holding = new Portfolio({
            user: userId,
            assetType: "crypto",
            symbol,
            companyName: crypto.companyName,
            shares,
            averageBuyPrice: currentPrice,
        });

    } else {

        const totalShares = holding.shares + shares;

        const averagePrice =
            (
                (holding.shares * holding.averageBuyPrice) +
                (shares * currentPrice)
            ) / totalShares;

        holding.shares = totalShares;
        holding.averageBuyPrice = averagePrice;

    }

    user.walletBalance -= totalCost;

    await holding.save();

    await user.save();

    await Transaction.create({

        user: userId,
        assetType: "crypto",
        type: "BUY",
        symbol,
        companyName: crypto.companyName,
        shares,
        price: currentPrice,
        totalAmount: totalCost,
        realizedProfit: 0,

    });

    return {

        success: true,
        message: "Cryptocurrency purchased successfully.",
        walletBalance: user.walletBalance,
        holding,

    };

};


const sellCrypto = async (userId, symbol, shares) => {

    if (!symbol || !shares) {
        throw new Error("Crypto symbol and quantity are required.");
    }

    if (shares <= 0) {
        throw new Error("Quantity must be greater than 0.");
    }

    symbol = symbol.toUpperCase();

    const holding = await Portfolio.findOne({
        user: userId,
        symbol,
        assetType: "crypto",
    });

    if (!holding) {
        throw new Error("You do not own this cryptocurrency.");
    }

    if (holding.shares < shares) {
        throw new Error("Not enough quantity to sell.");
    }

    const crypto = await getCryptoPrice(symbol);

    const currentPrice = crypto.currentPrice;

    const saleAmount = currentPrice * shares;

    const costBasis = holding.averageBuyPrice * shares;

    const realizedProfit = saleAmount - costBasis;

    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found.");
    }

    user.walletBalance += saleAmount;

    holding.shares -= shares;

    if (holding.shares === 0) {
        await Portfolio.deleteOne({
            _id: holding._id,
        });
    } else {
        await holding.save();
    }

    await user.save();

    await Transaction.create({
        user: userId,
        assetType: "crypto",
        type: "SELL",
        symbol,
        companyName: holding.companyName,
        shares,
        price: currentPrice,
        totalAmount: saleAmount,
        realizedProfit,
    });

    return {
        success: true,
        message: "Cryptocurrency sold successfully.",
        walletBalance: user.walletBalance,
        realizedProfit,
    };

};


module.exports = {
    buyStock,
    sellStock,
    buyCrypto,
    sellCrypto,
};