const dotenv = require("dotenv");
const express = require("express");
const app = express();
const connectDB = require("./config/db");

const authRoutes = require("./routes/user");
const productRotues = require("./routes/product");

dotenv.config();

connectDB();

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/products", productRotues);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})