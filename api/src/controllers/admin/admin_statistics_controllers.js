const { Sequelize } = require("sequelize");
const { Orders, User } = require("../../db");

const getLastestUsers = async (month = 4) => {
  try {
    let today = new Date();
    today.setMonth(today.getMonth() - month);

    const users = await User.findAll({
      attributes: [
        [Sequelize.literal(`DATE("createdAt")`), "month"],
        [Sequelize.literal(`COUNT(*)`), "count"],
      ],
      where: Sequelize.where(
        Sequelize.fn("date", Sequelize.col("createdAt")),
        ">=",
        today.getFullYear() + "-" + (today.getMonth() + 1) + "-01"
      ),
      group: ["month"],
    });

    return users;
  } catch (error) {
    return error.message;
  }
};

const getUserGrowth = async () => {
  try {
    let today = new Date();
    today.setMonth(today.getMonth() - 1);

    const users = await User.findAll({
      attributes: [
        [Sequelize.literal(`DATE("createdAt")`), "month"],
        [Sequelize.literal(`COUNT(*)`), "count"],
      ],
      where: Sequelize.where(
        Sequelize.fn("date", Sequelize.col("createdAt")),
        ">=",
        today.getFullYear() + "-" + (today.getMonth() + 1) + "-01"
      ),
      order: [["month", "DESC"]],
      group: ["month"],
    });

    if (users.length === 2) {
      const growth = (
        100 -
        (users[1].dataValues.count * 100) / users[0].dataValues.count
      ).toFixed(2);

      return {
        latest: parseInt(users[0].dataValues.count),
        growth: parseFloat(growth),
      };
    } else {
      return "No enough data";
    }
  } catch (error) {
    return error.message;
  }
};

const getLastestOrders = async (month = 4) => {
  try {
    let today = new Date();
    today.setMonth(today.getMonth() - month);

    const users = await Orders.findAll({
      attributes: [
        [Sequelize.literal(`DATE("createdAt")`), "month"],
        [Sequelize.literal(`COUNT(*)`), "count"],
      ],
      where: Sequelize.where(
        Sequelize.fn("date", Sequelize.col("createdAt")),
        ">=",
        today.getFullYear() + "-" + (today.getMonth() + 1) + "-01"
      ),
      group: ["month"],
    });

    return users;
  } catch (error) {
    return error.message;
  }
};

const getOrdersGrowth = async () => {
  try {
    let today = new Date();
    today.setMonth(today.getMonth() - 1);

    const orders = await Orders.findAll({
      attributes: [
        [Sequelize.literal(`DATE("createdAt")`), "month"],
        [Sequelize.literal(`COUNT(*)`), "count"],
      ],
      where: Sequelize.where(
        Sequelize.fn("date", Sequelize.col("createdAt")),
        ">=",
        today.getFullYear() + "-" + (today.getMonth() + 1) + "-01"
      ),
      order: [["month", "DESC"]],
      group: ["month"],
    });

    if (orders.length === 2) {
      const growth = (
        100 -
        (orders[1].dataValues.count * 100) / orders[0].dataValues.count
      ).toFixed(2);

      return {
        latest: parseInt(orders[0].dataValues.count),
        growth: parseFloat(growth),
      };
    } else {
      return "No enough data";
    }
  } catch (error) {
    return error.message;
  }
};

const getOrdersRevenue = async () => {
  try {
    let today = new Date();
    today.setMonth(today.getMonth() - 1);

    const orders = await Orders.findAll({
      attributes: [
        [Sequelize.literal(`DATE("createdAt")`), "month"],
        [Sequelize.literal(`SUM("totalPrice")`), "total"],
      ],
      where: Sequelize.where(
        Sequelize.fn("date", Sequelize.col("createdAt")),
        ">=",
        today.getFullYear() + "-" + (today.getMonth() + 1) + "-01"
      ),
      order: [["month", "DESC"]],
      group: ["month"],
    });

    if (orders.length === 2) {
      const growth = (
        100 -
        (orders[1].dataValues.total * 100) / orders[0].dataValues.total
      ).toFixed(2);

      return { latest: orders[0].dataValues.total, growth: parseFloat(growth) };
    } else {
      return "No enough data";
    }
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  getLastestUsers,
  getLastestOrders,
  getUserGrowth,
  getOrdersGrowth,
  getOrdersRevenue,
};
