const express = require("express");

const {
  uploadProduct,
  getAllProducts,
} = require("../controller/productsController");
const upload = require("../config/multer");

const productRouter = express.Router();

productRouter.post("/:userId", upload.single("image"), uploadProduct);
productRouter.get("getAll", getAllProducts);

module.exports = productRouter;
