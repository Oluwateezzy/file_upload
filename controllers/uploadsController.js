const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const fs = require("fs");

const uploadProductImageLocal = async(req, res) => {
    res.status(StatusCodes.OK);
};

const uploadProductImage = async(req, res) => {
    res.status(StatusCodes.OK);
};

module.exports = {
    uploadProductImage,
    uploadProductImageLocal,
};