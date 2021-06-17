const app = require("./app");
const {
  sequelize,
  role: Role,
  category: Category,
  subcategory: Subcategory,
  product: Product,
  order: Order,
  user: User,
  productOrder: ProductOrder,
  tag: Tag,
} = require("../models");

if (process.env.NODE_ENV == "development") {
  app.listen(process.env.PORT, () => {});
  // Bad - Don't use in production
  // Drops tables and recreates them
  sequelize.sync({ force: true }).then(async () => {
    // Bad - Use seeders instead
    const userRole = Role.create({ name: "user" });
    const role = await Role.create({ name: "admin" });

    const user = await User.create({
      username: "hello",
      password: "12345678",
      email: "zeft@email.com",
    });

    user.addRole(role);

    const user1 = await User.create({
      username: "user1",
      password: "user1234",
      email: "yep@email.com",
    });

    user1.addRole(userRole);

    const category = await Category.create({ name: "Shirts" });
    const category1 = await Category.create({ name: "Pants" });
    const category2 = await Category.create({ name: "Shoes" });
    const category3 = await Category.create({ name: "TobeDeleted" });

    const subcategory = await Subcategory.create({ name: "Shirts Cut" });
    const subcategory1 = await Subcategory.create({ name: "Shirts Sleeves" });
    const subcategory2 = await Subcategory.create({ name: "Pants Jeans" });
    const subcategory3 = await Subcategory.create({ name: "Pants Sports" });
    const subcategory4 = await Subcategory.create({ name: "Shoes Sneakers" });
    const subcategory5 = await Subcategory.create({ name: "Shoes Formal" });
    const tag = await Tag.create({ name: "Sale" });
    const tag1 = await Tag.create({ name: "Trending" });
    const tag2 = await Tag.create({ name: "A Tag" });

    await category.addSubcategory(subcategory);
    await category.addSubcategory(subcategory1);
    await category1.addSubcategory(subcategory2);
    await category1.addSubcategory(subcategory3);
    await category2.addSubcategory(subcategory4);
    await category2.addSubcategory(subcategory5);

    const product = await Product.create({
      name: "Shirts Cut 1",
      price: 50,
      description:
        "A very A very A very A very A very A very A very A very looooooooooooooooooooooooooong desc",
    });
    await product.setCategory(category);
    await product.addTag(tag);
    await product.addSubcategory(subcategory);
    const product1 = await Product.create({ name: "Shirts Cut 2", price: 40 });
    await product1.setCategory(category);
    await product1.addSubcategory(subcategory);

    const product2 = await Product.create({
      name: "Shirts Sleeves 1",
      price: 40,
    });
    await product2.setCategory(category);
    await product2.addSubcategory(subcategory1);

    const product15 = await Product.create({
      name: "Shirts Sleeves 2",
      price: 45,
    });
    await product15.setCategory(category);
    await product15.addSubcategory(subcategory1);

    const product3 = await Product.create({
      name: "Pants Jeans 1",
      price: 40,
    });
    await product3.setCategory(category1);
    await product3.addSubcategory(subcategory2);

    const product4 = await Product.create({
      name: "Pants Jeans 2",
      price: 45,
    });
    await product4.setCategory(category1);
    await product4.addSubcategory(subcategory2);

    const product5 = await Product.create({
      name: "Pants Sports 1",
      price: 35,
    });
    await product5.setCategory(category1);
    await product5.addSubcategory(subcategory3);
    await product5.addTag(tag);

    const product6 = await Product.create({
      name: "Pants Sports 2",
      price: 60,
    });
    await product6.setCategory(category1);
    await product6.addSubcategory(subcategory3);
    await product6.addTag(tag1);

    const product7 = await Product.create({
      name: "Shoes Sneakers 1",
      price: 60,
    });
    await product7.setCategory(category2);
    await product7.addSubcategory(subcategory4);
    await product7.addTag(tag);

    const product8 = await Product.create({
      name: "Shoes Sneakers 2",
      price: 75,
    });
    await product8.setCategory(category2);
    await product8.addSubcategory(subcategory4);
    await product8.addTag(tag1);
    await product8.addTag(tag);

    const product9 = await Product.create({
      name: "Shoes Formal 1",
      price: 99,
    });
    await product9.setCategory(category2);
    await product9.addSubcategory(subcategory5);
    await product9.addTag(tag);

    const product10 = await Product.create({
      name: "Shoes Formal 2",
      price: 52,
    });
    await product10.setCategory(category2);
    await product10.addSubcategory(subcategory5);
    await product10.addTag(tag1);
  });
  console.log(`Server is up on http://localhost:${process.env.PORT}`);
}

// TODO: Code for production
