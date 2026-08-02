const express = require("express");

const {
    getWatchlist,
    addToWatchlist,
    removeFromWatchlist,
} = require("../controllers/watchlistController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Protect all watchlist routes
router.use(protect);

// Get user's watchlist
router.get("/", getWatchlist);

// Add a stock to watchlist
router.post("/", addToWatchlist);

// Remove a stock from watchlist
router.delete("/:id", removeFromWatchlist);

module.exports = router;