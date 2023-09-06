const ProductRepository = require('../Repository/ProductRepository');

const getAllProducts = async () => {
    try {
        const products = await ProductRepository.getAllProducts();
        return products;
    } catch (error) {
        console.log(error);
    }
}

const createProduct = async (product) => {
    try {
        const newProduct = await ProductRepository.createProduct(product);
        return newProduct;
    } catch (error) {
        console.log(error);
    }
}

const getProductById = async (productId) => {
    try {
        const product = await ProductRepository.getProductById(productId);
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