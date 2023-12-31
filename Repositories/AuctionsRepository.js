const AuctionsModel = require("../database/models/Auctions");
const ProductModel = require("../database/models/Product");
const UserModel = require("../database/models/User");

const getAllAuctions = async () => {
  try {
    const auctions = await AuctionsModel.find({});
    return auctions;
  } catch (error) {
    console.log(error);
  }
};

const createAuction = async (auction) => {
  try {
    const newAuction = await AuctionsModel.create(auction);
    return newAuction;
  } catch (error) {
    console.log(error);
  }
};

const getAuctionById = async (auctionId) => {
  try {
    const auction = await AuctionsModel.findById(auctionId);
    return auction;
  } catch (error) {
    console.log(error);
  }
};

const patchEditAuction = async (auctionId, auction) => {
  try {
    const auctionUpdate = await AuctionsModel.findByIdAndUpdate(
      auctionId,
      auction,
      { new: true }
    );
    return auctionUpdate;
  } catch (error) {
    console.log(error);
  }
};

const getAuctionByUserId = async (userId) => {
  try {
    const auction = await AuctionsModel.find({ owner: userId });
    return auction;
  } catch (error) {
    console.log(error);
  }
};




module.exports = {
  getAllAuctions,
  createAuction,
  getAuctionById,
  patchEditAuction,
  getAuctionByUserId,
};
