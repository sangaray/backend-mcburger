const { Router } = require('express');
const { getCategories } = require('../controllers/categories_controller')

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

module.exports = router;
