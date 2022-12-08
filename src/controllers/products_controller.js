const { Products, Categories } = require('../db');
const { API_Key } = process.env;
const api_products = require('../data/data.json')



const getProducts = async () => {

    const cat = [];

    for (const [clave, valor] of Object.entries(api_products)) {

        await Products.bulkCreate(valor.map(elem => {
            return ({
                name: elem.name,
                ingredients: elem.ingredients.join(' - '),
                summary: elem.summary,
                price: elem.price,
                image: elem.image,
            })
        }
        ));
    }

    const result = await Products.findAll();
    return result;

}
module.exports = { getProducts }