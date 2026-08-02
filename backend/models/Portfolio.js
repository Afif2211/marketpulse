const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema(
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

        averageBuyPrice: {
            type: Number,
            required: true,
            min: 0,
        },
    },
    {
        timestamps: true,
    }
);

// One user can only have one holding per asset
portfolioSchema.index(
    {
        user: 1,
        assetType: 1,
        symbol: 1,
    },
    {
        unique: true,
    }
);

module.exports = mongoose.model("Portfolio", portfolioSchema);