/* const cp = require ('../services/paymentsService.js')
 class PaymentController {
    constructor(subscriptionService) {
      //this.subscriptionService = subscriptionService;
    }
  
    async getPaymentLink(req, res) {
      try {  
       const dataInstance = new cp
       const payment = await dataInstance.createPayment();
       console.log(payment, 'que ondaaaaaaaaq')
        return res.json(payment);
      } catch (error) {
        console.log(error);
  
        return res
          .status(500)
          .json({ error: true, msg: "Failed to create payment" });
      }
    }
  
      async getSubscriptionLink(req, res) {
      try {
        const subscription = await this.subscriptionService.createSubscription();
  
        return res.json(subscription);
      } catch (error) {
        console.log(error);
  
        return res
          .status(500)
          .json({ error: true, msg: "Failed to create subscription" });
      }
    }
  }  
  
  module.exports = PaymentController;  */

  const { query } = require("express");
const { merchant_orders } = require("mercadopago");
const mercadopago = require("mercadopago");
  const { Products } = require ('../db')

  const buyProduct = async (req, res) => {
    const products = req.params.products;
    try {
      
      const data = await Products.findAll( products );
      //console.log(data)
      res.json({
        ok: true,
        id: data.id,
        name: data.name,
        price: data.price,
        image: data.image,
      })
  
    } catch (error) {
      console.log(error);
      res.json({ok: false,
      msg: "Product not found"})
    }
  }

  const createPayment = async (req, res, {name, image}) =>{
    
     mercadopago.configure({
      access_token: process.env.ACCESS_TOKEN
    });
      // Crea un objeto de preferencia

      const findProduct = req.params.id;
      //const datos = req.body.items;
      //console.log(datos, 'aquiiii')
      const products = await Products.findAll(findProduct);
      //console.log(products)
    let preference = {
      
      items: [
        { 
          title: products.name,
          unit_price: 1, //SI PONGO PRODUCTS.PRICE ME TIRA ERROR, DICE QUE NECESITA UN NUMBER
          currency_id: 'ARS',
          quantity: 1,
          picture_url: products.image
        },
      ], 
      
      back_urls: {
        failure: "http://localhost:3001/payment/failure",
        pending: "/pending",
        success: "http://localhost:3001/payment/success"//deploy vercel/ruta que tenga declarada en el front
      },
      auto_return: "approved",
      notification_url: "https://d182-2803-9800-94c0-845b-1598-d45c-29e7-8ad1.sa.ngrok.io/notificationPayment"
      
    };
    console.log(preference);
    
    mercadopago.preferences
      .create(preference)
      .then(function (response) {
        console.log(response.body.init_point)
        res.send(`<a href="${response.body.init_point}"> GO TO PAY</a>`)
      })
      .catch(function (error) {
        console.log(error);
      });
      
  }
 

  const notificationPayment = async (req, res) =>{
   console.log(notificationPayment);
    const  data = req.query
    console.log(data);
    /*  const type = query.merchant_orders
    console.log({type}) */ 
    res.status(200)
 
  /*   var merchantOrder;
    switch (merchant_orders) {
      case "payment":
        const paymentId = query.id || query['data.id'];
        console.log(type, 'getting payment', paymentId);
        const  payment = await mercadopago.findById(paymentId);
        console.log(payment)
        merchantOrder = await mercadopago.merchant_orders.findById(payment.body.order.id);
        break;
        case "merchant_order" :
          const orderId = query.id;
          console.log(type, 'getting merchant order', orderId);
          merchantOrder = await mercadopago.merchant_orders.findById(orderId);
          console.log(merchantOrder.body.payments);
          break;

    }  */

    
   // res.status(200);
  
}

 



  

  module.exports = {
    buyProduct,
    createPayment,
    notificationPayment,
  }