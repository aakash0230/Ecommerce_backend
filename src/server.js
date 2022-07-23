const express = require("express");
const env = require("dotenv");
const app = express();
const path = require("path");

// environment variable
env.config();


const connectDB = require("../database/connection");
connectDB();


// middleware to pass the data
app.use(express.json());


const adminRoutes = require("../routes/admin/auth");
const userRoutes = require("../routes/auth");
const categoryRoutes = require("../routes/category");
const productRoutes = require("../routes/product");
const cartRoutes = require("../routes/cart");

app.use("/public", express.static(path.join(__dirname, "../uploads")));
app.use("/api", adminRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", cartRoutes);

app.listen(process.env.port, () => {
    console.log(`Server is running on port ${process.env.port}`);
});