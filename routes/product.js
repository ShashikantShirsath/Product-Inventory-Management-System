const express = require("express");
const router = express.Router();

const { authenticateUser } = require("../middleware/authMiddleware");
const { getAllProducts, getProductById, createProduct, updateProductById, deleteProductById } = require("../controllers/products");

// public routes
router.get("/", getAllProducts);
router.get("/:id", getProductById);
// protected routes
router.post("/", authenticateUser, createProduct);
router.put("/:id", authenticateUser, updateProductById);
router.delete("/:id", authenticateUser, deleteProductById);

module.exports = router;