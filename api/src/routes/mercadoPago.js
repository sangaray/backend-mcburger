const { Router } = require('express');
const { createPayment,  buyProduct} = require('../controllers/paymentController');
const router = Router();

router.post('/', createPayment);
//router.get('/', buyProduct);


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

