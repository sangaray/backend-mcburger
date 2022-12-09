const { Branches } = require('../db');
const { API_Key } = process.env;
const api_products = require('../data/data.json')

const getBranches = async () => {
    let arr = [];

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
    )
    await Branches.bulkCreate(result);
    console.log(result);

    return result;
}
module.exports = { getBranches }