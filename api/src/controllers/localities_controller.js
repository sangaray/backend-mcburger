const { Localities } = require('../db');
const api_products = require('../data/data.json')

const getLocalities = async () => {
    let arr = [];

    for (const [clave, valor] of Object.entries(api_products)) {
        arr = (valor.map(elem => elem.branch));
    }
    const result = arr[0].map(elem => {
        return {
            name: elem.locality
        }
    }
    )
    await Localities.bulkCreate(result);
    return result;
}
module.exports = { getLocalities }