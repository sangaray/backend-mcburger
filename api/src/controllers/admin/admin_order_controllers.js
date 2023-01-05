const { Orders } = require("../../db");

const getAllOrders = async () => {
  try {
    const orders = Orders.findAll();
    return orders;
  } catch (error) {
    return error.message;
  }
};

module.exports = { getAllOrders };
