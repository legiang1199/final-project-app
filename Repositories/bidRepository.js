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
        const bid = await bidModel.find({userId: userId});
        return bid;
    } catch (error) {
        console.log(error);
    }
}

const getBidByAuctionId = async (auctionId) => {
    try {
        const bid = await bidModel.find({auctionId: auctionId});
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
    getBidByAuctionId
};


