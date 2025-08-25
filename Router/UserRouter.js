const express = require("express");
const router = express.Router();
const multer=require("multer");
const UserController = require("../Controller/UserController");
const verifyToken = require("../middleware/auth");


const upload=multer();


router.post("/register", upload.single(""), UserController.registerUser);
router.post("/login", upload.single(""), UserController.loginuser);

router.get("/", UserController.listalluser);
router.get("/:id", verifyToken, UserController.userdetail);
router.put("/:id", verifyToken,upload.single("") ,UserController.updateuser);
router.delete("/:id", verifyToken, UserController.deleteuser);

module.exports = router;