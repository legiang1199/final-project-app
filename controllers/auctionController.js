const auctionService = require("../Services/AuctionsServices");
const Auction = require("../database/models/Auctions");
const Product = require("../database/models/Product");
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
    if (product) return res.status(400).send('Product already exist');
    const auction = await auctionService.createAuction(req.body);
    res.status(200).json(auction);
  } catch (error) {
    res.status(400).json(error);
  }
};



const getAuctionById = async (req, res) => {
  try {
    const auction = await auctionService.getAuctionById(req.params.auctionId);
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


module.exports = {
  getAllAuctions,
  createAuction,
  getAuctionById,
  patchEditAuction,
  deleteAuction
};
