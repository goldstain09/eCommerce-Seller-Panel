const express = require('express');
const sellerRouter = express.Router();
const sellerController = require('../Controllers/Seller');

sellerRouter.post('/create',sellerController.createSeller)
.get('/verify',sellerController.verifySeller)
.post('/login',sellerController.loginSeller)
.post('/edit',sellerController.editSeller)
.post('/updateorderstatus',sellerController.updateOrderStatus);

exports.Routes = sellerRouter;