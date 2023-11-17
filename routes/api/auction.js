const express = require("express");
const router = express.Router();

const {
  getAllAuctions,
  createAuction,
  getAuctionById,
  patchEditAuction,
  deleteAuction,
  getAuctionByUserId,
  getWinnerAuction,
  searchAuction,
  
} = require("../../controllers/auctionController");

router.get("/", getAllAuctions);

router.get("/:auctionId", getAuctionById);

router.post("/", createAuction);

router.patch("/:auctionId", patchEditAuction);

router.delete("/:auctionId", deleteAuction);

router.get("/user/:userId", getAuctionByUserId);

router.get("/winner/:auctionId", getWinnerAuction);

router.get("/search/:search", searchAuction);

module.exports = router;
