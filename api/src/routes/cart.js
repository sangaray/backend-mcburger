const { Router } = require("express");
const router = Router();
const {
  getAllUserCart,
  addToCart,
  deleteFromCart,
  restartCart,
  removeFromCart,
} = require("../controllers/cart_controllers");

router.get("/", (req, res) => {
  res.send("You should provide a user");
});

router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      res.status(401).send("There is missing data");
    }

    const favs = await getAllUserCart(userId);
    res.status(200).send(favs);
  } catch (error) {
    res.status(401).send(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId) {
      res.status(401).send("There is missing data");
    }
    const newFav = await addToCart(userId, productId, quantity);
    res.status(200).send(newFav);
  } catch (error) {
    res.send(error.message);
  }
});

router.delete("/", async (req, res) => {
  try {
    const { userId, productId } = req.query;

    if (userId && !productId) {
      await restartCart(userId);
    } else if (userId && productId) {
      await deleteFromCart(userId, productId);
    }

    res.sendStatus(200);
  } catch (error) {
    res.status(401).send(error.message);
  }
});

router.put("/", async (req, res) => {
  try {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
      res.status(401).send("There is missing data");
    }

    await removeFromCart(userId, productId);

    res.send("Updated");
  } catch (error) {
    res.status(401).send(error.message);
  }
});

module.exports = router;
