const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.STRING,
    defaultValue: 'cart' 
  },
  totalPrice: {
    type: Sequelize.DECIMAL,
    defaultValue: 0
  },
  firstName: {
    type: Sequelize.STRING //for when people fill out information for their order
  },
  lastName: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  address: {
    type: Sequelize.TEXT
  }
})

module.exports = Order