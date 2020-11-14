const User = require("./user");
const Product = require("./product");
const OrderItems = require("./order-items");
const Order = require("./order");

User.hasMany(Order);
Order.belongsTo(User);

OrderItems.belongsTo(Product);
OrderItems.belongsTo(Order);

module.exports = {
  User,
  Product,
  OrderItems,
  Order,
};
