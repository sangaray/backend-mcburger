const { Products, Categories } = require('../db');
const { API_Key } = process.env;
const api_products = require('../data/data.json')

const getCategories = async () => {

    /*     const cat = [];
    
        for (const [clave, valor] of Object.entries(api_products)) {
    
            cat.push({ name: clave });
        }
        await Categories.bulkCreate(cat); */
    const result = await Categories.findAll();
    return result;
}

const loadCategories = async () => {
    const cat = [];

    for (const [clave, valor] of Object.entries(api_products)) {

        cat.push({ name: clave });
    }
    await Categories.bulkCreate(cat);

}

module.exports = { getCategories, loadCategories }