const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
<<<<<<< HEAD:api/src/app.js
const routes = require('./routes/index.js');
const product = require("./routes/index")
=======

const categories = require('./routes/categories')
const products = require('./routes/products')
const branches = require('./routes/branches')
const localities = require('./routes/localities')
>>>>>>> 14f20456a0fbc2e54d258f8c3ad5687e0b808c61:src/app.js

require('./db.js');

const server = express();

server.name = 'API';

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

<<<<<<< HEAD:api/src/app.js
server.use('/', routes);
server.use("/products", product)
=======
server.use('/categories', categories);
server.use('/products', products);
server.use('/branches', branches);
server.use('/localities', localities);
>>>>>>> 14f20456a0fbc2e54d258f8c3ad5687e0b808c61:src/app.js

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
