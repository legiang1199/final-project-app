const express = require('express');
const router = express.Router();

const {
    getAllCategories,
    createCategory,
    getCategoryById,
    patchEditCategory,
    deleteCategory,
} = require('../../controllers/categoryController');

router.get('/', getAllCategories);

router.get('/:categoryId', getCategoryById);

router.post('/', createCategory);

router.patch('/:categoryId', patchEditCategory);

router.delete('/:categoryId', deleteCategory);

module.exports = router;