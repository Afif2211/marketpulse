const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        assetType: {
            type: String,
            enum: ["stock", "crypto"],
            default: "stock",
            required: true,
        },

        type: {
            type: String,
            enum: ["BUY", "SELL"],
            required: true,
        },

        symbol: {
            type: String,
            required: true,
            uppercase: true,
            trim: true,
        },

        companyName: {
            type: String,
            required: true,
            trim: true,
        },

        shares: {
            type: Number,
            required: true,
            min: 0,
        },

        price: {
            type: Number,
            required: true,
            min: 0,
        },

        totalAmount: {
            type: Number,
            required: true,
            min: 0,
        },

        realizedProfit: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Transaction", transactionSchema);