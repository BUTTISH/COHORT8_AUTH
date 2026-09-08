const express = require("express");

const {
  uploadProduct,
  getAllProducts,
} = require("../controller/productsController");

const productRouter = express.Router();

productRouter.post("/:id", uploadProduct);
productRouter.get("/", getAllProducts);

module.exports = productRouter;
