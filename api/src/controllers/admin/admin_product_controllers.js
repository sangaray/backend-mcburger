const { Products } = require("../../db");

const getAllProducts = async () => {
  const products = await Products.findAll({
    attributes: ["id", "name", "image", "price", "state"],
  });
  return products;
};

const disableActivateProduct = async (id) => {
  let product = await Products.findOne({ where: { id } });
  product.state = product.state === "enabled" ? "disabled" : "enabled";
  console.log(product.dataValues);

  product = await Products.update(product.dataValues, { where: { id } });
  return product;
};

const deleteProduct = async (id) => {
  const product = await Products.destroy({ where: { id } });
  return product;
};

const createProduct = async (data) => {
  const product = await Products.create(data);
  return product;
};

module.exports = {
  getAllProducts,
  disableActivateProduct,
  deleteProduct,
  createProduct,
};
