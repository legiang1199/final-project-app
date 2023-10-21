const bidRepository = require('../repositories/bidRepository');

const getAllBids = async () => {
    try {
        const bids = await bidRepository.getAllBids();
        return bids;
    } catch (error) {
        console.log(error);
    }
}

const createBid = async (bid) => {
    try {
        const newBid = await bidRepository.createBid(bid);
        return newBid;
    } catch (error) {
        console.log(error);
    }
}

const getBidById = async (bidId) => {
    try {
        const bid = await bidRepository.getBidById(bidId);
        return bid;
    } catch (error) {
        console.log(error);
    }
}

const getBidByUserId = async (userId) => {
    try {
        const bid = await bidRepository.getBidByUserId(userId);
        return bid;
    } catch (error) {
        console.log(error);
    }
}

const getBidByAuctionId = async (auctionId) => {
    try {
        const bid = await bidRepository.getBidByAuctionId(auctionId);
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
