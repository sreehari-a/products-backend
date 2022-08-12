const express = require("express");
require("./db/mongoose");


const UserRouter = require("./routers/user");
const TaskRouter = require("./routers/task");
const ProductRouter = require("./routers/product");

const app = express();


/** Adding routers */
app.use(express.json());
app.use(TaskRouter);
app.use(UserRouter);
app.use(ProductRouter);

module.exports = app;