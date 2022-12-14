require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const fileUpload = require("express-fileupload");
// using v2
const cloudinary = require("cloudinary").v2;
cloudinary.config({
    cloud_name: "teezzy",
    api_key: "621416262259954",
    api_secret: "B-moEMWdGX30KDVvGNWOOp6bOlU",
});

// database
const connectDB = require("./db/connect");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// product router
const productRouter = require("./routes/productRoutes");

app.use(express.static("./public"));

app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));

app.use("/api/v1/products", productRouter);

// middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI);

        app.listen(port, () =>
            console.log(`Server is listening on port ${port}...`)
        );
    } catch (error) {
        console.log(error);
    }
};

start();