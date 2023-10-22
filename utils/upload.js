const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure Multer storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'product-images',
        allowed_formats: ['jpg', 'jpeg', 'png']
    }
});

// Create Multer instance
const upload = multer({ storage: storage });

// Define controller function to handle image upload
exports.uploadProductImage = upload.single('image');

// Define controller function to create a new product
exports.createProduct = async (req, res) => {
    try {
        // Get the uploaded image URL from Cloudinary
        const image = req.file.path;

        // Create the new product with the image URL
        const newProduct = await Product.create({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            image: image
        });

        res.status(201).json({ success: true, data: newProduct });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Server error' });
    }
};
