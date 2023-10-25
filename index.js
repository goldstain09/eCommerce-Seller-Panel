const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const SellerRoutes = require("./Routes/Seller");
const ProductRoutes = require("./Routes/Product");
const path = require("path");

const server = express();

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO);
}

server.use(cors());
server.use(express.json());
server.use(express.static(process.env.STATIC));
server.use("/seller", SellerRoutes.Routes);
server.use("/api", ProductRoutes.Routes);
server.use("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

server.listen(process.env.PORT || 8080);
