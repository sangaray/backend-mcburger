const { Router } = require("express");
const {
  getAllUsers,
  disableActivateUser,
  deleteUser,
  createUser,
} = require("../controllers/admin/admin_user_controllers");
const {
  getAllProducts,
  disableActivateProduct,
  deleteProduct,
  createProduct,
} = require("../controllers/admin/admin_product_controllers");
const {
  getAllOrders,
} = require("../controllers/admin/admin_order_controllers");
const {
  getLastestUsers,
  getLastestOrders,
  getUserGrowth,
  getOrdersGrowth,
  getOrdersRevenue,
} = require("../controllers/admin/admin_statistics_controllers");

const router = Router();

router.get("/", async (req, res) => {
  const { month } = req.body;
  try {
    const userData = await getLastestUsers(month);
    const productData = await getLastestOrders(month);
    const userRows = await getAllUsers();
    const productRows = await getAllProducts();
    const userGrowth = await getUserGrowth();
    const ordersGrowth = await getOrdersGrowth();
    const ordersRevenue = await getOrdersRevenue();
    res.send({
      userData,
      productData,
      userRows,
      productRows,
      userGrowth,
      ordersGrowth,
      ordersRevenue,
    });
  } catch (error) {
    res.status(401).send(error.message);
  }
});

// USERS
// Get All Users
router.get("/z8QRPkw5", async (req, res) => {
  try {
    const u = await getAllUsers();
    res.status(200).json(u);
  } catch (e) {
    return res.status(404).send(e.message);
  }
});

// disable/activate User
router.put("/z8QRPkw5", async (req, res) => {
  const { id } = req.body;

  try {
    if (id) {
      const u = await disableActivateUser(id);
      return res.status(200).json(u);
    } else {
      return res.status(401).send(e.message);
    }
  } catch (e) {
    return res.status(401).send(e.message);
  }
});

router.post("/z8QRPkw5", async (req, res) => {
  const {
    name,
    first_name,
    last_name,
    email,
    password,
    phone_number,
    address,
    userType,
    state,
  } = req.body;
  try {
    if (
      !name ||
      !first_name ||
      !last_name ||
      !email ||
      !password ||
      !phone_number ||
      !address ||
      !userType ||
      !state
    ) {
      return res.status(401).send("There is a field missing");
    }

    const user = await createUser(req.body);
    res.send(user);
  } catch (error) {
    res.status(401).send(error.message);
  }
});

router.delete("/z8QRPkw5", async (req, res) => {
  const { id } = req.body;

  try {
    if (id) {
      const u = await deleteUser(id);
      return res.status(200).json(u);
    } else {
      return res.status(401).send(e.message);
    }
  } catch (e) {
    return res.status(401).send(e.message);
  }
});

// PRODUCTS
// Get All products
router.get("/9SjtmuVM", async (req, res) => {
  try {
    const p = await getAllProducts();
    res.status(200).json(p);
  } catch (e) {
    return res.status(404).send(e.message);
  }
});

// disable/activate User
router.put("/9SjtmuVM", async (req, res) => {
  const { id } = req.body;

  try {
    if (id) {
      const p = await disableActivateProduct(id);
      return res.status(200).json(p);
    } else {
      return res.status(401).send(e.message);
    }
  } catch (e) {
    return res.status(401).send(e.message);
  }
});

router.delete("/9SjtmuVM", async (req, res) => {
  const { id } = req.body;

  try {
    if (id) {
      const p = await deleteProduct(id);
      return res.status(200).json(p);
    } else {
      return res.status(401).send(e.message);
    }
  } catch (e) {
    return res.status(401).send(e.message);
  }
});

router.post("/9SjtmuVM", async (req, res) => {
  const { name, ingredients, summary, price, idCategory, image } = req.body;

  try {
    if (!name) return res.status(401).send("No name given");

    const p = await createProduct({
      name,
      ingredients,
      summary,
      price,
      idCategory,
      image,
    });

    res.status(200).send(p);
  } catch (error) {
    res.status(402).send(e.message);
  }
});

// ORDERS
// Get All Orders
router.get("/wFpYZ7MS", async (req, res) => {
  try {
    const orders = await getAllOrders();
    res.send(orders);
  } catch (error) {
    res.status(401).send(error.message);
  }
});

module.exports = router;
