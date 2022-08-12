const express = require("express");
const router = express.Router();

const {
    createProduct,
    getAllProducts,
} = require("../controllers/productController");

const {
    uploadProductImageLocal,
    uploadProductImage,
} = require("../controllers/uploadsController");

router.route("/").post(createProduct).get(getAllProducts);
router.route("/uploads").post(uploadProductImageLocal);

module.exports = router;