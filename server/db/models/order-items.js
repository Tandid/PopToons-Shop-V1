const Sequelize = require("sequelize");
const db = require("../db");

const OrderItems = db.define("orderItems", {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  },
});

module.exports = OrderItems;
