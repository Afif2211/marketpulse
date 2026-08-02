const express = require("express");
const router = express.Router();

const {
    getCryptoOverview,
} = require("../controllers/cryptoController");

router.get("/", getCryptoOverview);

module.exports = router;