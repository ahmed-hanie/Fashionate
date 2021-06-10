"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // One product has one main category
      this.belongsTo(models.category, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      // One product has many subcategories
      this.belongsToMany(models.subcategory, {
        through: "product_subcategory",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      // One product has many tags
      this.belongsToMany(models.tag, {
        through: "product_tag",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      // One product can be included in many orders
      this.belongsToMany(models.order, {
        through: models.productOrder,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }

    // Remove id from json output for security purposes
    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }
  product.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Name must not be empty" },
        },
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          isFloat: { msg: "Price must be a number" },
          gtZero(value) {
            if (value <= 0) {
              throw new Error("Price must be greater than zero");
            }
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "product",
      modelName: "product",
    }
  );
  return product;
};
