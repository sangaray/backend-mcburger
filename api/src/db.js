require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/mcburger`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const {User, Localities, Branches, Products, Categories, Orders} = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
Localities.hasMany(User);
User.belongsTo(Localities);

Localities.hasMany(Branches);
Branches.belongsTo(Localities);

Categories.hasMany(Products);
Products.belongsTo(Categories);

User.hasMany(Products);
Products.belongsTo(User);

Branches.hasMany(Orders);
Orders.belongsTo(Branches);

Orders.belongsToMany(Products, { through: 'OrderProduct' });
Products.belongsToMany(Orders, { through: 'OrderProduct' });

Products.belongsToMany(Branches, { through: 'ProductBranch' });
Branches.belongsToMany(Products, { through: 'ProductBranch' });

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
