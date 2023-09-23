const express = require('express');
const productRouter = express.Router();
const productController = require('../Controllers/Product');

productRouter.post('/addproduct',productController.createProduct);

exports.Routes = productRouter;
