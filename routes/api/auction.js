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

/**
 * @swagger
 * /api/auction:
 *   get:
 *     summary: Get all auctions
 *     description: Retrieve a list of all auctions.
 *     responses:
 *       '200':
 *         description: A successful response with a list of auctions.
 *       '500':
 *         description: Internal server error.
 */
router.get("/", getAllAuctions);

/**
 * @swagger
 * /api/auction/{auctionId}:
 *   get:
 *     summary: Get auction by ID
 *     description: Retrieve details of a specific auction by its ID.
 *     parameters:
 *       - in: path
 *         name: auctionId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the auction.
 *     responses:
 *       '200':
 *         description: A successful response with details of the auction.
 *       '404':
 *         description: Auction not found.
 */
router.get("/:auctionId", getAuctionById);

/**
 * @swagger
 * /api/auction:
 *   post:
 *     summary: Create a new auction
 *     description: Create a new auction.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               startPrice:
 *                 type: number
 *             required:
 *               - title
 *               - description
 *               - startPrice
 *     responses:
 *       '200':
 *         description: Auction created successfully.
 *       '400':
 *         description: Bad request. Missing or invalid fields.
 *       '500':
 *         description: Internal server error.
 */

router.post("/", createAuction);

/**
 * @swagger
 * /api/auction/{auctionId}:
 *   patch:
 *     summary: Edit auction
 *     description: Edit auction.
 *     parameters:
 *       - in: path
 *         name: auctionId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the auction.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               startPrice:
 *                 type: number
 *             required:
 *               - title
 *               - description
 *               - startPrice
 *     responses:
 *       '200':
 *         description: Auction edited successfully.
 *       '400':
 *         description: Bad request. Missing or invalid fields.
 *       '500':
 *         description: Internal server error.
 */
router.patch("/:auctionId", patchEditAuction);

/**
 * @swagger
 * /api/auction/{auctionId}:
 *   delete:
 *     summary: Delete auction
 *     description: Delete auction.
 *     parameters:
 *       - in: path
 *         name: auctionId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the auction.
 *     responses:
 *       '200':
 *         description: Auction deleted successfully.
 *       '404':
 *         description: Auction not found. The provided auction ID does not exist.
 *       '500':
 *         description: Internal server error. Something went wrong on the server.
 */

router.delete("/:auctionId", deleteAuction);

/**
 * @swagger
 * /api/auction/user/{userId}:
 *   get:
 *     summary: Get auction by user ID
 *     description: Retrieve details of a specific auction by its user ID.
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user.
 *     responses:
 *       '200':
 *         description: A successful response with details of the auction.
 *       '404':
 *         description: Auction not found.
 */

router.get("/user/:userId", getAuctionByUserId);

/**
 * @swagger
 * /api/auction/winner/{auctionId}:
 *  get:
 *  summary: Get winner auction
 * description: Retrieve details of a specific auction by its auction ID.
 * parameters:
 *    - in: path
 *    name: auctionId
 *   schema:
 *   type: string
 * required: true
 * description: ID of the auction.
 * responses:
 *  '200':
 *  description: A successful response with details of the auction. 
 * '404':
 * description: Auction not found.
 */

router.get("/winner/:auctionId", getWinnerAuction);

/**
 * @swagger
 * /api/auction/search/{search}:
 *   get:
 *     summary: Search auctions
 *     description: Search for auctions based on a provided query string.
 *     parameters:
 *       - in: path
 *         name: search
 *         schema:
 *           type: string
 *         required: true
 *         description: Query string for searching auctions.
 *     responses:
 *       '200':
 *         description: A successful response with a list of matching auctions.
 *       '400':
 *         description: Bad request. Invalid search query.
 */
router.get("/search/:search", searchAuction);

module.exports = router;
