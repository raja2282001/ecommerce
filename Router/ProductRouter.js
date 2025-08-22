const express = require("express");
const multer = require("multer");
const path = require("path");
const Router = express.Router();
const ProductController = require("../Controller/ProductController");
const verifyToken = require("../middleware/auth");

// Set up storage engine for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
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
Router.get("/list", ProductController.listallproduct);
Router.get("/detail/:id", ProductController.productdetail);

module.exports = Router;