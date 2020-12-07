const Sequelize = require("sequelize");
const db = require("../db");
const { v4: uuidv4 } = require("uuid");

const Order = db.define("order", {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: uuidv4,
  },
  status: {
    type: Sequelize.STRING,
    defaultValue: "cart",
  },
  totalPrice: {
    type: Sequelize.DECIMAL,
    defaultValue: 0,
  },
  firstName: {
    type: Sequelize.STRING, //for when people fill out information for their order
  },
  lastName: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  address: {
    type: Sequelize.TEXT,
  },
});

module.exports = Order;
