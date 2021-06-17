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

/**
 * @api {get} /order/user Request orders for user
 * @apiName GetOrder
 * @apiGroup Order
 *
 * @apiPermission user
 *
 * @apiSuccess {Object[]} data List of orders
 **/
router.get("/user", auth, async (req, res) => {
  try {
    const user = await User.findOne({ where: { uuid: req.user.uuid } });

    let limit = 10;
    if ("limit" in req.query) {
      limit = req.query.limit;
    }

    const data = await Order.findAll({ where: { userId: user.id }, limit });

    let jsonData = data.map((item) => item.toJSON());
    for (let i = 0; i < jsonData.length; i++) {
      jsonData[i] = {
        ...jsonData[i],
        ...(await data[i].getTotalPriceAndQuantity()),
      };
    }

    res.status(200).json({
      data: jsonData,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

/**
 * @api {post} /order Create Order
 * @apiName PostOrder
 * @apiGroup Order
 *
 * @apiPermission user
 *
 * @apiParam {Object[]} products List of products with quantities
 *
 * @apiSuccess {String} uuid Order uuid
 * @apiSuccess {Object[]} products List of products in order with quantities
 **/
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
      await t.commit();
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
