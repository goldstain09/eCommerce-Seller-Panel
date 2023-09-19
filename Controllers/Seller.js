const model = require("../Models/Seller");
const Seller = model.Sellers;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const privateKey = fs.readFileSync(
  path.resolve(__dirname, "../private.key"),
  "utf-8"
);
const publicKey = fs.readFileSync(
  path.resolve(__dirname, "../public.key"),
  "utf-8"
);

exports.createSeller = async (req, res) => {
  const seller = new Seller(req.body);
  let sellerToken = jwt.sign({ email: req.body.sellerEmail }, privateKey, {
    algorithm: "RS256",
  });
  seller.sellerToken = sellerToken;
  let saltPassword = bcrypt.hashSync(req.body.password, 10);
  seller.password = saltPassword;
  //   console.log(seller);
  try {
    const savedSeller = await seller.save();
    //   console.log(savedSeller);
    res.json({ sellerToken: savedSeller.sellerToken, userCreated: true,res:true });
  } catch (error) {
    // console.log(error);
    if (error.code == 11000) {
      res.json({ emailAlreadyinUse: true });
    } else {
      res.json({ userCreated: false,res:true });
    }
  }
};



exports.verifySeller = async(req,res) => {
    console.log('sad');
res.json({'':''});
}