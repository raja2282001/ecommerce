const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const userRouter = require("./Router/UserRouter");
const productRouter = require("./Router/ProductRouter");

app.use("/user", userRouter);
app.use("/product", productRouter);

app.use("/",(req,res)=>{
    res.send("Api is running successfully");
})

// Connect to MongoDB only if not already connected
if (mongoose.connection.readyState === 0) {
    mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log("db connected"))
        .catch((err) => console.log(err));
}

// Export the app for Vercel serverless deployment
module.exports = app;

// For local development
if (require.main === module) {
    const PORT = process.env.PORT || 7000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}