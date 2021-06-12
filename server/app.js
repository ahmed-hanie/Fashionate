const express = require("express");

// API Routes
const user = require("../routes/user");
const tag = require("../routes/tag");
const category = require("../routes/category");
const subcategory = require("../routes/subcategory");
const product = require("../routes/product");
const order = require("../routes/order");

const app = express();

// Parse json
app.use(express.json());

app.use("/api/user", user);
app.use("/api/tag", tag);
app.use("/api/category", category);
app.use("/api/subcategory", subcategory);
app.use("/api/product", product);
app.use("/api/order", order);

module.exports = app;
