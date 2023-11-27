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

/**
 * @swagger
 * /api/product:
 *   get:
 *     summary: Get all products
 *     description: Retrieve a list of all products.
 *     responses:
 *       '200':
 *         description: A successful response with a list of products.
 *       '500':
 *         description: Internal server error.
 */
router.get("/", getAllProducts);

/**
 * @swagger
 * /api/product/{productId}:
 *   get:
 *     summary: Get product by ID
 *     description: Retrieve details of a specific product by its ID.
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the product.
 *     responses:
 *       '200':
 *         description: A successful response with details of the product.
 *       '404':
 *         description: Product not found.
 */
router.get("/:productId", getProductById);

/**
 * @swagger
 * /api/product/user/{userId}:
 *   get:
 *     summary: Get product by user ID
 *     description: Retrieve details of a specific product by its user ID.
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user.
 *     responses:
 *       '200':
 *         description: A successful response with details of the product.
 *       '404':
 *         description: Product not found.
 */
router.get("/user/:userId", getProductByUserId);

/**
 * @swagger
 * /api/product:
 *   post:
 *     summary: Create a new product
 *     description: Create a new product.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               startPrice:
 *                 type: number
 *             required:
 *               - name
 *               - description
 *               - startPrice
 *     responses:
 *       '200':
 *         description: A successful response with details of the product.
 *       '404':
 *         description: Product not found.
 */
router.post("/", createProduct);

/**
 * @swagger
 * /api/product/{productId}:
 *   patch:
 *     summary: Edit product
 *     description: Edit product.
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the product.
 */
router.patch("/:productId", patchEditProduct);

/**
 * @swagger
 * /api/product/{productId}:
 *   delete:
 *     summary: Delete product
 *     description: Delete product.
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the product.
 */
router.delete("/:productId", deleteProduct);

module.exports = router;
