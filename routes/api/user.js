const express = require("express");
const router = express.Router();

const {
  getUserById,
  patchEditUser,
  deleteUser,
  getAllUsers,
} = require("../../controllers/userController");

/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users.
 *     responses:
 *       '200':
 *         description: A successful response with a list of users.
 *       '500':
 *         description: Internal server error.
 */
router.get("/", getAllUsers);

/**
 * @swagger
 * /api/user/{userId}:
 *   get:
 *     summary: Get user by ID
 *     description: Retrieve details of a specific user by its ID.
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user.
 *     responses:
 *       '200':
 *         description: A successful response with details of the user.
 *       '404':
 *         description: User not found.
 */
router.get("/:userId", getUserById);

/**
 * @swagger
 * /api/user/{userId}:
 *   patch:
 *     summary: Update user by ID
 *     description: Update a specific user by its ID.
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user.
 *     responses:
 *       '200':
 *         description: A successful response with details of the user.
 *       '404':
 *         description: User not found.
 *       '500':
 *         description: Internal server error. Something went wrong on the server.
 */
router.patch("/:userId", patchEditUser);

/**
 * @swagger
 * /api/user/{userId}:
 *   delete:
 *     summary: Delete user by ID
 *     description: Delete a specific user by its ID.
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user.
 *     responses:
 *       '200':
 *         description: A successful response with details of the user.
 *       '404':
 *         description: User not found.
 *       '500':
 *         description: Internal server error. Something went wrong on the server.
 */
router.delete("/:userId", deleteUser);

module.exports = router;
