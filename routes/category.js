const express = require("express");
const router = new express.Router();
const searchBuilder = require("sequelize-search-builder");
const {
  category: Category,
  subcategory: Subcategory,
  Sequelize,
} = require("../models");

// Middlewares
const auth = require("../middleware/auth");
const adminAccess = require("../middleware/adminAccess");

/**
 * @api {get} /category Request categories
 * @apiName GetCategories
 * @apiGroup Category
 *
 * @apiSuccess {Object[]} data List of categories
 **/
router.get("/", async (req, res) => {
  try {
    // Query builder
    const search = new searchBuilder(Sequelize, req.query);
    const whereQuery = search.getWhereQuery();
    const orderQuery = search.getOrderQuery();
    const limitQuery = search.getLimitQuery();
    const offsetQuery = search.getOffsetQuery();

    let query = {
      where: whereQuery,
      order: orderQuery,
      limit: limitQuery,
      offset: offsetQuery,
    };

    // Include subcategories with main category
    if (req.query.include && req.query.include === "subcategory") {
      query = { ...query, include: Subcategory };
    }

    // Find categories
    const data = await Category.findAll(query);

    res.status(200).json({
      data,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

/**
 * @api {get} /category/:id Request category
 * @apiParam  {Number} id Unique identifier of category
 * @apiName GetCategory
 * @apiGroup Category
 *
 * @apiSuccess {id} id Category id
 * @apiSuccess {String} name Category name
 **/
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

/**
 * @api {post} /category/ Create category
 * @apiName CreateCategory
 * @apiGroup Category
 *
 * @apiPermission admin
 *
 * @apiSuccess {id} id Category id
 * @apiSuccess {String} name Category name
 **/
router.post("/", auth, adminAccess, async (req, res) => {
  try {
    // Check if category exists
    let category = await Category.findOne({ where: { name: req.body.name } });
    if (!category) {
      // Create category
      category = await Category.create(req.body);

      // Add subcategories
      if (req.body.subcategories) {
        await category.addSubcategories(req.body.subcategories);
      }
      res.status(200).json(category);
    } else {
      res.status(400).json({ message: "Resource already exists" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

/**
 * @api {put} /category/:id Update category
 * @apiParam  {Number} id Unique identifier of category
 * @apiName UpdateCategory
 * @apiGroup Category
 *
 * @apiPermission admin
 *
 * @apiSuccess {id} id Category id
 * @apiSuccess {String} name Category name
 **/
router.put("/:id", auth, adminAccess, async (req, res) => {
  try {
    // Find category
    let category = await Category.findOne({ where: { id: req.params.id } });
    if (!category) {
      return res.status(404).json({ message: "Resource not found" });
    }

    console.log(req.body);

    // Update
    category.name = req.body.name;
    await category.save();
    await category.removeSubcategories(await category.getSubcategories());
    await category.addSubcategories(req.body.subcategories);

    res.status(200).json(category);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

/**
 * @api {delete} /category/:id Delete category
 * @apiParam  {Number} id Unique identifier of category
 * @apiName DeleteCategory
 * @apiGroup Category
 *
 * @apiPermission admin
 **/
router.delete("/:id", auth, adminAccess, async (req, res) => {
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
