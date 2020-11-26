const router = require("express").Router();
const { OrderItems } = require("../db/models");

// GET ALL ORDER ITEMS
router.get("/", async (req, res, next) => {
  await OrderItems.findAll()
    .then((orderItems) =>
      orderItems.sort(function (a, b) {
        a = new Date(a.createdAt);
        b = new Date(b.createdAt);
        return a > b ? 1 : a < b ? -1 : 0;
      })
    )
    .then((orderItems) => res.send(orderItems))
    .catch(next);
});

router.get("/:orderId", async (req, res, next) => {
  await OrderItems.findAll({ where: { orderId: req.params.orderId } })
    .then((orderItems) => res.send(orderItems))
    .catch(next);
});

router.get("/:orderId/:productId", async (req, res, next) => {
  await OrderItems.findAll({
    where: { orderId: req.params.orderId, productId: req.params.productId },
  })
    .then((orderItems) => res.send(orderItems))
    .catch(next);
});

router.post("/", (req, res, next) => {
  OrderItems.create(req.body)
    .then((orderItem) => res.status(201).send(orderItem))
    .catch(next);
});

module.exports = router;
