const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Router = express.Router();
const ProductController = require("../Controller/ProductController");
const verifyToken = require("../middleware/auth");

// Ensure uploads folder exists
const uploadsDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Set up storage engine for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadsDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Initialize upload variable
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: function (req, file, cb) {
        const filetypes = /jpeg|jpg|png|gif|webp/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error("Only image files are allowed!"));
    }
});

// Add product with image upload
Router.post("/add", upload.single("image"), ProductController.createproduct);

// List all products (protected)
Router.get("/list", verifyToken, ProductController.listallproduct);

// Get product detail (protected)
Router.get("/detail/:id", verifyToken, ProductController.productdetail);

module.exports = Router;