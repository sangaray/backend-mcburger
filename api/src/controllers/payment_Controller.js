 
  const mercadopago = require("mercadopago");

  const createPayment = async (req, res) =>{
    
     mercadopago.configure({
      access_token: process.env.ACCESS_TOKEN
    });
       
    const products = req.body;

    let preference = {
      items: products.map((p) => {
        return {
          title: p.title, 
          unit_price: p.unit_price, 
          currency_id: 'ARS',
          quantity: p.quantity,
          picture_url: p.picture_url,
          description: p.description, 
        }
      }),
    
        back_urls: {
        failure: "http://localhost:3001/payment/failure",
        pending: "/pending",
        success: "http://localhost:3000"// aqui despues va a ir deploy vercel/ la ruta que tenga declarada en el front
      },
        auto_return: "approved",
        notification_url:"https://d182-2803-9800-94c0-845b-1598-d45c-29e7-8ad1.sa.ngrok.io/notificationPayment",
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
    return preference;
  }


  module.exports = {
    createPayment
  }


