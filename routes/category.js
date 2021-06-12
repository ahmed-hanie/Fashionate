const express = require("express");
const router = new express.Router();
const searchBuilder = require("sequelize-search-builder");
const { category: Category, Sequelize } = require("../models");

router.get("/", async (req, res) => {
  try {
    // Query builder
    const search = new searchBuilder(Sequelize, req.query);
    const whereQuery = search.getWhereQuery();
    const orderQuery = search.getOrderQuery();
    const limitQuery = search.getLimitQuery();
    const offsetQuery = search.getOffsetQuery();

    // Find categories
    const data = await Category.findAll({
      where: whereQuery,
      order: orderQuery,
      limit: limitQuery,
      offset: offsetQuery,
    });

    res.status(200).json({
      data,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findOne({ where: { id: req.params.id } });
    if (!category) {
      return res.status(404).json({ message: "Resource not found" });
    }
    res.status(200).json(category);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    // Check if category exists
    let category = await Category.findOne({ where: { name: req.body.name } });
    if (!category) {
      // Create category
      category = await Category.create(req.body);
      res.status(200).json(category);
    } else {
      res.status(400).json({ message: "Resource already exists" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    // Find category
    let category = await Category.findOne({ where: { id: req.params.id } });
    if (!category) {
      return res.status(404).json({ message: "Resource not found" });
    }

    // Update
    category.name = req.body.name;
    await category.save();

    res.status(200).json(category);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    // Find category
    let category = await Category.findOne({ where: { id: req.params.id } });
    if (!category) {
      return res.status(404).json({ message: "Resource not found" });
    }

    // Delete
    await category.destroy();
    res.status(204).json({});
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
