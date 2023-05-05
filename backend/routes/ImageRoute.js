const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
require('dotenv').config()
const Image = require('../models/ImageModel')

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});



const storage = multer.diskStorage({
    filename: function (req, file, callback) {
        callback(null, Date.now() + file.originalname);
    },
});

const imageFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type"), false);
    }
};

const upload = multer({ storage: storage, fileFilter: imageFilter });

router.post("/", upload.single("image"), async (req, res) => {
    try {
        // try Save image on cloudinary and save url in a variable
        const result = await cloudinary.uploader.upload(req.file.path, {
            public_id: `images/${req.file.originalname}`,
            tags: 'images',
            resource_type: "image",
        });
        // if not succesfull move the image the images to a folder to try upload later

        // Create an instance of the new image model
        const newImage = new Image({
            public_id: result.public_id,
            url: result.secure_url,
            title: req.body.title,
            email: req.body.email,
            });
            // save the new instance
            await newImage.save();
            res.json(newImage);
    } catch (error) {
    res.status(500).send(error);
    }
});
            
router.get("/", async (req, res) => {
    try {
    const images = await Image.find();
    res.json(images);
    } catch (error) {
    res.status(500).send(error);
    }
});
            
router.get("/:id", async (req, res) => {
    try {
    const image = await Image.findById(req.params.id);
    res.json(image);
    } catch (error) {
    res.status(500).send(error);
    }
    });

router.put("/:id", upload.single("image"), async (req, res) => {
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
});
    
router.delete("/:id", async (req, res) => {
    try {
    const image = await Image.findById(req.params.id);
    await cloudinary.uploader.destroy(image.public_id);
    await image.remove();
    res.json({ message: "Image deleted" });
    } catch (error) {
    res.status(500).send(error);
    }
});
    
module.exports = router;