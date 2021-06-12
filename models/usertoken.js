"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class userToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // One token can belong to one user
      this.belongsTo(models.user);
    }
  }
  userToken.init(
    {
      token: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Token must not be empty" },
        },
      },
    },
    {
      sequelize,
      tableName: "user_token",
      modelName: "userToken",
    }
  );
  return userToken;
};
