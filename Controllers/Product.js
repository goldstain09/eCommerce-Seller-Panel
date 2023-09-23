const model = require('../Models/Product');
const Product = model.Product;

exports.createProduct = async(req,res) => {
    console.log(req.body);
}