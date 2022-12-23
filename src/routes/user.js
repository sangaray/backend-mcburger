const { Router } = require('express');
const { Op } = require('sequelize')
const jwt = require('jsonwebtoken');
const { KEY_SECRET } = process.env;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { User } = require('../db'); // ACA importo donde ejecuto los models de tablas
//const { } = require('../controllers/controllers')
const { generateUser, getUsers, updateUser, findUserBbdd } = require('../controllers/user_controller');
const { user } = require('pg/lib/defaults');

const router = Router();

router.get('/', validateToken, async (req, res) => {

    try {

        const allUsers = await getUsers();
        res.status(200).json(allUsers);

    } catch (e) {

        return res.status(404).json(e.message)
    }
})

router.post('/', async (req, res) => {

    try {
        //console.log(req.body.email + 'ññ');
        const user = await generateUser(req.body);
        //console.log(user, ' usuariooooo');
        const userBbdd = await findUserBbdd(user.email);
        //console.log(userBbdd, ' aaaaaa');
        //const data = { email: userBbdd.email }
        if (userBbdd.email) {
            const token = jwt.sign({ email: userBbdd.email }, KEY_SECRET, { expiresIn: '1m' })
            const data = {
                email: userBbdd.email,
                name: userBbdd.name,
                picture: userBbdd.picture,
                wallet: userBbdd.wallet,
                userType: userBbdd.userType,
                address: userBbdd.address,
                phone: userBbdd.phone_number,
                token: token,
                register: 'google',
                error: false
            }
            //console.log(data.token + ' <-TOKEN');
            res.status(200).json(data);
        }
    } catch (e) {
        res.status(405).json({ msg: e.error })
    }
})

router.put('/', async (req, res) => {

    try {

        const updated = await updateUser(req.body);
        res.status(201).json(updated)

    } catch (e) {

        return res.status(404).json(e.message)
    }
})

router.post('/login', async (req, res) => {

    try {
        const { email, password } = req.body
        console.log(email + ' | ' + password);
        const userBbdd = await findUserBbdd(email);
        // console.log(userBbdd + '9999');
        if (userBbdd.msg == 'error') res.status(201).json({ msg: 'nadda' })

        if (password == userBbdd.password) {
            const token = jwt.sign({ email: userBbdd.email }, KEY_SECRET, { expiresIn: '1m' })
             //console.log('CORRECTOOOOO');
            const data = {
                email: userBbdd.email,
                name: userBbdd.name,
                picture: userBbdd.picture,
                wallet: userBbdd.wallet,
                userType: userBbdd.userType,
                address: userBbdd.address,
                phone: userBbdd.phone_number,
                token: token,
                register: 'bbdd',
                error: false
            }
            res.status(201).json(data)
        } else {
            console.log('ERROR EN PASSWORD');
            const data = {
                email: null,
                name: null,
                picture: null,
                wallet: null,
                userType: null,
                address: null,
                phone: null,
                token: null,
                register: null,
                error: true
            }
            res.status(201).json(data)
        }

    } catch (e) {
        return res.status(404).json(e.message)
    }
})


router.post('/test', validateToken, async (req, res) => {

    try {
        const { email } = req.body
        const userBbdd = await findUserBbdd(email);

        const data = {
            email: userBbdd.email,
            name: userBbdd.name,
            picture: userBbdd.picture,
            wallet: userBbdd.wallet,
            userType: userBbdd.userType
        }
        res.status(201).json({ data })

    } catch (e) {

        return res.status(404).json(e.message)
    }
})

function validateToken(req, res, next) {

    const accessToken = req.body.token;
    console.log(accessToken + '  .....');
    if (!accessToken) res.status(403).json({ msg: 'Acceso denegado' });

    jwt.verify(accessToken, 'mcburguer', (err, user) => {
        if (err) {
            const data = { msg: 'Acceso denegado, token expired or incorrect' }
            res.status(400).json({ msg: 'Acceso denegado, token expired or incorrect' })
        } else {
            next();
        }
    })
}


module.exports = router;
