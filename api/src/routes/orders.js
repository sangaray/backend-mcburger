const { Router } = require('express');
const axios = require('axios')
const { Op } = require('sequelize')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { getOrders } = require('../controllers/paymentBd');
const  router  = Router()

router.get('/', getOrders);

module.exports = router;