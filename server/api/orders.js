const router = require("express").Router();
const { Order, OrderItems } = require("../db/models");

router.get("/", (req, res, next) => {
  Order.findAll()
    .then((orders) =>
      orders.sort(function (a, b) {
        a = new Date(a.updatedAt);
        b = new Date(b.updatedAt);
        return a > b ? 1 : a < b ? -1 : 0;
      })
    )
    .then((orders) => res.send(orders))
    .catch(next);
});

router.get("/:id", (req, res, next) => {
  Order.findByPk(req.params.id)
    .then((orders) => res.send(orders))
    .catch(next);
});

router.put("/:id", (req, res, next) => {
  Order.findByPk(req.params.id)
    .then((order) =>
      order.update({
        status: req.body.status,
        totalPrice: req.body.totalPrice,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        address: req.body.address,
      })
    )
    .then((order) => res.send(order))
    .catch(next);
});

router.post("/", (req, res, next) => {
  Order.create(req.body)
    .then((order) => res.status(201).send(order))
    .catch(next);
});

// GET ALL ORDER ITEMS
router.get("/:id/orderItems", (req, res, next) => {
  OrderItems.findAll({
    where: { orderId: req.params.id },
  })
    .then((orderItems) => res.send(orderItems))
    .catch(next);
});

// GET SINGLE ORDER ITEM
router.get("/:id/orderItems/:productId", (req, res, next) => {
  OrderItems.findOne({
    where: { orderId: req.params.id, productId: req.params.productId },
  })
    .then((orderItem) => res.send(orderItem))
    .catch(next);
});

// CHANGE SINGLE ORDER ITEM
router.put("/:id/orderItems/:productId", (req, res, next) => {
  OrderItems.findOne({
    where: { orderId: req.params.id, productId: req.params.productId },
  })
    .then((orderItem) =>
      orderItem.update({
        orderId: req.body.orderId,
        productId: req.body.productId,
        quantity: req.body.quantity,
      })
    )
    .then((orderItem) => res.send(orderItem))
    .catch(next);
});

// DELETE SINGLE ORDER ITEM
router.delete("/:id/orderItems/:productId", async (req, res, next) => {
  try {
    const orderItem = await OrderItems.findOne({
      where: { orderId: req.params.id, productId: req.params.productId },
    });
    await orderItem.destroy();
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
