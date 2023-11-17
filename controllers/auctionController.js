const auctionService = require("../Services/AuctionsServices");
const Auction = require("../database/models/Auctions");
const Product = require("../database/models/Product");
const bidService = require("../Services/bidService");
const User = require("../database/models/User");
const { sendEmail } = require("../utils/sendEmail");

const getAllAuctions = async (req, res) => {
  try {
    const auctions = await auctionService.getAllAuctions();
    res.status(200).json(auctions);
  } catch (error) {
    res.status(400).json(error);
  }
};

const createAuction = async (req, res) => {
  try {
    let data = req.body;
    const product = await Auction.findOne({ product: data.product });
    if (product) return res.status(400).send("Product already exist");

    const auction = await auctionService.createAuction(req.body);
    res.status(200).json(auction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAuctionById = async (req, res) => {
  try {
    const auction = await auctionService.getAuctionById(req.params.auctionId);
    const lastBid = await bidService.getLatestBidByAuctionId(auction._id);
    auction.bids = lastBid;
    
    if (lastBid && auction.auction_end < Date.now()) {
      const winner = await User.findById(lastBid[0].user); // Assuming there is a last bid
      if (!auction.emailSent) {
        const message = `You have been the winner on ${
          auction.name
        }. The bid is ${lastBid[0].bid_amount.toString()} VND. Please go to ${
          process.env.CLIENT_URL
        } to complete the payment.`;
        try {
          await sendEmail(winner.email, message);
          auction.emailSent = true;
        } catch (error) {
          console.error("Error sending email:", error);
        }
      }
    }

    await auction.save();
    res.status(200).json(auction);
  } catch (error) {
    res.status(400).json(error);
  }
};


const patchEditAuction = async (req, res) => {
  try {
    const auction = await auctionService.patchEditAuction(
      req.params.auctionId,
      req.body
    );
    res.status(200).json(auction);
  } catch (error) {
    res.status(400).json(error);
  }
};

const deleteAuction = async (req, res) => {
  try {
    const auction = await auctionService.deleteAuction(req.params.auctionId);
    res.status(200).json(auction);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getAuctionByUserId = async (req, res) => {
  try {
    const auction = await auctionService.getAuctionByUserId(req.params.userId);
    res.status(200).json(auction);
  } catch (error) {
    res.status(400).json(error);
  }
};

const winnerAuction = async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.auctionId);
    if (!auction) return res.status(400).send("Auction not found");
    if (auction.winner) return res.status(400).send("Auction already won");
    const product = await Product.findById(auction.product);
    if (!product) return res.status(400).send("Product not found");
    if (product.user == req.user._id)
      return res.status(400).send("You can't bid on your own product");
    if (Date.now() < auction.auction_end)
      return res.status(400).send("Auction not ended yet");
    const bids = await Bid.find({ auction: auction._id }).sort({
      bid_amount: -1,
    });
    if (bids.length == 0) return res.status(400).send("No bids found");
    const winner = bids[0].user;
    auction.winner = winner;
    auction.save();
    res.status(200).json(auction);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getWinnerAuction = async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.auctionId);
    if (!auction) return res.status(400).send("Auction not found");
    if (!auction.winner) return res.status(400).send("Auction not won yet");
    const winner = await User.findById(auction.winner);
    res.status(200).json(winner);
  } catch (error) {
    res.status(400).json(error);
  }
};

const searchAuction = async (req, res) => {
  try {
    const auctions = await Auction.find({
      name: { $regex: req.params.search, $options: "i" },
    });
    res.status(200).json(auctions);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  getAllAuctions,
  createAuction,
  getAuctionById,
  patchEditAuction,
  deleteAuction,
  getAuctionByUserId,
  getWinnerAuction,
  searchAuction,
};
