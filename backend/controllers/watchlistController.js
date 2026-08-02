const Watchlist = require("../models/Watchlist");
const { getQuote } = require("../services/finnhubService");

const getWatchlist = async (req, res) => {

    try {

        const items = await Watchlist.find({
            user: req.user.id,
        });

        const watchlist = await Promise.all(
            items.map(async (item) => {

                try {

                    const quote = await getQuote(item.symbol);

                    return {

                        _id: item._id,

                        symbol: item.symbol,

                        companyName: item.companyName,

                        currentPrice: quote.c || 0,

                        change: quote.dp || 0,

                        previousClose: quote.pc || 0,

                    };

                } catch (error) {

                    console.log(`Quote unavailable for ${item.symbol}`);

                    return {

                        _id: item._id,

                        symbol: item.symbol,

                        companyName: item.companyName,

                        currentPrice: 0,

                        change: 0,

                        previousClose: 0,

                    };

                }

            })
        );

        res.status(200).json({
            success: true,
            watchlist,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

const addToWatchlist = async (req, res) => {

    try {

        const { symbol, companyName } = req.body;

        const exists = await Watchlist.findOne({
            user: req.user.id,
            symbol,
        });

        if (exists) {

            return res.status(400).json({
                success: false,
                message: "Stock already exists in watchlist.",
            });

        }

        const item = await Watchlist.create({

            user: req.user.id,

            symbol,

            companyName,

        });

        res.status(201).json({
            success: true,
            watchlist: item,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

const removeFromWatchlist = async (req, res) => {

    try {

        await Watchlist.findOneAndDelete({

            _id: req.params.id,

            user: req.user.id,

        });

        res.status(200).json({
            success: true,
            message: "Removed successfully.",
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

module.exports = {

    getWatchlist,

    addToWatchlist,

    removeFromWatchlist,

};