const ProductModel = require('../database/models/Product');
const user = require('../database/models/User');

const getAllProducts = async () => {
    try {
        const products = await ProductModel.find({});
        return products;
    } catch (error) {
        console.log(error);
    }
    }

const createProduct = async (product) => {
    try {
        const newProduct = await ProductModel.create(product);
        return newProduct;

    } catch (error) {
        console.log(error);
    }
}

const getProductById = async (productId) => {
    try {
        const product = await ProductModel.findById(productId);
        return product;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getAllProducts,
    createProduct,
    getProductById,
};


