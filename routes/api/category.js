const express = require('express');
const router = express.Router();

const {
  getAllCategories,
  createCategory,
  getCategoryById,
  patchEditCategory,
  deleteCategory,
} = require('../../controllers/categoryController');

/**
 * @swagger
 * /api/category:
 *   get:
 *     summary: Get all categories
 *     description: Retrieve a list of all categories.
 *     responses:
 *       '200':
 *         description: A successful response with a list of categories.
 *       '500':
 *         description: Internal server error.
 */
router.get('/', getAllCategories);

/**
 * @swagger
 * /api/category/{categoryId}:
 *   get:
 *     summary: Get category by ID
 *     description: Retrieve details of a specific category by its ID.
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the category.
 *     responses:
 *       '200':
 *         description: A successful response with details of the category.
 *       '404':
 *         description: Category not found.
 */
router.get('/:categoryId', getCategoryById);

/**
 * @swagger
 * /api/category:
 *   post:
 *     summary: Create a new category
 *     description: Create a new category.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *             required:
 *               - name
 *     responses:
 *       '200':
 *         description: A successful response with details of the category.
 *       '404':
 *         description: Category not found.
 */
router.post('/', createCategory);

/**
 * @swagger
 * /api/category/{categoryId}:
 *   patch:
 *     summary: Edit category
 *     description: Edit category.
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the category.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *             required:
 *               - name
 *     responses:
 *       '200':
 *         description: A successful response with details of the category.
 *       '404':
 *         description: Category not found.
 */
router.patch('/:categoryId', patchEditCategory);

/**
 * @swagger
 * /api/category/{categoryId}:
 *   delete:
 *     summary: Delete category
 *     description: Delete category.
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the category.
 *     responses:
 *       '200':
 *         description: A successful response with details of the category.
 *       '404':
 *         description: Category not found.
 */
router.delete('/:categoryId', deleteCategory);

module.exports = router;
