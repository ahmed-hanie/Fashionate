const express = require("express");
const router = new express.Router();
const searchBuilder = require("sequelize-search-builder");
const {
  tag: Tag,
  product: Product,
  subcategory: Subcategory,
  Sequelize,
} = require("../models");

// Middlewares
const auth = require("../middleware/auth");
const adminAccess = require("../middleware/adminAccess");

/**
 * @api {get} /tag Request tags
 * @apiName GetTags
 * @apiGroup Tag
 *
 * @apiSuccess {Object[]} data List of tags
 **/
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

/**
 * @api {get} /tag/:id Request tag
 * @apiParam  {Number} id Unique identifier of tag
 * @apiName GetTag
 * @apiGroup Tag
 *
 * @apiSuccess {id} id Tag id
 * @apiSuccess {String} name Tag name
 **/
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

/**
 * @api {post} /tag/ Create tag
 * @apiName CreateTag
 * @apiGroup Tag
 *
 * @apiPermission admin
 *
 * @apiSuccess {id} id Tag id
 * @apiSuccess {String} name Tag name
 **/
router.post("/", auth, adminAccess, async (req, res) => {
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

/**
 * @api {put} /tag/:id Update tag
 * @apiParam  {Number} id Unique identifier of tag
 * @apiName UpdateTag
 * @apiGroup Tag
 *
 * @apiPermission admin
 *
 * @apiSuccess {id} id Tag id
 * @apiSuccess {String} name Tag name
 **/
router.put("/:id", auth, adminAccess, async (req, res) => {
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

/**
 * @api {delete} /tag/:id Delete tag
 * @apiParam  {Number} id Unique identifier of tag
 * @apiName DeleteTag
 * @apiGroup Tag
 *
 * @apiPermission admin
 **/
router.delete("/:id", auth, adminAccess, async (req, res) => {
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

module.exports = router;
