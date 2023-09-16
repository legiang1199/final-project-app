const AuctionRepository = require("../Repository/AuctionsRepository");

const getAllAuctions = async () => {
  try {
    const auctions = await AuctionRepository.getAllAuctions();
    return auctions;
  } catch (error) {
    res.status(400).json(error);
  }
};

const createAuction = async (auction) => {
  try {
    const newAuction = await AuctionRepository.createAuction(auction);
    return newAuction;
  } catch (error) {
    res.status(400).json(error);
  }
};


const getAuctionById = async (auctionId) => {
  try {
    const auction = await AuctionRepository.getAuctionById(auctionId);
    return auction;
  } catch (error) {
    res.status(400).json(error);
  }
};

const patchEditAuction = async (auctionId, auction) => {
  try {
    const auctionUpdate = await AuctionRepository.patchEditAuction(
      auctionId,
      auction
    );
    return auctionUpdate;
  } catch (error) {
    res.status(400).json(error);
  }
};

const deleteAuction = async (auctionId) => {
  try {
    const deleteAuctionInfo = await AuctionRepository.deleteAuction(auctionId);
    return deleteAuctionInfo;
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
};
