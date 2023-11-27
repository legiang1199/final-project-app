const categoryServices = require('../Services/CategoryServices');
const category = require('../database/models/Category');

const getAllCategories = async (req, res, next) => {
    try {
        const categories = await categoryServices.getAllCategories();
        res.status(200).json(categories);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const createCategory = async (req, res, next) => {
    try {
        if (!req.body) return res.sendStatus(400);
        const category = await categoryServices.createCategory(req.body);
        res.status(200).json(category);
    } catch (error) {
        res.status(400).json(error);
    }
}

const getCategoryById = async (req, res, next) => {
    try {
        if (!req.params.categoryId) return res.status(400).json({ message: 'Not found ID!' });
        const category = await categoryServices.getCategoryById(req.params.categoryId);
        res.status(200).json(category);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const patchEditCategory = async (req, res, next) => {
    try {
        const categoryUpdate = await category.findByIdAndUpdate(req.params.categoryId, req.body);
        res.status(200).json(categoryUpdate);
    } catch (err) {
        res.status(400).json(err);
    }
}

const deleteCategory = async (req, res, next) => {
    try {
        const deleteCategoryInfo = await category.findByIdAndDelete(req.params.categoryId);
        res.status(200).json(deleteCategoryInfo);
    } catch (err) {
        res.status(400).json(err);
    }
}

module.exports = {
    getAllCategories,
    createCategory,
    getCategoryById,
    patchEditCategory,
    deleteCategory
};
