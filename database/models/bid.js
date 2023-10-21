const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema({
    auction: { type: mongoose.Schema.Types.ObjectId, ref: "Auction" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    bid_amount: { type: Number, required: true },
    bid_time: { type: Date, default: Date.now() },
    });

const Bid = mongoose.model("Bid", bidSchema);
module.exports = Bid;