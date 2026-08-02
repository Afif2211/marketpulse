const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema(
    {
        symbol: {
            type: String,
            required: true,
            unique: true,
            uppercase: true,
            trim: true,
        },

        companyName: {
            type: String,
            required: true,
            trim: true,
        },

        exchange: {
            type: String,
            required: true,
        },

        sector: {
            type: String,
            required: true,
        },

        logo: {
            type: String,
            default: "",
        },

        currentPrice: {
            type: Number,
            required: true,
        },

        previousClose: {
            type: Number,
            required: true,
        },

        marketCap: {
            type: Number,
            default: 0,
        },

        volume: {
            type: Number,
            default: 0,
        },

        change: {
            type: Number,
            default: 0,
        },

        changePercent: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Stock", stockSchema);