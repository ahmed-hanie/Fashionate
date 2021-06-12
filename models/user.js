"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // User has many roles
      this.belongsToMany(models.role, {
        through: "user_role",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        as: "roles",
      });

      // One user has many orders
      this.hasMany(models.order);

      // One user has many refresh tokens
      this.hasMany(models.userToken);
    }

    // Find a user by their credentials
    static async findByCredentials(username, password) {
      const user = await this.findOne({
        where: { username: username },
        include: "roles",
      });
      if (!user) return null;
      const isMatch = await bcrypt.compare(password, user.password);
      return isMatch ? user : null;
    }

    // Remove id, password and disabled from json output for security purposes
    toJSON() {
      return {
        ...this.get(),
        id: undefined,
        password: undefined,
        disabled: undefined,
      };
    }
  }
  user.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: { msg: "Username must not be empty" },
          len: {
            args: [5, 255],
            msg: "Username must be at least 5 characters",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Password must not be empty" },
          len: {
            args: [8, 255],
            msg: "Password must be at least 8 characters",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: { msg: "Email must not be empty" },
          isEmail: { msg: "Not a valid email" },
        },
      },
      disabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      tableName: "user",
      modelName: "user",
    }
  );

  // Before save hook - Hash user password
  user.addHook("beforeSave", async (user, options) => {
    if (user.changed("password")) {
      user.password = await bcrypt.hash(user.password, 8);
    }
  });
  return user;
};
