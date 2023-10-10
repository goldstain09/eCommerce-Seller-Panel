const modelP = require("../Models/Product");
const modelS = require("../Models/Seller");
const modelU = require("../Models/User");
const Product = modelP.Product;
const Seller = modelS.Sellers;
const User = modelU.Users;
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
    res.json({
      sellerToken: savedSeller.sellerToken,
      userCreated: true,
      res: true,
    });
  } catch (error) {
    // console.log(error);
    if (error.code == 11000) {
      res.json({ emailAlreadyinUse: true });
    } else {
      res.json({ userCreated: false, res: true });
    }
  }
};

exports.verifySeller = async (req, res) => {
  const sellerTok = req.get("Authorization").split("Bearer ")[1];
  try {
    let decoded = jwt.verify(sellerTok, publicKey);
    if (decoded.email) {
      const seller = await Seller.findOne({ sellerEmail: decoded.email });
      const products = await Product.find({sellerId:seller.id});
      res.json({
        ownerName: seller.ownerName,
        shopName: seller.shopName,
        sellerEmail: seller.sellerEmail,
        verificationSuccess: true,
        id:seller._id,
        products:products,
        openOrders:seller.openOrders,
        completedOrders:seller.completedOrders
      });
    }
  } catch (error) {
    res.json({ verificationSuccess: false }).status(402);
  }
}; 

exports.loginSeller = async (req, res) => {
  const { sellerEmail, password } = req.body;
  try {
    const seller = await Seller.findOne({ sellerEmail: sellerEmail });
    if (seller) {
      let newSellerToken = jwt.sign({ email: sellerEmail }, privateKey, {
        algorithm: "RS256",
      });
      if (bcrypt.compareSync(password, seller.password)) {
        seller.sellerToken = newSellerToken;
        await seller.save();
        res.json({
          sellerToken: newSellerToken,
          loginSuccess: true,
          res: true,
        });
      } else {
        res.json({ loginSuccess: false, res: true });
      }
    } else {
      res.json({ loginSuccess: false, res: true });
    }
  } catch (error) {
    res.json({ someOtherErrorOccured: true });
  }
};

exports.editSeller = async (req, res) => {
  const { oldEmail, password, shopName, sellerEmail, ownerName } = req.body;
  try {
    let seller = await Seller.findOne({ sellerEmail: oldEmail });
    if (bcrypt.compareSync(password, seller.password)) {
      let newSellerToken = jwt.sign({ email: sellerEmail }, privateKey, {
        algorithm: "RS256",
      });
      seller.shopName = shopName;
      seller.sellerToken = newSellerToken;
      seller.ownerName = ownerName;
      seller.sellerEmail = sellerEmail;
      await seller.save();
      res.json({
        updated: true,
        sellerToken: newSellerToken,
        res: true,
      });
    } else {
      res.json({
        updated: false,
        res: true,
      });
    }
  } catch (error) {
    if (error.code == 11000) {
      res.json({updated:'alreadyUsedEmail' });
    } else {
      res.json({ someOtherErrorOccured: true });
    }
  }
};


exports.updateOrderStatus = async(req,res) => {
  const {orderStatus,sellerToken,sellerId,orderDetails} = req.body;
  try {
    let decoded = jwt.verify(sellerToken, publicKey);
    const seller = await Seller.findById(sellerId);
    const user = await User.findById(orderDetails.orderedBy.userId);
    if(decoded.email === seller.sellerEmail){
      if(orderStatus === 'Order is Delivered'){
        const productThatIsDelivered = seller.openOrders.filter((item)=> item.orderUniqueId === orderDetails.orderUniqueId);
        const productsThatAreNotDelivered = seller.openOrders.filter((item)=> item.orderUniqueId !== orderDetails.orderUniqueId);
        productThatIsDelivered[0].status = orderStatus;
        seller.completedOrders.push(productThatIsDelivered[0]);
        seller.openOrders = productsThatAreNotDelivered;
        await seller.save();
        
        const productWhichStatusShouldBeUpdate = user.orders.filter((item)=> item.orderUniqueId === orderDetails.orderUniqueId);
        productWhichStatusShouldBeUpdate[0].status = orderStatus;
        // console.log(user.orders);
        // await user.save();
        await User.findByIdAndUpdate(orderDetails.orderedBy.userId,{$set:{orders:user.orders}});

        res.json({
          statusUpdated:true,
          orderDelivered:true
        });
      }else{
        const productWhichStatusIsChanged = seller.openOrders.filter((item)=> item.orderUniqueId === orderDetails.orderUniqueId);
        productWhichStatusIsChanged[0].status = orderStatus;
        await Seller.findByIdAndUpdate(sellerId,{$set:{openOrders:seller.openOrders}});


        const productWhichStatusShouldBeUpdate = user.orders.filter((item)=> item.orderUniqueId === orderDetails.orderUniqueId);
        productWhichStatusShouldBeUpdate[0].status = orderStatus;
        await User.findByIdAndUpdate(orderDetails.orderedBy.userId,{$set:{orders:user.orders}});
        res.json({
          statusUpdated:true,
          orderDelivered:false
        });
      }
    }else{
      res.json({
        statusUpdated:false
      });
    }
  } catch (error) {
    res.json({
      statusUpdated:false,
      someOtherErrorOccured:true
    });
  }
}