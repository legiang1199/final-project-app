const bidService = require("../Services/bidService");
const Auction = require("../database/models/Auctions");
const Bid = require("../database/models/bid");
const getAllBids = async (req, res) => {
  try {
    const bids = await bidService.getAllBids();
    res.status(200).json(bids);
  } catch (error) {
    res.status(400).json(error);
  }
};

const createBid = async (req, res) => {
  try {
    let data = req.body;

    const auctionData = await Auction.findById({ _id: data.auction });

    if (!auctionData) {
      return res
        .status(404)
        .json({ success: false, message: "Auction does not exist." });
    }

    if (Date.now() >= auctionData.auction_end) {
      return res
        .status(404)
        .json({ success: false, message: "The auction has ended." });
    }

    if (data.bid_amount <= auctionData.starting_price) {
      return res.status(400).json({
        success: false,
        message: "The bid price is not higher than the highest price.",
      });
    }

    if (auctionData.owner === data.user) {
      return res
        .status(400)
        .json({ success: false, message: "You cannot bid on your own item." });
    }

    if (auctionData.bids.length > 0) {
    const bidIds = auctionData.bids.map((bid) => bid._id);
    const bidData = await Bid.findById(bidIds);
    const bidDataUser = bidData.user;

    if (bidDataUser && bidDataUser.toString() == data.user) {
      return res
        .status(400)
        .json({ success: false, message: "You are the highest bidder." });
    }
    }

    if (data.bid_amount > auctionData.starting_price) {
      auctionData.starting_price = data.bid_amount;
      auctionData.save();
    }

    const bid = await bidService.createBid(req.body);
    res.status(200).json(bid);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getBidById = async (req, res) => {
  try {
    const bid = await bidService.getBidById(req.params.bidId);
    res.status(200).json(bid);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getBidByUserId = async (req, res) => {
  try {
    const bid = await bidService.getBidByUserId(req.params.userId);
    res.status(200).json(bid);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getBidByAuctionId = async (req, res) => {
  try {
    const bid = await bidService.getBidByAuctionId(req.params.auctionId);
    res.status(200).json(bid);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getLatestBidByAuctionId = async (req, res) => {
  try {
    const bid = await bidService.getLatestBidByAuctionId(req.params.auctionId);
    res.status(200).json(bid);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  getAllBids,
  createBid,
  getBidById,
  getBidByUserId,
  getBidByAuctionId,
  getLatestBidByAuctionId,
};
