const { url } = require("inspector");
const db = require("../server/db");
const { User, Product, OrderItems, Order } = require("../server/db/models");

async function seed() {
  await db.sync({ force: true });
  console.log("db synced!");

  //-------USERS-------------------------------------------

  const users = await Promise.all([
    User.create({
      firstName: "Tandid",
      lastName: "Alam",
      email: "tandid@gmail.com",
      password: "123",
      admin: "true",
      imageURL: "images/profilepic.jpg",
    }),
    User.create({
      firstName: "Jim",
      lastName: "Halpert",
      email: "jim@gmail.com",
      password: "123",
      admin: "false",
    }),
  ]);

  const [tandid, jim] = users;

  //-------PRODUCTS----------------------------------------

  const products = await Promise.all([
    Product.create({
      title: "Aang",
      description: "POP! Avatar the Last Airbender",
      imageURL: "images/product_images/aang.png",
      price: 15.0,
    }),
    Product.create({
      title: "Axel",
      description: "POP! Kingdom Hearts",
      imageURL: "images/product_images/axel.png",
      price: 15.0,
    }),
    Product.create({
      title: "Boruto",
      description: "POP! Boruto: Next Generations",
      imageURL: "images/product_images/boruto.png",
      price: 15.0,
    }),
    Product.create({
      title: "Broly",
      description: "POP! Dragon Ball Z",
      imageURL: "images/product_images/broly.png",
      price: 15.0,
    }),
    Product.create({
      title: "Captain America",
      description: "POP! Marvel Avengers",
      imageURL: "images/product_images/captain_america.png",
      price: 15.0,
    }),
    Product.create({
      title: "Crash",
      description: "POP! Crash Bandicoot",
      imageURL: "images/product_images/crash_bandicoot.png",
      price: 15.0,
    }),
    Product.create({
      title: "Dabi",
      description: "POP! My Hero Academia",
      imageURL: "images/product_images/dabi.png",
      price: 15.0,
    }),
    Product.create({
      title: "Dwight Schrute",
      description: "POP! The Office",
      imageURL: "images/product_images/dwight.png",
      price: 15.0,
    }),
    Product.create({
      title: "Gaara",
      description: "POP! Naruto Shippuden",
      imageURL: "images/product_images/gaara.png",
      price: 15.0,
    }),
    Product.create({
      title: "Gohan",
      description: "POP! Dragon Ball Z",
      imageURL: "images/product_images/gohan.png",
      price: 15.0,
    }),
    Product.create({
      title: "Goku Ultra Instinct Form",
      description: "POP! Dragon Ball Super",
      imageURL: "images/product_images/goku_ultra.png",
      price: 15.0,
    }),
    Product.create({
      title: "Goku",
      description: "POP! Dragon Ball Z",
      imageURL: "images/product_images/goku.png",
      price: 15.0,
    }),
    Product.create({
      title: "Grimmjaw",
      description: "POP! Bleach",
      imageURL: "images/product_images/grimmjaw.png",
      price: 15.0,
    }),
    Product.create({
      title: "Harry Potter",
      description: "POP! Harry Potter",
      imageURL: "images/product_images/harrypotter.png",
      price: 15.0,
    }),
    Product.create({
      title: "Ichigo",
      description: "POP! Bleach",
      imageURL: "images/product_images/ichigo.png",
      price: 15.0,
    }),
    Product.create({
      title: "Itachi",
      description: "POP! Naruto Shippuden",
      imageURL: "images/product_images/itachi.png",
      price: 15.0,
    }),
    Product.create({
      title: "Kevin Durant",
      description: "POP! NBA",
      imageURL: "images/product_images/kevin_durant.png",
      price: 15.0,
    }),
    Product.create({
      title: "Lebron James",
      description: "POP! NBA",
      imageURL: "images/product_images/lebron_james.png",
      price: 15.0,
    }),
    Product.create({
      title: "Luffy",
      description: "POP! One Piece",
      imageURL: "images/product_images/luffy.png",
      price: 15.0,
    }),
    Product.create({
      title: "Vegeta",
      description: "POP! Dragon Ball Z",
      imageURL: "images/product_images/majin_vegeta.png",
      price: 15.0,
    }),
    Product.create({
      title: "Master Chief",
      description: "POP! Halo",
      imageURL: "images/product_images/master_chief.png",
      price: 15.0,
    }),
    Product.create({
      title: "Mewtwo",
      description: "POP! Pokemon",
      imageURL: "images/product_images/mewtwo.png",
      price: 15.0,
    }),
    Product.create({
      title: "Naruto",
      description: "POP! Naruto Shippuden",
      imageURL: "images/product_images/naruto.png",
      price: 15.0,
    }),
    Product.create({
      title: "Ninetails",
      description: "POP! Naruto Shippuden",
      imageURL: "images/product_images/ninetales.png",
      price: 15.0,
    }),
    Product.create({
      title: "Obito",
      description: "POP! Naruto Shippuden",
      imageURL: "images/product_images/Obito.png",
      price: 15.0,
    }),
    Product.create({
      title: "One Punchman",
      description: "POP! One Punchman",
      imageURL: "images/product_images/one_punchman.png",
      price: 15.0,
    }),
    Product.create({
      title: "Pikachu",
      description: "POP! Pokemon",
      imageURL: "images/product_images/pikachu.png",
      price: 15.0,
    }),
    Product.create({
      title: "Renji",
      description: "POP! Bleach",
      imageURL: "images/product_images/renji.png",
      price: 15.0,
    }),
    Product.create({
      title: "Sora",
      description: "POP! Kingdom Hearts",
      imageURL: "images/product_images/sora.png",
      price: 15.0,
    }),
    Product.create({
      title: "Todoroki",
      description: "POP! My Hero Academia",
      imageURL: "images/product_images/todoroki.png",
      price: 15.0,
    }),
    Product.create({
      title: "Tony Stark",
      description: "POP! Avengers",
      imageURL: "images/product_images/tony_stark.png",
      price: 15.0,
    }),
    Product.create({
      title: "Zoro",
      description: "POP! One Piece",
      imageURL: "images/product_images/zoro.png",
      price: 15.0,
    }),
    Product.create({
      title: "Zuko",
      description: "POP! Avatar the Last Airbender",
      imageURL: "images/product_images/zuko.png",
      price: 15.0,
    }),
  ]);

  const [a, b, c, d, e, f, g, h, i, j] = products;

  //--------------------------------------------------------

  const orders = await Promise.all([
    Order.create({
      userId: jim.id,
      status: "in-cart",
      totalPrice: parseFloat(h.price),
    }),
    Order.create({
      userId: tandid.id,
      status: "in-cart",
      totalPrice: parseFloat(i.price) + parseFloat(j.price),
    }),
    Order.create({
      userId: tandid.id,
      status: "completed",
      totalPrice: parseFloat(d.price) + parseFloat(g.price),
    }),
  ]);

  const [activeOrder1, activeOrder2, completedOrder] = orders;

  const order1 = await Promise.all([
    OrderItems.create({ productId: h.id, orderId: activeOrder1.id }),
  ]);
  const order2 = await Promise.all([
    OrderItems.create({ productId: i.id, orderId: activeOrder2.id }),
    OrderItems.create({ productId: j.id, orderId: activeOrder2.id }),
  ]);
  const order3 = await Promise.all([
    OrderItems.create({ productId: d.id, orderId: completedOrder.id }),
    OrderItems.create({ productId: g.id, orderId: completedOrder.id }),
  ]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${products.length} products`);
  console.log(`seeded ${orders.length} products`);
  console.log(`seeded successfully`);
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
