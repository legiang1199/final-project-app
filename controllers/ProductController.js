const ProductService = require("../Services/ProductServices");
const { Product } = require("../database/models/Product");
const { uploadPhoto } = require("../utils/upload");
const connectCloudinary = require("../database/cloudinary");

const getAllProducts = async (req, res, next) => {
  try {
    const products = await ProductService.getAllProducts({});
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const createProduct = async (req, res, next) => {
  const { imgUrl, ...productData } = req.body;
  try {
    if (imgUrl) {
      const result = await connectCloudinary.uploader.upload(imgUrl, {
        upload_preset: "auction_app",
        width: 500,
        height: 500,
        crop: "fill",
      });

      if (result) {
        const createdProduct = await ProductService.createProduct({
          ...productData, // Use the destructured productData instead of product
          imgUrl: result.secure_url,
        });
        res.status(200).json(createdProduct);
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const getProductById = async (req, res, next) => {
  try {
    if (!req.params.productId)
      return res.status(400).json({ message: "Not found ID!" });
    const product = await ProductService.getProductById(req.params.productId);
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllProduct = async (req, res, next) => {
  try {
    const getAllProduct = await Product.find({});
    res.json(getAllProduct);
  } catch (err) {
    res.status(400).json(err);
  }
};

const patchEditProduct = async (req, res, next) => {
  try {
    const productUpdate = await Product.findByIdAndUpdate(
      req.params.productId,
      req.body
    );
    res.status(200).json(productUpdate);
  } catch (err) {
    res.status(400).json(err);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const deleteProductInfo = await Product.findByIdAndDelete(
      req.params.productId
    );
    res.status(200).json(deleteProductInfo);
  } catch (err) {
    res.status(400).json(err);
  }
};

const getProductByUserId = async (req, res, next) => {
  try {
    if (!req.params.userId)
      return res.status(400).json({ message: "Not found ID!" });
    const product = await ProductService.getProductByUserId(req.params.userId);
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  getProductById,
  getAllProduct,
  patchEditProduct,
  deleteProduct,
  getProductByUserId,
};
