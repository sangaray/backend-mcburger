const mercadopago = require("mercadopago");

const createPayment = async (params) => {
  mercadopago.configure({
    access_token: process.env.ACCESS_TOKEN,
  });

  const products = params;
  console.log(products);

  let preference = {
    items: products.map((p) => {
      return {
        title: p.title,
        unit_price: p.unit_price,
        currency_id: "ARS",
        quantity: p.quantity,
        picture_url: p.picture_url,
        description: p.description,
      };
    }),

    back_urls: {
      failure: "http://localhost:3000/Cart/failure",
      pending: "/pending",
      success: "http://localhost:3000/Cart/success", // aqui despues va a ir deploy vercel/ la ruta que tenga declarada en el front
    },
    auto_return: "approved",
    notification_url:
      "https://d182-2803-9800-94c0-845b-1598-d45c-29e7-8ad1.sa.ngrok.io/notificationPayment",
    binary_mode: true,
  };

  let response = await mercadopago.preferences
    .create(preference)
    .catch(function (error) {
      console.log(error);
    });
  return response.body.init_point;
};

module.exports = {
  createPayment,
};
