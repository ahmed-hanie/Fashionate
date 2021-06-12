const express = require("express");
const router = new express.Router();
const searchBuilder = require("sequelize-search-builder");
const {
  tag: Tag,
  product: Product,
  subcategory: Subcategory,
  Sequelize,
} = require("../models");

router.get("/", async (req, res) => {
  try {
    // Query builder
    const search = new searchBuilder(Sequelize, req.query);
    const whereQuery = search.getWhereQuery();
    const orderQuery = search.getOrderQuery();
    const limitQuery = search.getLimitQuery();
    const offsetQuery = search.getOffsetQuery();

    // Find tags
    const data = await Tag.findAll({
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
    const tag = await Tag.findOne({ where: { id: req.params.id } });
    if (!tag) {
      return res.status(404).json({ message: "Resource not found" });
    }
    res.status(200).json(tag);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    // Check if tag exists
    let tag = await Tag.findOne({ where: { name: req.body.name } });
    if (!tag) {
      // Create tag
      tag = await Tag.create(req.body);
      res.status(200).json(tag);
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
    // Find tag
    let tag = await Tag.findOne({ where: { id: req.params.id } });
    if (!tag) {
      return res.status(404).json({ message: "Resource not found" });
    }

    // Update
    tag.name = req.body.name;
    await tag.save();

    res.status(200).json(tag);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    // Find tag
    let tag = await Tag.findOne({ where: { id: req.params.id } });
    if (!tag) {
      return res.status(404).json({ message: "Resource not found" });
    }

    // Delete
    await tag.destroy();
    res.status(204).json({});
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get tags by category
router.get("/category/:id", async (req, res) => {
  try {
    const data = await Tag.findAll({
      where: { "$products.categoryId$": req.params.id },
      include: Product,
    });

    res.status(200).json({ data });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get tags by category and subcategory
router.get(
  "/category/:categoryid/subcategory/:subcategoryid",
  async (req, res) => {
    try {
      const data = await Tag.findAll({
        where: {
          "$products.categoryId$": req.params.categoryid,
          "$products.subcategories.product_subcategory.subcategoryId$":
            req.params.subcategoryid,
        },
        include: [{ model: Product, include: Subcategory }],
      });

      res.status(200).json({ data });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
);

module.exports = router;
