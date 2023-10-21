const express = require("express");
const router = express.Router();

const {
    getAllBids,
    createBid,
    getBidById,
    getBidByUserId,
    getBidByAuctionId,
    } = require("../../controllers/bidcontroller");

router.get("/", getAllBids);

router.get("/:bidId", getBidById);

router.get("/user/:userId", getBidByUserId);

router.get("/auction/:auctionId", getBidByAuctionId);

router.post("/", createBid);

module.exports = router;