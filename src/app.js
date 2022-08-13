const express = require("express");
require("./db/mongoose");


const UserRouter = require("./routers/user");
const ProductRouter = require("./routers/product");

const app = express();


/** Adding routers */
app.use(express.json());
app.use(UserRouter);
app.use(ProductRouter);

module.exports = app;