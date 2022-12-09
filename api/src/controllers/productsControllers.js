const axios = require("axios");
const { Products, Categories } = require("../db.js");
const Product = require("../api.json")

const getAllProducts = async () => {
  try {
    /* const mcburger = await Products.findAll(); */
    /* const apiLocal = await axios.get(Product); */
    if (!Product.length) {
      const apiLocal = Product.Meatburgers.map((c) => ({
        id: c.id,
        name: c.name,
        ingredients: c.ingredients,
        summary: c.summary,
        price: c.price,
        categories: c.categories,
        branch: c.branch,
        image: c.image
      }));
      await Products.bulkCreate(apiLocal);
      return apiLocal
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllProducts
}
