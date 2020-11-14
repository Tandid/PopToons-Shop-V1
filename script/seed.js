const { url } = require("inspector");
const db = require("../server/db");
const { User, Product, OrderItems, Order } = require("../server/db/models");

async function seed() {
  await db.sync({ force: true });
  console.log("db synced!");

  //-------USERS-------------------------------------------

  const users = await Promise.all([
    User.create({
      email: "tandid@gmail.com",
      password: "123",
      admin: "true",
      firstName: "Tandid",
    }),
  ]);

  const [tandid] = users;

  //-------PRODUCTS----------------------------------------

  const products = await Promise.all([
    Product.create({
      title: "Aang",
      description: "POP! Avatar the Last Airbender",
      imageURL: "url(images/product_images/aang.png)",
      price: 15.0,
    }),
    Product.create({
      title: "Axel",
      description: "POP! Kingdom Hearts",
      imageURL: "url(images/product_images/axel.png)",
      price: 15.0,
    }),
    Product.create({
      title: "Boruto",
      description: "POP! Boruto: Next Generations",
      imageURL: "url(images/product_images/boruto.png)",
      price: 15.0,
    }),
    Product.create({
      title: "Broly",
      description: "POP! Dragon Ball Z",
      imageURL: "url(images/product_images/broly.png)",
      price: 15.0,
    }),
    Product.create({
      title: "Captain America",
      description: "POP! Marvel Avengers",
      imageURL: "url(images/product_images/captain_america.png)",
      price: 15.0,
    }),
    Product.create({
      title: "Crash",
      description: "POP! Crash Bandicoot",
      imageURL: "url(images/product_images/crash_bandicoot.png)",
      price: 15.0,
    }),
    Product.create({
      title: "Dabi",
      description: "POP! My Hero Academia",
      imageURL: "url(images/product_images/dabi.png)",
      price: 15.0,
    }),
    Product.create({
      title: "Dwight Schrute",
      description: "POP! The Office",
      imageURL: "url(images/product_images/dwight.png)",
      price: 15.0,
    }),
    Product.create({
      title: "Gaara",
      description: "POP! Naruto Shippuden",
      imageURL: "url(images/product_images/gaara.png)",
      price: 15.0,
    }),
    Product.create({
      title: "Gohan",
      description: "POP! Dragon Ball Z",
      imageURL: "url(images/product_images/gohan.png)",
      price: 15.0,
    }),
    Product.create({
      title: "Goku Ultra Instinct Form",
      description: "POP! Dragon Ball Super",
      imageURL: "url(images/product_images/goku_ultra.png)",
      price: 15.0,
    }),
  ]);

  const [a, b, c, d, e, f, g, h, i, j] = products;

  //--------------------------------------------------------

  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${products.length} products`);
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
