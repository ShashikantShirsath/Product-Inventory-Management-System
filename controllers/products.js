const Product = require("../models/product");

// create new product
module.exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, quantity, category } = req.body;
        if (!name || !price || !quantity || !category) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const product = await Product.create({ name, description, price, quantity, category });
        
        res.status(201).json({
            message: "Product created successfully",
            product,
        })
    } catch (error) {
        res.status(500).json({ message: "Something went wrong while creating product", error: error.message });
    }
}

// get all products
module.exports.getAllProducts = async (req, res) => {
    try {
        const { search, category, sort } = req.query;
        let query = {};
        if (search) {
            query = { $or : [
                { name: { $regex: search, $options: "i"  } }, 
                { description: { $regex: search, $options: "i" } } 
            ]};
        }
        if (category) {
            query.category = category;
        }

        let productsQuery = Product.find(query);
        if (sort === "asc") {
            productsQuery = productsQuery.sort({ price: 1 });
        } else if (sort === "desc") {
            productsQuery = productsQuery.sort({ price: -1 });
        }
        const products = await productsQuery;

        res.status(200).json({
            message: "Products fetched successfully",
            products
        });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong while fetching products", error: error.message });
    }
}

// get single product
module.exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params;  
        if (!id) {
            return res.status(400).json({ message: "Product id is required" });
        }

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({
            message: "Product fetched successfully",
            product,
        })
    } catch (error) {
        res.status(500).json({ message: "Something went wrong while fetching product", error: error.message });
    }
}

// update product
module.exports.updateProductById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Product id is required" });
        }

        const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({
            message: "Product updated successfully",
            product,
        });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong while updating product", error: error.message });
    }
}

// delete product
module.exports.deleteProductById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Product id is required" });
        }

        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ 
            message: "Product deleted successfully", 
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};