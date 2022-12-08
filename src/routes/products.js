const { Router } = require("express");
const axios = require("axios");
const { Op } = require("sequelize");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { searchProducts } = require("../controllers/products_controller");

const router = Router();

router.get("/", async (req, res) => {
  // Check for params in the query
  const name = req.query.name;

  try {
    // Get all the products from the DB
    const products = await searchProducts();

    // Check if query exists
    if (name) {
      // If it does, search from the DB, and return them
      return res.json(
        products.filter((product) => product.name.toLowerCase().includes(name.toLowerCase()))
      );
    }

    // Otherwise return all products
    return res.status(200).json(products);
  } catch (e) {
    return res.status(404).send(e.message);
  }
});

module.exports = router;
