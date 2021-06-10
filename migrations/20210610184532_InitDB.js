const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable() => "category", deps: []
 * createTable() => "role", deps: []
 * createTable() => "subcategory", deps: []
 * createTable() => "tag", deps: []
 * createTable() => "user", deps: []
 * createTable() => "order", deps: [user]
 * createTable() => "product", deps: [category]
 * createTable() => "product_order", deps: [order, product]
 * createTable() => "category_subcategory", deps: [category, subcategory]
 * createTable() => "product_subcategory", deps: [product, subcategory]
 * createTable() => "product_tag", deps: [product, tag]
 * createTable() => "user_role", deps: [role, user]
 *
 */

const info = {
  revision: 1,
  name: "InitDB",
  created: "2021-06-10T18:45:32.090Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "createTable",
    params: [
      "category",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        name: { type: Sequelize.STRING, field: "name", allowNull: false },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "role",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING,
          field: "name",
          unqiue: true,
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "subcategory",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        name: { type: Sequelize.STRING, field: "name", allowNull: false },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "tag",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        name: { type: Sequelize.STRING, field: "name", allowNull: false },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "user",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        uuid: {
          type: Sequelize.UUID,
          field: "uuid",
          defaultValue: Sequelize.UUIDV4,
        },
        username: {
          type: Sequelize.STRING,
          field: "username",
          unique: true,
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING,
          field: "password",
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          field: "email",
          unique: true,
          allowNull: false,
        },
        disabled: {
          type: Sequelize.BOOLEAN,
          field: "disabled",
          defaultValue: 0,
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "order",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        uuid: {
          type: Sequelize.UUID,
          field: "uuid",
          defaultValue: Sequelize.UUIDV4,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        userId: {
          type: Sequelize.INTEGER,
          field: "userId",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "user", key: "id" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "product",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        uuid: {
          type: Sequelize.UUID,
          field: "uuid",
          defaultValue: Sequelize.UUIDV4,
        },
        name: { type: Sequelize.STRING, field: "name", allowNull: false },
        price: { type: Sequelize.FLOAT, field: "price", allowNull: false },
        description: {
          type: Sequelize.TEXT,
          field: "description",
          allowNull: true,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        categoryId: {
          type: Sequelize.INTEGER,
          field: "categoryId",
          onUpdate: "CASCADE",
          onDelete: "RESTRICT",
          references: { model: "category", key: "id" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "product_order",
      {
        quantity: {
          type: Sequelize.INTEGER,
          field: "quantity",
          allowNull: false,
        },
        orderId: {
          type: Sequelize.INTEGER,
          field: "orderId",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "order", key: "id" },
          primaryKey: true,
        },
        productId: {
          type: Sequelize.INTEGER,
          field: "productId",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "product", key: "id" },
          primaryKey: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "category_subcategory",
      {
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        categoryId: {
          type: Sequelize.INTEGER,
          field: "categoryId",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "category", key: "id" },
          primaryKey: true,
        },
        subcategoryId: {
          type: Sequelize.INTEGER,
          field: "subcategoryId",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "subcategory", key: "id" },
          primaryKey: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "product_subcategory",
      {
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        productId: {
          type: Sequelize.INTEGER,
          field: "productId",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "product", key: "id" },
          primaryKey: true,
        },
        subcategoryId: {
          type: Sequelize.INTEGER,
          field: "subcategoryId",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "subcategory", key: "id" },
          primaryKey: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "product_tag",
      {
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        productId: {
          type: Sequelize.INTEGER,
          field: "productId",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "product", key: "id" },
          primaryKey: true,
        },
        tagId: {
          type: Sequelize.INTEGER,
          field: "tagId",
          onUpdate: "CASCADE",
          onDelete: "RESTRICT",
          references: { model: "tag", key: "id" },
          primaryKey: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "user_role",
      {
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        roleId: {
          type: Sequelize.INTEGER,
          field: "roleId",
          onUpdate: "CASCADE",
          onDelete: "RESTRICT",
          references: { model: "role", key: "id" },
          primaryKey: true,
        },
        userId: {
          type: Sequelize.INTEGER,
          field: "userId",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "user", key: "id" },
          primaryKey: true,
        },
      },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "dropTable",
    params: ["category", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["order", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["product", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["product_order", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["role", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["subcategory", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["tag", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["user", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["category_subcategory", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["product_subcategory", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["product_tag", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["user_role", { transaction }],
  },
];

const pos = 0;
const useTransaction = true;

const execute = (queryInterface, sequelize, _commands) => {
  let index = pos;
  const run = (transaction) => {
    const commands = _commands(transaction);
    return new Promise((resolve, reject) => {
      const next = () => {
        if (index < commands.length) {
          const command = commands[index];
          console.log(`[#${index}] execute: ${command.fn}`);
          index++;
          queryInterface[command.fn](...command.params).then(next, reject);
        } else resolve();
      };
      next();
    });
  };
  if (useTransaction) return queryInterface.sequelize.transaction(run);
  return run(null);
};

module.exports = {
  pos,
  useTransaction,
  up: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, migrationCommands),
  down: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, rollbackCommands),
  info,
};
