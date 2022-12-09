const { Router } = require('express');
const { getCategories, getAllCategories } = require('../controllers/categories_controller');
const router = Router();

router.get('/', async (req, res) => {

  try {
    const a = await getCategories();
    //res.status(200).JSON(a);
    res.status(200).json(a);    

  } catch (e) {

    return res.status(404).send('e.error')
  }
})

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    if (!isNaN(id) && !isNaN(parseInt(id))) {
      const categories = await getAllCategories();

      return res.json(
        categories.filter((product) => parseInt(product.id) === parseInt(id))
      );
    }

    res.status(404).send("Not found with that ID");
  } catch (e) {
    res.status(401).send(e.message);
  }
});

module.exports = router;