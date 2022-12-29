const { Router } = require("express");
const router = Router();
const { createPayment } = require("../controllers/payment_Controller");

router.post("/", async (req, res) => {
  const data = req.body;
  console.log(data);
  try {
    const response = await createPayment(data);
    console.log(response);
    res.status(200).json(response);
  } catch (e) {
    return res.status(404).send({ e: e.message });
  }
});

module.exports = router;
