const mongoose = require("mongoose");

const auctionSchema = new mongoose.Schema(
  {
    name:{type:String},
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    category:{type: mongoose.Schema.Types.ObjectId, ref: "Category"},
    starting_price: { type: Number, required: true },
    auction_start: { type: Date, default: Date.now() },
    auction_end: { type: Date },
    auction_status: { type: Boolean },
    bids: [{ type: mongoose.Schema.Types.ObjectId, ref: "Bid" }],
    winner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    emailSent: {type:Boolean, default: false}
  },
  { timestamps: true }
);

const Auction = mongoose.model("Auction", auctionSchema);
module.exports = Auction;
 