const { Products, Categories } = require('../db');
const { API_Key } = process.env;
const api_products = require('../data/data.json')

const getCategories = async () => {

    const cat = [];

    for (const [clave, valor] of Object.entries(api_products)) {

        cat.push({ name: clave });
    }
    await Categories.bulkCreate(cat);

    return cat;
    //const queryAxios = await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_Key}&addRecipeInformation=true&query=${title}`)
    //console.log(queryAxios.data.results);
    // console.log(title + '<--');
    /*     const queryBD = await Recipe.findAll({
    
            attributes: ['id', 'title', 'image', 'summary', 'healthScore'],
            // attributes: ['id', 'title', 'image', 'summary']
            include: [
                {
                    model: Diet,
                    attributes: ["name"],
                    through: {
                        attributes: [],
                    },
                }
            ],
        });
    
        let propS = [];
        if (queryAxios.data.results.length > 0) {
            propS = queryAxios.data.results.map(elem => {
                return { id: elem.id, title: elem.title, image: elem.image, summary: elem.summary, diets: elem.diets, healthScore: elem.healthScore }
            });
        }
    
        //filtro la busqueda de la bd interna
        const filter = queryBD.filter(elem => {
            return elem.title.toLowerCase().includes(title.toLowerCase())
        })
        //console.log(filter);
        const reFormat = filter.map(elem => {
            let objeto = {};
            objeto.id = elem.id;
            objeto.title = elem.title;
            objeto.image = elem.image;
            objeto.summary = elem.summary;
            objeto.healthScore = elem.healthScore;
            objeto.diets = elem.diets.map(e => e.name) // aca paso de [{diet: 'vegan'}, {diet:'gluten'}] -> ['vegan', 'gluten']
            return objeto;
        });
    
        const total = reFormat.concat(propS);
        return total; */
}

module.exports = { getCategories }