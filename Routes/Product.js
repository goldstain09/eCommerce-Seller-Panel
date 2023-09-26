const express = require('express');
const productRouter = express.Router();
const productController = require('../Controllers/Product');

productRouter.post('/addproduct',productController.createProduct)
.post('/editproduct',productController.editProduct)
.post('/deleteproduct',productController.deleteProduct);

exports.Routes = productRouter;
