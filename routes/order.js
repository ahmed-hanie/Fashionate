const express = require("express");
const router = new express.Router();
const searchBuilder = require("sequelize-search-builder");
const {
  order: Order,
  user: User,
  productOrder: ProductOrder,
  product: Product,
  Sequelize,
  sequelize,
} = require("../models");

// Middlewares
const auth = require("../middleware/auth");

router.get("/user/:uuid", auth, async (req, res) => {
  try {
    // Check if user is requesting their orders
    if (req.user.uuid !== req.params.uuid) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Query builder
    const search = new searchBuilder(Sequelize, req.query);
    const whereQuery = search.getWhereQuery();
    const orderQuery = search.getOrderQuery();
    const limitQuery = search.getLimitQuery();
    const offsetQuery = search.getOffsetQuery();

    // Find orders
    const data = await Order.findAll({
      where: whereQuery,
      order: orderQuery,
      limit: limitQuery,
      offset: offsetQuery,
      include: Product,
    });

    res.status(200).json({
      data,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/", auth, async (req, res) => {
  // Create transaction
  const t = await sequelize.transaction();
  try {
    const user = await User.findOne({ where: { uuid: req.user.uuid } });
    const order = await Order.create({ userId: user.id }, { transaction: t });

    if ("products" in req.body) {
      for (const productInfo of req.body.products) {
        const product = await Product.findOne({
          where: { uuid: productInfo.uuid },
        });
        await ProductOrder.create(
          {
            productId: product.id,
            orderId: order.id,
            quantity: productInfo.quantity,
          },
          { transaction: t }
        );
      }
    } else {
      // Order without products???
      await t.rollback();
      res.status(400).json({ message: "Bad Request [Order missing products]" });
    }

    res.status(200).json(order);
  } catch (err) {
    await t.rollback();
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
