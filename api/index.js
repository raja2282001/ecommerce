const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const serverless = require("@vendia/serverless-express");

dotenv.config();

const app = express();

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

const userRouter = require("../Router/UserRouter");
const productRouter = require("../Router/ProductRouter");

app.use("/user", userRouter);
app.use("/product", productRouter);

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("db connected"))
    .catch((err) => console.log(err));

// Do NOT use app.listen() here!

module.exports = serverless({ app });