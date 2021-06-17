const express = require("express");
const router = new express.Router();
const searchBuilder = require("sequelize-search-builder");
const {
  subcategory: Subcategory,
  category: Category,
  Sequelize,
} = require("../models");

// Middlewares
const auth = require("../middleware/auth");
const adminAccess = require("../middleware/adminAccess");

/**
 * @api {get} /subcategory Request subcategories
 * @apiName GetSubcategories
 * @apiGroup Subcategory
 *
 * @apiSuccess {Object[]} data List of subcategories
 **/
router.get("/", async (req, res) => {
  try {
    // Query builder
    const search = new searchBuilder(Sequelize, req.query);
    const whereQuery = search.getWhereQuery();
    const orderQuery = search.getOrderQuery();
    const limitQuery = search.getLimitQuery();
    const offsetQuery = search.getOffsetQuery();

    let dbQuery = {
      where: whereQuery,
      order: orderQuery,
      limit: limitQuery,
      offset: offsetQuery,
    };

    // Are we trying to find subcategories from main categories?
    // We need to join category/subcategory tables
    if (req.query.filter && "categories.id" in req.query.filter) {
      dbQuery = { ...dbQuery, include: Category, subQuery: false };
    }

    // Find subcategories
    const data = await Subcategory.findAll(dbQuery);

    res.status(200).json({
      data,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

/**
 * @api {get} /subcategory/:id Request subcategory
 * @apiParam  {Number} id Unique identifier of subcategory
 * @apiName GetSubcategory
 * @apiGroup Subcategory
 *
 * @apiSuccess {id} id Subcategory id
 * @apiSuccess {String} name Subcategory name
 **/
router.get("/:id", async (req, res) => {
  try {
    const subcategory = await Subcategory.findOne({
      where: { id: req.params.id },
    });
    if (!subcategory) {
      return res.status(404).json({ message: "Resource not found" });
    }
    res.status(200).json(subcategory);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

/**
 * @api {post} /subcategory/ Create subcategory
 * @apiName CreateSubcategory
 * @apiGroup Subcategory
 *
 * @apiPermission admin
 *
 * @apiSuccess {id} id Subcategory id
 * @apiSuccess {String} name Subcategory name
 **/
router.post("/", auth, adminAccess, async (req, res) => {
  try {
    // Check if subcategory exists
    let subcategory = await Subcategory.findOne({
      where: { name: req.body.name },
    });
    if (!subcategory) {
      // Create subcategory
      subcategory = await Subcategory.create(req.body);
      res.status(200).json(subcategory);
    } else {
      res.status(400).json({ message: "Resource already exists" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

/**
 * @api {put} /subcategory/:id Update subcategory
 * @apiParam  {Number} id Unique identifier of subcategory
 * @apiName UpdateSubcategory
 * @apiGroup Subcategory
 *
 * @apiPermission admin
 *
 * @apiSuccess {id} id Subcategory id
 * @apiSuccess {String} name Subcategory name
 **/
router.put("/:id", auth, adminAccess, async (req, res) => {
  try {
    // Find subcategory
    let subcategory = await Subcategory.findOne({
      where: { id: req.params.id },
    });
    if (!subcategory) {
      return res.status(404).json({ message: "Resource not found" });
    }

    // Update
    subcategory.name = req.body.name;
    await subcategory.save();

    res.status(200).json(subcategory);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

/**
 * @api {delete} /subcategory/:id Delete subcategory
 * @apiParam  {Number} id Unique identifier of subcategory
 * @apiName DeleteSubcategory
 * @apiGroup Subcategory
 *
 * @apiPermission admin
 **/
router.delete("/:id", auth, adminAccess, async (req, res) => {
  try {
    // Find tag
    let subcategory = await Subcategory.findOne({
      where: { id: req.params.id },
    });
    if (!subcategory) {
      return res.status(404).json({ message: "Resource not found" });
    }

    // Delete
    await subcategory.destroy();
    res.status(204).json({});
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
