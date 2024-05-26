const express = require("express");

const server = express();
const db = require("./DB/db.js");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const House = require("./model/HouseSchema.js");
require("dotenv").config();
const port = 5000;
server.use(cors());
server.use(express.json());
server.use("/api/auth", authRoutes);
server.use("/api/houses", require("./routes/house.js"));
server.get("/api/houses/loc", async (req, res) => {
  const { location } = req.query;
  let query = {};
  if (location) {
    const locationStr = Array.isArray(location)
      ? location.join(" ")
      : String(location);
    query = { address: new RegExp(locationStr, "i") };
  }

  try {
    const houses = await House.find(query);
    res.json(houses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
const start = async () => {
  try {
    await db(process.env.MONGO_URI);
    server.listen(port);
  } catch (err) {
    console.log(err);
  }
};

start();
