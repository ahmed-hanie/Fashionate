const express = require("express");
const router = new express.Router();
const searchBuilder = require("sequelize-search-builder");
const {
  category: Category,
  product: Product,
  subcategory: Subcategory,
  tag: Tag,
  Sequelize,
  sequelize,
} = require("../models");

router.get("/", async (req, res) => {
  try {
    // Query builder
    const search = new searchBuilder(Sequelize, req.query);
    const whereQuery = search.getWhereQuery();
    const orderQuery = search.getOrderQuery();
    const limitQuery = search.getLimitQuery();
    const offsetQuery = search.getOffsetQuery();

    // Find products with category and subcategories
    const data = await Product.findAll({
      where: whereQuery,
      order: orderQuery,
      limit: limitQuery,
      offset: offsetQuery,
      // Remove many to many table from being included in json response
      // through: {attributes: []}
      include: [
        Category,
        {
          model: Subcategory,
          through: { attributes: [] },
        },
        { model: Tag, through: { attributes: [] } },
      ],
      subQuery: false,
    });

    res.status(200).json({
      data,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/:uuid", async (req, res) => {
  try {
    const product = await Product.findOne({
      where: { uuid: req.params.uuid },
      include: [
        Category,
        { model: Subcategory, through: { attributes: [] } },
        { model: Tag, through: { attributes: [] } },
      ],
    });
    if (!product) {
      return res.status(404).json({ message: "Resource not found" });
    }
    res.status(200).json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // Create transaction
  const t = await sequelize.transaction();
  try {
    // Create product
    const product = await Product.create(req.body, { transaction: t });

    // Add subcategories
    if ("subcategories" in req.body) {
      for (const subcategoryId of req.body.subcategories) {
        const subcategory = await Subcategory.findOne({
          where: { id: subcategoryId },
        });
        if (subcategory) {
          await product.addSubcategory(subcategory, { transaction: t });
        } else {
          throw new Error("Couldn't find subcategory");
        }
      }
    }

    // Add tags
    if ("tags" in req.body) {
      for (const tagId of req.body.tags) {
        const tag = await Tag.findOne({ where: { id: tagId } });
        if (tag) {
          await product.addTag(tag, {
            transaction: t,
          });
        } else {
          throw new Error("Couldn't find tag");
        }
      }
    }

    // No errors, commit
    await t.commit();
    res.status(200).json(product);
  } catch (err) {
    await t.rollback();
    console.log(err);
    res.status(500).json(err);
  }
});

router.put("/:uuid", async (req, res) => {
  // Create transaction
  const t = await sequelize.transaction();
  try {
    // Find product
    let product = await Product.findOne({ where: { uuid: req.params.uuid } });
    if (!product) {
      return res.status(404).json({ message: "Resource not found" });
    }

    // Copy data
    product.name = req.body.name;
    product.price = req.body.price;
    product.categoryId = req.body.categoryId;
    product.description = req.body.description;

    await product.save({ transaction: t });

    // Update subcategories
    await product.removeSubcategories(await product.getSubcategories(), {
      transaction: t,
    });
    if ("subcategories" in req.body) {
      for (const subcategoryId of req.body.subcategories) {
        const subcategory = await Subcategory.findOne({
          where: { id: subcategoryId },
        });
        if (subcategory) {
          await product.addSubcategory(subcategory, { transaction: t });
        } else {
          throw new Error("Couldn't find subcategory");
        }
      }
    }

    // Update tags
    await product.removeTags(await product.getTags(), { transaction: t });
    if ("tags" in req.body) {
      for (const tagId of req.body.tags) {
        const tag = await Tag.findOne({ where: { id: tagId } });
        if (tag) {
          await product.addTag(tag, {
            transaction: t,
          });
        } else {
          throw new Error("Couldn't find tag");
        }
      }
    }

    // No errors, commit
    await t.commit();
    res.status(200).json(product);
  } catch (err) {
    await t.rollback();
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete("/:uuid", async (req, res) => {
  try {
    // Find product
    let product = await Product.findOne({ where: { uuid: req.params.uuid } });
    if (!product) {
      return res.status(404).json({ message: "Resource not found" });
    }

    await product.destroy();

    res.status(204).json({});
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
