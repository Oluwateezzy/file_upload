const { StatusCodes } = require("http-status-codes");
const Product = require("../models/Product");
const fs = require("fs");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const CustomError = require("../errors");

const createProduct = async(req, res) => {
    const result = await cloudinary.uploader.upload(
        req.files.image.tempFilePath, {
            use_filename: true,
            folder: "file-upload",
        }
    );
    fs.unlinkSync(req.files.image.tempFilePath);

    req.body.image = result.secure_url;

    if (!req.body.image) {
        throw new CustomError.BadRequestError("No image found");
    }

    const product = await Product.create(req.body);
    res.status(StatusCodes.CREATED).json({ product });
};

const getAllProducts = async(req, res) => {
    const products = await Product.find({});
    res.status(StatusCodes.OK).json({ products });
};

module.exports = {
    createProduct,
    getAllProducts,
};