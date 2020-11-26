const router = require("express").Router();
const { Product } = require("../db/models");

router.get("/", async (req, res, next) => {
  await Product.findAll()
    .then((products) => res.send(products))
    .catch(next);
});

router.get("/:id", async (req, res, next) => {
  await Product.findByPk(req.params.id)
    .then((product) => res.send(product))
    .catch(next);
});

router.post("/", async (req, res, next) => {
  await Product.create(req.body)
    .then((product) => res.send(product))
    .catch(next);
});

router.delete("/:id", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    await product.destroy();
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", (req, res, next) => {
  Product.findByPk(req.params.id)
    .then((product) =>
      product.update({
        title: req.body.title,
        description: req.body.description,
        imageURL: req.body.imageURL,
        price: req.body.price,
      })
    )
    .then((product) => res.send(product))
    .catch(next);
});

module.exports = router;
