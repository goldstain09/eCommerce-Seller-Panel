const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const SellerRoutes = require('./Routes/Seller');
const ProductRoutes = require('./Routes/Product');
const path = require('path');


const server = express();
console.log('server started');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://rajputsujal992:YbJuMa2wjJ155fIY@cluster0.4wvygwc.mongodb.net/ecommerce?retryWrites=true&w=majority');
  console.log('db connected');
}

server.use(cors());
server.use(express.json());
server.use(express.static('build'));
server.use('/seller',SellerRoutes.Routes);
server.use('/api', ProductRoutes.Routes);
server.use("*",(req,res)=>{
  res.sendFile(path.resolve(__dirname,'build','index.html'));
})


server.listen(8081);