 
  const mercadopago = require("mercadopago");
  const { Products } = require ('../db')

  const createPayment = async (req, res, {name, image}) =>{
    
     mercadopago.configure({
      access_token: process.env.ACCESS_TOKEN
    });
      

      const product = req.body;
      //const products = await Products.findAll(findProduct);
      //console.log(products)
    let preference = {
      
      items: [
        { //en el console.log aparece todo como undefined,hay que ver que pasa cuando se haga desde el front
          title: product.name, //o title ,ver luego
          unit_price: 1, //SI PONGO PRODUCT.PRICE ME TIRA ERROR, DICE QUE NECESITA UN NUMBER
          currency_id: 'ARS',
          quantity: 1,
          picture_url: product.image,
          description: product.summary, //o description
        },
      ], 
      
      back_urls: {
        failure: "http://localhost:3001/payment/failure",
        pending: "/pending",
        success: "http://localhost:3000"// aqui despues va a ir deploy vercel/ la ruta que tenga declarada en el front
      },
      auto_return: "approved",
      notification_url://"http://requestbin.fullcontact.com/notificationPayment",
      "https://d182-2803-9800-94c0-845b-1598-d45c-29e7-8ad1.sa.ngrok.io/notificationPayment",
      binary_mode: true,
      
    };
    console.log(preference)
    
    mercadopago.preferences
      .create(preference)
      .then(function (response) {
        console.log(response.body.init_point)
        res.status(200).send(`<a href="${response.body.init_point}"> GO TO PAY</a>`)
      })
      .catch(function (error) {
        res.status(400).send({error: error.message})
      });
      
  }
 

  const notificationPayment = async (req, res) =>{
    
    const  data = req.query;
    console.log(data, 'notifications');
    res.status(200);
  
}


//---------> esta es una ruta de comprar producto, se puede usar como no, 

  /*const buyProduct = async (req, res) => {
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
  } */

  module.exports = {
    //buyProduct,
    createPayment,
    notificationPayment,
  }


