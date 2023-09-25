const modelP = require("../Models/Product");
const modelS = require("../Models/Seller");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const Product = modelP.Product;
const Seller = modelS.Sellers;
const publicKey = fs.readFileSync(
  path.resolve(__dirname, "../public.key"),
  "utf-8"
);

exports.createProduct = async (req, res) => {
  const { sellerToken, sellerId } = req.body.sellerAuthInfo;
  const productData = req.body.product;
  try {
    const seller = await Seller.findById(sellerId);
    const decoded = jwt.verify(sellerToken,publicKey);
    //i know here no need to check but i do it for my satisfaction
    if (seller.sellerEmail === decoded.email) {
        const product = new Product(productData);
        const response = await product.save();
        res.json({
            itemSavedSuccessfully:true
        })
    }else{
        res.json({
            itemSavedSuccessfully:false
        })
    }
  } catch (error) {
    res.json({
        itemSavedSuccessfully:false
    })
  }
};
