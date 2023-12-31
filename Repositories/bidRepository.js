const bidModel = require('../database/models/bid');

const getAllBids = async () => {
    try {
        const bids = await bidModel.find({});
        return bids;
    } catch (error) {
        console.log(error);
    }
}

const createBid = async (bid) => {
    try {
        const newBid = await bidModel.create(bid);
        return newBid;
    } catch (error) {
        console.log(error);
    }
}

const getBidById = async (bidId) => {
    try {
        const bid = await bidModel.findById(bidId);
        return bid;
    } catch (error) {
        console.log(error);
    }
}


const getBidByUserId = async (userId) => {
    try {
        const bid = await bidModel.find({user: userId});
        return bid;
    } catch (error) {
        console.log(error);
    }
}

const getBidByAuctionId = async (auctionId) => {
    try {
        const bid = await bidModel.find({auction: auctionId});
        return bid;
    } catch (error) {
        console.log(error);
    }
}

const getLatestBidByAuctionId = async (auctionId) => {
    try {
        const bid = await bidModel.find({auction: auctionId}).sort({bid_time: -1}).limit(1);
        return bid;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getAllBids,
    createBid,
    getBidById,
    getBidByUserId,
    getBidByAuctionId,
    getLatestBidByAuctionId
};


