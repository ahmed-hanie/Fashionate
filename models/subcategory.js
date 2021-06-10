"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class subcategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // The same subcategory can belong to many categories
      this.belongsToMany(models.category, {
        through: "category_subcategory",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      // The same subcategory can belong to many products
      this.belongsToMany(models.product, {
        through: "product_subcategory",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  subcategory.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Name must not be empty" },
        },
      },
    },
    {
      sequelize,
      tableName: "subcategory",
      modelName: "subcategory",
    }
  );
  return subcategory;
};
