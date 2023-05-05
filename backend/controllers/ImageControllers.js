const Image = require('../models/ImageModel');
const cloudinary = require('../utils/cloudinaryConfig')



exports.saveOne = async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path, {
            public_id: `images/${req.file.originalname}`,
            tags: 'images',
            resource_type: "image",
        });
        const newImage = new Image({
            public_id: result.public_id,
            url: result.secure_url,
            title: req.body.title,
            email: req.body.email,
            });
            await newImage.save();
            res.json(newImage);
    } catch (error) {
    res.status(500).send(error);
    }
}


exports.getAll =async (req, res) => {
    try {
    const images = await Image.find();
    res.json(images);
    } catch (error) {
    res.status(500).send(error);
    }
}
            
exports.getOne = async (req, res) => {
    try {
    const image = await Image.findById(req.params.id);
    res.json(image);
    } catch (error) {
    res.status(500).send(error);
    }
}


exports.updateOne = async (req, res) => {
    try {
    const image = await Image.findById(req.params.id);
    if (req.file) {
    await cloudinary.uploader.destroy(image.public_id);
    const result = await cloudinary.uploader.upload(req.file.path, {
    public_id:` images/${req.file.originalname}`,
    tags: 'images',
    resource_type: "image",
    });
    image.public_id = result.public_id;
    image.url = result.secure_url;
    }
    if (req.body.title) image.title = req.body.title;
    if (req.body.email) image.email = req.body.email;
    await image.save();
    res.json(image);
    } catch (error) {
    res.status(500).send(error);
    }
}

exports.deleteOne = async (req, res) => {
    try {
    const image = await Image.findById(req.params.id);
    await cloudinary.uploader.destroy(image.public_id);
    await image.remove();
    res.json({ message: "Image deleted" });
    } catch (error) {
    res.status(500).send(error);
    }
}
