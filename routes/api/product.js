const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  createProduct,
  getProductById,
  patchEditProduct,
  deleteProduct,
  getProductByUserId,
} = require("../../controllers/ProductController");

router.get("/", getAllProducts);

router.get("/:productId", getProductById);

router.get("/user/:userId", getProductByUserId);

router.post("/", createProduct);

router.patch("/:productId", patchEditProduct);

router.delete("/:productId", deleteProduct);

module.exports = router;
