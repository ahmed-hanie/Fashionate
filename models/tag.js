"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // One tag can belong to many products
      this.belongsToMany(models.product, {
        through: "product_tag",
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
      });
    }
  }
  tag.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: { msg: "Tag name must not be empty" },
          len: {
            args: [1, 30],
            msg: "Tag name must be between 1 and 30 characters",
          },
        },
      },
    },
    {
      sequelize,
      tableName: "tag",
      modelName: "tag",
    }
  );
  return tag;
};
