const categoryRepository = require("../Repositories/categoryRepository");

const getAllCategories = async () => {
  try {
    const categories = await categoryRepository.getAllCategories();
    return categories;
  } catch (error) {
    console.log(error);
  }
};

const createCategory = async (category) => {
  try {
    const newCategory = await categoryRepository.createCategory(category);
    return newCategory;
  } catch (error) {
    console.log(error);
  }
};

const getCategoryById = async (categoryId) => {
  try {
    const category = await categoryRepository.getCategoryById(categoryId);
    return category;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllCategories,
  createCategory,
  getCategoryById,
};
