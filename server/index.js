const app = require("./app");
const {
  sequelize,
  role: Role,
  category: Category,
  product: Product,
  order: Order,
  user: User,
  productOrder: ProductOrder,
} = require("../models");

if (process.env.NODE_ENV == "development") {
  app.listen(process.env.PORT, () => {});
  // Bad - Don't use in production
  // Drops tables and recreates them
  sequelize.sync({ force: true }).then(async () => {
    // Bad - Use seeders instead
    Role.create({ name: "admin" });
    Role.create({ name: "user" });

    const user = await User.create({
      username: "hello",
      password: "12345678",
      email: "zeft@email.com",
    });

    const category = await Category.create({ name: "clothes" });

    const product = await Product.create({ name: "RTX 3090", price: 50 });
    await product.setCategory(category);
    const product1 = await Product.create({ name: "RTX 3080", price: 40 });
    await product1.setCategory(category);

    const order = await Order.create();
    order.setUser(user);

    order.addProductQty(ProductOrder, product, 2);
    order.addProductQty(ProductOrder, product1, 3);

    const fetchedOrder = await Order.findOne({
      where: { id: order.id },
      include: Product,
    });
    console.log(await order.getTotalPrice());
  });
  console.log(`Server is up on http://localhost:${process.env.PORT}`);
}

// TODO: Code for production
