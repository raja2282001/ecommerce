const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const serverlessExpress = require("@vendia/serverless-express");

dotenv.config();

const app = express();
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routers
const userRouter = require("../Router/UserRouter");
const productRouter = require("../Router/ProductRouter");

app.use("/user", userRouter);
app.use("/product", productRouter);

// Default route
app.get("/", (req, res) => {
  res.send("API is running ✅");
});

// MongoDB connect (runs once)
mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err));

// Export as serverless function
module.exports = serverlessExpress({ app });
