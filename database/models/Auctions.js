const mongoose = require("mongoose");

const auctionSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    starting_price: { type: Number, required: true },
    auction_start: { type: Date, default: Date.now() },
    auction_end: { type: Date },
    auction_status: { type: Boolean },
    bids: [{ type: mongoose.Schema.Types.ObjectId, ref: "Bid" }],
  },
  { timestamps: true }
);

const Auction = mongoose.model("Auction", auctionSchema);
module.exports = Auction;
 