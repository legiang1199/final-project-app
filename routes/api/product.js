const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  createProduct,
  getProductById,
  patchEditProduct,
  deleteProduct,
} = require("../../controllers/ProductController");

router.get("/", getAllProducts);

router.get("/:productId", getProductById);

router.post("/", createProduct);

router.patch("/:productId", patchEditProduct);

router.delete("/:productId", deleteProduct);

module.exports = router;
