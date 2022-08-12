const express = require("express");

const Product = require("../models/product");
const Category = require("../models/category");

const authMiddleware = require("../middleware/auth");

const router = new express.Router();

const allowedKeys = [
  "title",
  "image",
  "description",
  "rating.rate",
  "rating.count",
  "price",
  "category",
];

router.post("/products", authMiddleware, async (req, res) => {
  try {
    let productsArray = req.body.data;
    if (!productsArray.length) {
      productsArray = [productsArray];
    }
    const categories = await Category.find();
    let validArray = [];
    productsArray.map(
      ({
        image,
        title,
        description,
        price,
        rating: { rate, count } = {},
        category,
      }) => {
        const isValidItem = categories.some((cat) => cat.name === category);
        if (!isValidItem) {
          throw new Error("Please Enter a valid category");
        }
        validArray.push({
          image,
          title,
          description,
          price,
          rating: { rate, count },
          category,
        });
      }
    );
    const products = await Product.insertMany(validArray);
    res.status(201).send(products);
  } catch (e) {
    res.status(400).send(e);
  }
});
router.post("/categories", authMiddleware, async (req, res) => {
  try {
    let categoryArray = req.body.data;
    if (!categoryArray.length) {
      categoryArray = [categoryArray];
    }
    let objArray = [];
    categoryArray.map((categoryName) => {
      objArray.push({
        name: categoryName,
      });
    });
    console.log(objArray);
    const categories = await Category.insertMany(objArray);
    res.status(201).send(categories);
  } catch (e) {
    res.status(400).send(e);
  }
});
router.get("/categories", async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(201).send({ data: categories });
  } catch (e) {
    res.status(400).send(e);
  }
});

//GET /products?completed=true
//GET /products?limit=20&skip=30
//GET /products?sortBy=createdAt:desc
router.get("/products", async (req, res) => {
  try {
    // const tasks = await Task.find({ owner: req.user._id });
    // res.status(200).send(tasks);
    const match = {};
    const sort = {};
    const filters = req.query.filters;
    allowedKeys.map((key) => {
      if (filters?.[key]) {
        match[key] = filters[key];
      }
    });
    if (req.query.sortBy) {
      const [key, direction] = req.query.sortBy.split(":");
      if (allowedKeys.indexOf(key) > -1) {
        sort[key] = direction === "desc" ? -1 : 1;
      }
    }

    const products = await Product.find(match, null, {
      limit: parseInt(req.query.limit),
      skip: parseInt(req.query.skip),
      sort,
    });
    res.status(200).send({ data: products });
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

module.exports = router;
