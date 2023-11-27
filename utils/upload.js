const  connectCloudinary = require( "../database/cloudinary");
//upload photo
exports.uploadPhoto = async (req, res) => {
    try {
        const result = await connectCloudinary.uploader.upload(req.body.imgUrl, {
            upload_preset: "auction_app",
            allowed_formats: ["jpg", "png", "jpeg", "gif", "svg", "jfif", "webp"],
        });
        req.body.imgUrl = result.secure_url;
        res.status(200).json(req.body.avatar);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
