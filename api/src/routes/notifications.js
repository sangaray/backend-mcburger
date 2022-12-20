const { Router } = require('express');
const { notificationPayment} = require('../controllers/paymentController');
const router = Router();

router.post('/', notificationPayment) 
console.log(notificationPayment, 'notificacionessssssssssss')

module.exports = router 