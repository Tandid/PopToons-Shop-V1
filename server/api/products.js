const router = require("express").Router();
const { Product } = require("../db/models");

router.get("/", async (req, res, next) => {
  await Product.findAll()
    .then((products) => res.send(products))
    .catch(next);
});

module.exports = router;
