"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // The same role can be given to many users
      this.belongsToMany(models.user, {
        through: "user_role",
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
      });
    }
  }
  role.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unqiue: true,
        validate: {
          notEmpty: { msg: "Role name must not be empty" },
        },
      },
    },
    {
      sequelize,
      tableName: "role",
      modelName: "role",
    }
  );
  return role;
};
