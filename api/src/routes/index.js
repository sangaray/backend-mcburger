const { Router } = require("express");
const router = Router();
const {getAllProducts} = require("../controllers/productsControllers")

router.get("/", async (req, res) => {
  const a = await getAllProducts();
  res.status(200).send(a);
});


module.exports = router;
