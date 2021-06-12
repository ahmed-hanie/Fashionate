"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // One category has many products
      this.hasMany(models.product, {
        foreignKey: "categoryId",
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
      });

      // One category has many subcategories
      this.belongsToMany(models.subcategory, {
        through: "category_subcategory",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  category.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: { msg: "Name must not be empty" },
        },
      },
    },
    {
      sequelize,
      tableName: "category",
      modelName: "category",
    }
  );
  return category;
};
