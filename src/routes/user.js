const { Router } = require('express');
const axios = require('axios')
const { Op } = require('sequelize')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { User } = require('../db'); // ACA importo donde ejecuto los models de tablas
//const { } = require('../controllers/controllers')
const {
    API_Key
} = process.env;

const router = Router();

router.get('/', async (req, res) => {

    try {

        res.status(200).send('funcionando ruta usuario');

    } catch (e) {

        return res.status(404).json(error)
    }
})

module.exports = router;
