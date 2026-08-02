require("dotenv").config();

const mongoose = require("mongoose");

const connectDB = require("./config/database");

const Stock = require("./models/Stock");

const stocks = require("./data/stocks");

const seedStocks = async () => {
    try {
        await connectDB();

        await Stock.deleteMany();

        const stockData = stocks.map((stock) => ({
            ...stock,
            currentPrice: 0,
            previousClose: 0,
            marketCap: 0,
            volume: 0,
            change: 0,
            changePercent: 0,
        }));

        await Stock.insertMany(stockData);

        console.log("✅ Stocks seeded successfully.");

        process.exit();
    } catch (error) {
        console.error("❌ Error seeding stocks:", error);

        process.exit(1);
    }
};

seedStocks();