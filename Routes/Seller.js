const express = require('express');
const sellerRouter = express.Router();
const sellerController = require('../Controllers/Seller');

sellerRouter.post('/create',sellerController.createSeller);

exports.Router = sellerRouter;