const express = require("express");
const router = express.Router();

const {
  getAllBids,
  createBid,
  getBidById,
  getBidByUserId,
  getBidByAuctionId,
  getLatestBidByAuctionId,
} = require("../../controllers/bidcontroller");

/**
 * @swagger
 * /api/bid:
 *   get:
 *     summary: Get all bids
 *     description: Retrieve a list of all bids.
 *     responses:
 *       '200':
 *         description: A successful response with a list of bids.
 *       '500':
 *         description: Internal server error.
 */
router.get("/", getAllBids);

/**
 * @swagger
 * /api/bid/{bidId}:
 *   get:
 *     summary: Get bid by ID
 *     description: Retrieve details of a specific bid by its ID.
 *     parameters:
 *       - in: path
 *         name: bidId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the bid.
 *     responses:
 *       '200':
 *         description: A successful response with details of the bid.
 *       '404':
 *         description: Bid not found.
 */
router.get("/:bidId", getBidById);

/**
 * @swagger
 * /api/bid/user/{userId}:
 *   get:
 *     summary: Get bid by user ID
 *     description: Retrieve details of a specific bid by its user ID.
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user.
 *     responses:
 *       '200':
 *         description: A successful response with details of the bid.
 *       '404':
 *         description: Bid not found.
 */
router.get("/user/:userId", getBidByUserId);

/**
 * @swagger
 * /api/bid/auction/{auctionId}:
 *   get:
 *     summary: Get bid by auction ID
 *     description: Retrieve details of a specific bid by its auction ID.
 *     parameters:
 *       - in: path
 *         name: auctionId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the auction.
 *     responses:
 *       '200':
 *         description: A successful response with details of the bid.
 *       '404':
 *         description: Bid not found.
 */
router.get("/auction/:auctionId", getBidByAuctionId);

/**
 * @swagger
 * /api/bid:
 *   post:
 *     summary: Create a bid
 *     description: Create a new bid.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               auction:
 *                 type: string
 *               bid:
 *                 type: number
 *             required:
 *               - auction
 *               - bid
 *     responses:
 *       '200':
 *         description: A successful response with details of the bid.
 *       '404':
 *         description: Bid not found.
 */
router.post("/", createBid);

/**
 * @swagger
 * /api/bid/auction/latest/{auctionId}:
 *   get:
 *     summary: Get latest bid by auction ID
 *     description: Retrieve details of the latest bid by its auction ID.
 *     parameters:
 *       - in: path
 *         name: auctionId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the auction.
 *     responses:
 *       '200':
 *         description: A successful response with details of the bid.
 *       '404':
 *         description: Bid not found.
 */
router.get("/auction/latest/:auctionId", getLatestBidByAuctionId);

module.exports = router;
