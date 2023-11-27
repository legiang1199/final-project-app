const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../../middlewares/authMiddleware");
const { adminRole } = require("../../permission/author");
const Auction = require("../../database/models/Auctions");
const Bid = require("../../database/models/bid");
const Product = require("../../database/models/Product");
const User = require("../../database/models/User");

/**
 * @swagger
 * /api/stats/auction:
 *  get:
 *   summary: Get stats for auctions
 *  description: Retrieve stats for auctions.
 * responses:
 *  '200':
 *   description: A successful response with stats of auctions.
 * '500':
 *  description: Internal server error.
 */

 

router.get("/auction/:userId", async (req, res) => {
  try {
    const auctions = await Auction.find({ owner: req.params.userId });
    const totalAuctions = auctions.length;
    const totalBids = auctions.reduce(
      (total, auction) => total + auction.bids.length,
      0
    );
    const highestBid = auctions.reduce((highest, auction) => {
      const highestBid = auction.bids.reduce((highestBid, bid) => {
        return bid.amount > highestBid ? bid.amount : highestBid;
      }, 0);
      return highestBid > highest ? highestBid : highest;
    }, 0);
    const response = {
      totalAuctions,
      totalBids,
      highestBid,
    };
    res.json(response);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/** 
 * @swagger
 * /api/stats/auction:
 * get:
 * summary: Get stats for auctions
 * description: Retrieve stats for auctions.
 * responses:
 * '200':
 * description: A successful response with stats of auctions.
 * '500':
 * description: Internal server error.
 */


router.get("/auction", isLoggedIn, adminRole, async (req, res) => {
  try {
    const auctions = await Auction.find();
    const totalAuctions = auctions.length;
    const totalBids = auctions.reduce(
      (total, auction) => total + auction.bids.length,
      0
    );
    const highestBid = auctions.reduce((highest, auction) => {
      const highestBid = auction.bids.reduce((highestBid, bid) => {
        return bid.amount > highestBid ? bid.amount : highestBid;
      }, 0);
      return highestBid > highest ? highestBid : highest;
    }, 0);
    const response = {
      totalAuctions,
      totalBids,
      highestBid,
    };
    res.json(response);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/stats/bid
// @desc    Get stats for bids
// @access  Private, admin only
router.get("/bid", isLoggedIn, adminRole, async (req, res) => {
  try {
    const bids = await Bid.find();
    const totalBids = bids.length;
    const totalAmount = bids.reduce((total, bid) => total + bid.amount, 0);
    const averageAmount = totalAmount / totalBids;
    const response = {
      totalBids,
      totalAmount,
      averageAmount,
    };
    res.json(response);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/stats/product
// @desc    Get stats for products
// @access  Private, admin only
router.get("/product/:userId", async (req, res) => {
  try {
    const products = await Product.find({ owner: req.params.userId });
    const totalProducts = products.length;
    const response = {
      totalProducts,
    };
    res.json(response);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/product", isLoggedIn, adminRole, async (req, res) => {
  try {
    const products = await Product.find();
    const totalProducts = products.length;
    const totalValue = products.reduce(
      (total, product) => total + product.price,
      0
    );
    const averageValue = totalValue / totalProducts;
    const response = {
      totalProducts,
      totalValue,
      averageValue,
    };
    res.json(response);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/stats/user
// @desc    Get stats for users
// @access  Private, admin only
router.get("/user", isLoggedIn, adminRole, async (req, res) => {
  try {
    const users = await User.find();
    const totalUsers = users.length;
    const response = {
      totalUsers,
    };
    res.json(response);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/all", async (req, res) => {
  try {
    const auctions = await Auction.find();
    const totalAuctions = auctions.length;
    const totalBids = auctions.reduce(
      (total, auction) => total + auction.bids.length,
      0
    );
    const highestBid = auctions.reduce((highest, auction) => {
      const highestBid = auction.bids.reduce((highestBid, bid) => {
        return bid.amount > highestBid ? bid.amount : highestBid;
      }, 0);
      return highestBid > highest ? highestBid : highest;
    }, 0);

    const bids = await Bid.find();
    const totalBids2 = bids.length;
    const totalAmount = bids.reduce((total, bid) => total + bid.amount, 0);
    const averageAmount = totalAmount / totalBids2;

    const products = await Product.find();
    const totalProducts = products.length;
    const totalValue = products.reduce(
      (total, product) => total + product.price,
      0
    );
    const averageValue = totalValue / totalProducts;

    const users = await User.find();
    const totalUsers = users.length;

    const response = {
      totalAuctions,
      totalBids,
      highestBid,
      totalBids2,
      totalAmount,
      averageAmount,
      totalProducts,
      totalValue,
      averageValue,
      totalUsers,
    };
    res.json(response);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
