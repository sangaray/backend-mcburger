 const { Router } = require('express');
const { createPayment, notificationPayment, buyProduct} = require('../controllers/paymentController');
const router = Router();

router.post('/', createPayment);
router.post('/', notificationPayment) 
router.get('/', buyProduct)

/* router.post('/', async (req, res) => {

  try {
      const a = await createPayment();
      console.log(a);
      res.status(200).json(a);

  } catch (e) {

      return res.status(404).send('error')
  }
})

router.post('/', async (req, res) => {

  try {
      const a = await notificationPayment();
      console.log(a);
      res.status(200).json(a);

  } catch (e) {

      return res.status(404).send('error')
  }
}) */


module.exports = router;







/* const PaymentController = require ('../controllers/paymentController');
const PaymentService = require ('../services/paymentsService.js');
const PaymentInstance = new PaymentController(new PaymentService());
 */

/*     router.get("/", function (req, res, next) {
    return res.json({
      "/payment": "generates a payment link",
      "/subscription": "generates a subscription link"
    });
  });    */
/* 
router.get("/",  function (req,res,next) {
    PaymentInstance.getPaymentLink(req, res)
});
  
  router.get("/", function (req, res, next) {
    PaymentInstance.getSubscriptionLink(req, res);
  }); 
module.exports = router;  */

