const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
    ownerName:{type:String, required:true},
    shopName:{type:String,required:true},
    sellerEmail:{type:String,required:true, unique:true},
    password:{type:String,required:true},
    sellerToken:String
});

exports.Sellers = mongoose.model('Seller',sellerSchema);