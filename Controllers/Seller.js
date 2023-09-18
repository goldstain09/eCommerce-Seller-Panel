const model = require('../Models/Seller');
const Sellers = model.Sellers;

exports.createSeller = async(req,res) => {
   console.log(Sellers);
    res.json({da:'sdf'})
}