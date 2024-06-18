require("dotenv").config();
const controller = require('./overviewController');
const axios = require('axios');
const reviewRouter = require('./reviewRouter.js');

const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.json());

app.get('/products/*/styles', controller.getStyles);
app.get('/products/*', controller.getProduct);
app.get('/reviews/meta/*', controller.getReviewData);
app.post('/cart', controller.postCart);

app.use('/', reviewRouter);


app.listen(process.env.PORT);
console.log(`Server listening at http://localhost:${process.env.PORT}`);