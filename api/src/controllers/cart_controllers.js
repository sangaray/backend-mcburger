const { Cart, Products } = require("../db");

const getAllUserCart = async (userId) => {
  try {
    const cart = await Cart.findAll({ where: { userId } });

    let products = {};

    for (const product of cart) {
      const p = await Products.findOne({ where: { id: product.productId } });
      products[p.id] = {
        id: p.id,
        name: p.name,
        image: p.image,
        price: p.price,
        quantity: product.quantity,
        description: p.description,
      };
    }

    return products;
  } catch (error) {
    return error.message;
  }
};

const addToCart = async (userId, productId, quantity = 1) => {
  try {
    const pro = await Cart.findOne({ where: { userId, productId } });

    if (!pro) {
      await Cart.create({ userId, productId, quantity });
      return "Created";
    } else {
      pro.dataValues.quantity += 1;
      await Cart.update(pro.dataValues, { where: { userId, productId } });
      return "Updated";
    }
  } catch (error) {
    return new Error(error.message);
  }
};

const restartCart = async (userId) => {
  try {
    const rows = await Cart.destroy({ where: { userId } });
    return rows;
  } catch (error) {
    return error.message;
  }
};

const deleteFromCart = async (userId, productId) => {
  try {
    const deletedFav = await Cart.destroy({
      where: { userId, productId },
    });
    return deletedFav;
  } catch (error) {
    return error.message;
  }
};

const removeFromCart = async (userId, productId) => {
  try {
    const pro = await Cart.findOne({ where: { userId, productId } });

    if (!pro) {
      await Cart.create({ userId, productId, quantity: 1 });
    } else {
      pro.dataValues.quantity -= 1;
      if (pro.dataValues.quantity < 1) {
        await Cart.destroy({ where: { userId, productId } });
      } else {
        await Cart.update(pro.dataValues, { where: { userId, productId } });
      }
    }
    return "Done";
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  getAllUserCart,
  addToCart,
  restartCart,
  deleteFromCart,
  removeFromCart,
};
