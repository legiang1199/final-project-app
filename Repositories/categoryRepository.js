const categoryModel = require('../database/models/Category');

const getAllCategories = async () => {
    try {
        const categories = await categoryModel.find({});
        return categories;
    } catch (error) {
        console.log(error);
    }
}

const createCategory = async (category) => {
    try {
        const newCategory = await categoryModel.create(category);
        return newCategory;
    } catch (error) {
        console.log(error);
    }
}

const getCategoryById = async (categoryId) => {
    try {
        const category = await categoryModel.findById(categoryId);
        return category;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getAllCategories,
    createCategory,
    getCategoryById,
};
