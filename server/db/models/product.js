const Sequelize = require("sequelize");
const db = require("../db");

const Product = db.define("product", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },

  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },

  imageURL: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "url(images/default_img.jpg)",
  },

  price: {
    type: Sequelize.DECIMAL,
    allowNull: false,
  },

  category: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

module.exports = Product;
