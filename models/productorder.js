"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class productOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  productOrder.init(
    {
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: { args: 1, msg: "There must be at least 1 of the product" },
        },
      },
    },
    {
      sequelize,
      tableName: "product_order",
      modelName: "productOrder",
      timestamps: false,
    }
  );
  return productOrder;
};
