"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // One order can belong to one user
      this.belongsTo(models.user);

      // One order can have many products
      this.belongsToMany(models.product, {
        through: models.productOrder,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }

    // Return total price of order
    async getTotalPrice() {
      let sum = 0;

      // If products were already fetched, no need to fetch them again
      const products = this.products ? this.products : await this.getProducts();

      products.forEach((item) => {
        sum += item.price * item.productOrder.quantity;
      });
      return sum;
    }

    async getTotalPriceAndQuantity() {
      let totalSum = 0;
      let totalQty = 0;

      // If products were already fetched, no need to fetch them again
      const products = this.products ? this.products : await this.getProducts();

      products.forEach((item) => {
        totalSum += item.price * item.productOrder.quantity;
        totalQty += item.productOrder.quantity;
      });
      return { totalSum, totalQty };
    }

    // Add product with quantity
    async addProductQty(ProductOrder, product, quantity) {
      await ProductOrder.create({
        quantity,
        productId: product.id,
        orderId: this.id,
      });
    }

    // Remove id, userId from json output for security purposes
    toJSON() {
      return { ...this.get(), id: undefined, userId: undefined };
    }
  }
  order.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
    },
    {
      sequelize,
      tableName: "order",
      modelName: "order",
    }
  );
  return order;
};
