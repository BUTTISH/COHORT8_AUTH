const productModel = require("../model/productsModel");
const userModel = require("../model/userModel");
const cloudinary = require("../config/cloudinary");

const uploadProduct = async (req, res) => {
  try {
    const getUserID = await userModel.findById(req.params.userId);
    const { name, description, price, category, quantity, stock } = req.body;
    if (!getUserID) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Please upload a product image" });
    }

    const result = await cloudinary.uploader.upload(req.file.path);
    const imageUrl = result.secure_url;

    const product = await productModel.create({
      name,
      description,
      price,
      category,
      quantity,
      image: imageUrl,
      stock,
    });

    await getUserID.products.push(product._id);
    await getUserID.save();
    res.status(201).json({
      message: "Product uploaded successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const getAll = await productModel.find();
    res.status(200).json({
      message: "All products fetched successfully",
      data: getAll,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  uploadProduct,
  getAllProducts,
};
