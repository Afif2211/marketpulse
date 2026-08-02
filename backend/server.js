require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/database");

const authRoutes = require("./routes/authRoutes");
const stockRoutes = require("./routes/stockRoutes");
const cryptoRoutes = require("./routes/cryptoRoutes");
const portfolioRoutes = require("./routes/portfolioRoutes");
const watchlistRoutes = require("./routes/watchlistRoutes");

const {
    notFound,
    errorHandler,
} = require("./middleware/errorMiddleware");

// Connect Database
connectDB();

const app = express();

// Middleware
const allowedOrigins = [
    process.env.FRONTEND_URL,
    process.env.DASHBOARD_URL,
].filter(Boolean);

app.use(
    cors({
        origin: allowedOrigins,
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Root Route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "MarketPulse API Running 🚀",
    });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/stocks", stockRoutes);
app.use("/api/crypto", cryptoRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/watchlist", watchlistRoutes);

// Error Middleware
app.use(notFound);
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});