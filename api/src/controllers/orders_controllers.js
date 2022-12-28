const { Orders } = require("../db");

const createOrder = async (data) => {
  try {
    if (data.status === "approved") {
      const result = await Orders.create({
        userId: parseInt(data.userId),
        shippingAddress: data.shippingAddress,
        billingAddress: data.billingAddress,
        quantity: data.quantity,
        orderDate: new Date().toISOString(),
        totalPrice: parseFloat(data.totalPrice),
        productId: data.productId,
        branchId: data.branchId,
      });

      return result;
    }
  } catch (error) {
    return error;
  }
};

module.exports = { createOrder };
