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


exports.editProduct = async (req,res) => {
  const updateOnceProductData = req.body.updatedProduct;
  const { sellerToken, sellerId } = req.body.sellerAuthInfo;
  try {
    const seller = await Seller.findById(sellerId);
    const decoded = jwt.verify(sellerToken, publicKey);
    if(decoded.email === seller.sellerEmail){
      const product = await Product.findByIdAndUpdate(updateOnceProductData._id, updateOnceProductData);
      res.json({
        productUpdated:true
      })
    }else{
      res.json({
        productUpdated:false
      })
    }
  } catch (error) {
    res.json({
      productUpdated:false
    })
  }
}


exports.deleteProduct = async (req,res) => {
  const {id , sellerAuthInfo} = req.body;
  try {
    const seller = await Seller.findById(sellerAuthInfo.sellerId);
    const decoded = jwt.verify(sellerAuthInfo.sellerToken, publicKey);
    if(decoded.email === seller.sellerEmail){
      const product = await Product.findByIdAndDelete(id);
      res.json({
        productDeleted:true
      });
    }else{
      res.json({
        productDeleted:false
      })
    }
  } catch (error) {
    res.json({
      productDeleted:false
    })
  }
}