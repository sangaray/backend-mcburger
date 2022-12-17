const {notificationPayment} = require('./paymentController')
const {Orders } = require ('../db')


const getOrders = async () => {
    
const notif = await notificationPayment();
console.log(notif, 'aquiiiii')
    /* let arr = [];

    for (const [clave, valor] of Object.entries(api_products)) {
        arr = (valor.map(elem => elem.branch));
    }
    const result = arr[0].map(elem => {
        return {
            station: elem.station,
            address: elem.address,
            gps: elem.gps,
            stock: elem.stock
        }
    }
    ) */
    await Orders.bulkCreate(notif);
    console.log(notif, 'holaaaaaaaaa');

    return notif;
}
module.exports = { getOrders }