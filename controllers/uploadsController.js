const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const fs = require("fs");
const path = require("path");

const uploadProductImageLocal = async(req, res) => {
    if (!req.files) {
        throw new CustomError.BadRequestError("No file uploaded");
    }
    const productImage = req.files.image;
    if (!productImage.mimetype.startswith("image")) {
        throw new CustomError.BadRequestError("Please Upload Image");
    }
    const maxSize = 1024 * 1024;
    if (productImage.size > maxSize) {
        throw new CustomError.BadRequestError("Please upload image smaller");
    }
    const imagePath = path.join(
        __dirname,
        "../public/uploads/" + `${productImage.name}`
    );
    await productImage.mv(imagePath);
    res
        .status(StatusCodes.OK)
        .json({ image: { src: `/uploads/${productImage.name}` } });
};

const uploadProductImage = async(req, res) => {
    res.status(StatusCodes.OK);
};

module.exports = {
    uploadProductImage,
    uploadProductImageLocal,
};