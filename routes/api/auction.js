const express = require("express");
const router = express.Router();

const {
  getAllAuctions,
  createAuction,
  getAuctionById,
  patchEditAuction,
  deleteAuction,
} = require("../../controllers/auctionController");

router.get("/", getAllAuctions);

router.get("/:auctionId", getAuctionById);

router.post("/", createAuction);

router.patch("/:auctionId", patchEditAuction);

router.delete("/:auctionId", deleteAuction);



module.exports = router;
